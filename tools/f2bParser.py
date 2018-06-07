'''
Schema Metadata

Schema is defined using Front2Back Data Definition Language (F2BDDL). 
Metadata defined here creates the tables in postgres. This centralizes the rules 
for loading, displaying and saving data. JSON is generated for consumtion by the
frontend. A pickle file caches the results of parsing the F2BDDL.

@author: Ed Montalbano
@date: 2/2/2018
'''
from os.path import isfile, realpath
from os import rename
from copy import deepcopy
import ujson, pickle, re
from io import FileIO
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, PickleType, MetaData, Table, text
from sqlalchemy.types import Text
from sqlalchemy.dialects import postgresql
from pyparsing import Word, delimitedList, Optional, Group, alphas, Forward, \
    oneOf, ZeroOrMore, restOfLine, Keyword, OneOrMore, nums, FollowedBy, \
    alphanums, Combine
from sqlalchemy import create_engine
from sqlalchemy.schema import CreateTable
from uuid import uuid4


permission_flags = ['guest', 'member', 'owner', 'owner-controlled', 'subscriber',
                    'friend','parent-or-owner', 'admin-only', 'parent-controlled']
time_consts = {
  'min': 60,
  'minutes': 60,
  'hour': 3600,
  'hours': 3600,
  'day': 86400,
  'days': 86400,
  'sec':1,
  'week': 604800,
  'weeks': 604800,
  'month': 259200,
  'months': 259200
}

property_flags = ['hidden', 'required', 'searchable', 'not-searchable', 'cached',
                  'read-only', 'unique', 'indexed', 'local-only']

#@todo: warn mutually exclusive properties
mutually_exclusive = [
    ('hidden', 'local-only'),
    ('indexed', 'local-only'),
    ('indexed', 'hidden'),
    ('indexed', 'searchable'),
    ('searchable','not-searchable')
]

def get_schema(schema):
  #Broken and currently not needed - this is usually server-side schema loading on initialize
  models = load_pickle()
  if models is None:
    models = build_schema(schema)
  
  models = convert_sql_types(models)
  return models


def build_schema(schema):
  models = parse_schema(schema)
  models = setup_models(models)
  save_model(models)
  return models


def parse_schema(schema_string):
  schemaDefinition = Forward()
  isAbstract = Optional(Keyword('abstract').setResultsName('isAbstract'))
  objectName = Word(alphas+'_').setResultsName('objectName')
  f = {
    flag: Keyword(flag, caseless=True) for flag in property_flags
  }
  flags = ZeroOrMore( 
    f['hidden'] | f['required'] | f['read-only'] | f['unique'] | f['indexed'] | f['cached']
    | f['local-only'] | f['searchable'] | f['not-searchable']
  )
  sqlKeyword = oneOf(
    'integer string boolean datetime pickletype text', caseless=True
  )
  arrayType = Group('array(' + sqlKeyword + ')')
  sqlType = (sqlKeyword | arrayType).setResultsName('sqlType')
  timeKeyword = oneOf(' '.join(time_consts.keys())).setResultsName('timeConst')
  timeOrInteger = Combine(Word(nums+' ')+Optional(timeKeyword)) | Word(nums) | timeKeyword
  string_val = Word('\'') + ZeroOrMore(Word(alphanums)) + Word('\'')
  identifier = Word(alphas+'_')
  val_literals = oneOf('true false null', caseless=False)
  extensionList = delimitedList( identifier , ',').setResultsName('extends')
  extends = Word('(') + extensionList + Word(')')
  permission_kw = oneOf(' '.join(permission_flags), caseless=True)
  operation = oneOf('create read update delete', caseless=True)
  permission_set = permission_kw + OneOrMore(operation).setResultsName('operations')
  throttle_rule = Keyword('max') + Word(nums) + Word('/') + timeOrInteger
  permissionList = delimitedList( 
    Group( permission_set | throttle_rule
  ), ',').setResultsName('permissions')
  fieldName = Word(alphas+'_').setResultsName('fieldName')
  defaultValue = Word(':') + Group(val_literals | string_val | timeOrInteger).setResultsName('defaultValue')
  prop = Group(fieldName + flags + sqlType + flags + Optional(defaultValue)).setResultsName('property')
  propertyList = Group(delimitedList( prop, ',' )).setResultsName('properties')  
  schemaDefinition <<= delimitedList( 
    Group(  ( isAbstract + objectName + Optional(extends) + 
              Optional(Word('[') + permissionList + Word(']')) + 
              Word('{') + Optional(propertyList)
            )  
    ), '}' 
  ).setResultsName('objects')
  schemaParser = schemaDefinition
  schemaParser.ignore('#' + restOfLine)
  return schemaParser.parseString(schema_string)
  

def setup_models(parse_result):
  models = {}
  for obj in parse_result.objects:
    objName = obj.objectName.lower()
    models[objName] = { 'properties' : {}, 'permissions': {}, 'config': {},
                        'skipList': [], 'ignoreList': [] }
    #Extend model with parent model's properties
    for model in obj.extends:
      basemodel = model.lower()
      if basemodel not in models:
        raise Exception("Object Definition " + basemodel + " not found in models. " \
              "Was it extended before it was defined?")
      models[objName]['properties'].update(models[basemodel]['properties'])
      
      if len(models[basemodel]['permissions']) > 0:
        models[objName]['permissions'].update(models[basemodel]['permissions'])
      models[objName]['config'] = {}
      models[objName]['config'].update(models[basemodel]['config'])
    
    #setup current model's properties
    for prop in obj.properties:
      models[objName]['properties'].update(setup_property(prop))

    for permissionSet in obj.permissions:
      permission = permissionSet[0]
      #setup throttle
      
      if 'operations' not in permissionSet and permission.lower() == 'max':
        max_actions = int(permissionSet[1])
        per = 1
        matches = re.search('[0-9]+', permissionSet[3])
        if matches is not None:
          per = int(matches.group(0))
        if 'timeConst' in permissionSet:
          per = per * time_consts[permissionSet.timeConst]
        models[objName]['config'] = {'throttle': max_actions, 'throttle_time':per }
      else:
        for op in permissionSet.operations:
          models[objName]['permissions'][op] = permission
    
    skipCounter = 1
    for key in models[objName]['properties']:
      prop = models[objName]['properties'][key]
      if 'hidden' in prop and prop['hidden']:
        models[objName]['skipList'].append(skipCounter)
      elif 'local-only' in prop and prop['local-only']:
        models[objName]['ignoreList'].append(skipCounter)
      skipCounter += 1

    models[objName]['config']['abstract'] = 'isAbstract' in obj
  return models  

def setup_property(property_obj):
  prop = { property_obj.fieldName : {
    'type': property_obj.sqlType if type(property_obj.sqlType) is str else property_obj.sqlType[1] + '[]',
    #[0:] returns the generator we need
    **{flag: True for flag in property_flags if flag in property_obj[0:] } 
  } }
  if 'defaultValue' in property_obj:
    prop[property_obj.fieldName]['default'] = property_value(property_obj.defaultValue)
  return prop
  
def property_value(tokens):
  if tokens[0] == 'true':
    return True
  if tokens[0] == 'false':
    return False
  if tokens[0] == 'NULL':
    return None
  if tokens[0] == '\'':
    return tokens[1]
    
  matches = re.search('[0-9]+', tokens[0])
  multiplier = 1
  if matches is not None:
    multiplier = int(matches.group(0))
  
  if 'timeConst' in tokens:
    multiplier = multiplier * time_consts[tokens.timeConst]
  return multiplier


def save_model(models):
  prefix = '../' if 'tools' in realpath('.') else ''
  try:
    if isfile(prefix + 'src/schema.ts'):
      nameStr = prefix + 'src/schema-' + datetime.now().isoformat()[0:10]
      if isfile(nameStr + '.bkp'):
        i = 1
        while isfile(nameStr + '('+str(i)+')' + '.bkp'):
          i += 1
        nameStr = nameStr + '(' + str(i) + ')'
      
      rename(
          prefix + 'src/schema.ts',
          nameStr + '.bkp'
      )
    
    clientModel = client_only_model(models)    
    
    with open(prefix + 'src/schema.ts', 'w+') as f:
      f.write('''/**
 * F2B Schema
 *
 * This file is automatically generated. DO NOT MAKE CHANGES HERE. Use the schema builder:
 *   cd ltc-provider-app/tools
 *   python3 schemaBuilder.py
 */
''')
      f.write('export const schema = ')
      
      ujson.dump(clientModel, f, indent=2, sort_keys=False)
      f.write(';\n\nexport const schemaSQL = `')
      sqliteModel = convert_sql_types(clientModel)
      
      db_engine = create_engine('sqlite:///:memory:')
      metadata = MetaData()
      for key in sqliteModel:
        model = sqliteModel[key]
        table = generateTable(key, model, metadata)
        f.write(str(CreateTable(table).compile(db_engine)) + ';')
      f.write('`;\n\n')
      f.write('export const version = \'' + str(uuid4()) + '\';\n')
    
  except:
    import sys
    print('Failed to save model')
    import traceback
    traceback.print_exc()
    print(sys.exc_info()[0])

def generateTable(name, model, metadata):  
  properties = model['properties']
  columns = [buildColumn(key, properties[key]) for key in properties]
  columns.insert(0, Column('local_id', Integer, primary_key=True))
  return Table(name, metadata, *columns, sqlite_autoincrement=True)

def buildColumn(key, prop):  
  name = key.split('_')
  name.reverse()
  nullable = 'required' not in prop or not prop['required']
  # This is a local cache and we don't want to add foreign key constraints unless we plan to maintain them all.
  # so this has been commented out.
  #if name[0] == 'id':
  #  foreign = name[1]
  #  if foreign not in Models and len(name) > 2:
  #    foreign = name[2] + '_' + name[1]
  #  if foreign not in Models:
  #    raise Exception('Id defined for \''+key+'\' but foreign key could not be built')
  #  return Column(
  #      key, 
  #      prop['orm_type'], 
  #      ForeignKey(foreign+'.id'),
  #      nullable=nullable, 
  #      **getServerDefault(prop)
  #  )
  return Column(key, prop['orm_type'], nullable=nullable, **getServerDefault(prop))

def getServerDefault(prop):
  if 'default' not in prop:
    print('no default')
    return {}
  defaultProp = prop['default']
  if type(defaultProp) is bool or type(defaultProp) is int:
    return {'default':defaultProp}
  if type(defaultProp) is str:
    if defaultProp == 'NULL':
      return {'default': text('NULL')}
  return {'default': defaultProp}

def server_only_model(models):
  new_models = deepcopy(models)
  to_remove = []
  for key in models:
    if models[key]['config']['abstract']:
      to_remove.append(key)
      continue
    prop_to_remove = []
    for prop in new_models[key]['properties']:
      if 'local-only' in new_models[key]['properties'][prop]:
        prop_to_remove.append(prop)
    for prop in prop_to_remove:
      new_models[key]['properties'].pop(prop)
  for key in to_remove:
    new_models.pop(key)
  return new_models

def client_only_model(models):
  new_models = deepcopy(models)
  to_remove = []
  for key in models:
    if models[key]['config']['abstract']:
      to_remove.append(key)
      continue
    prop_to_remove = []
    for prop in new_models[key]['properties']:
      if 'hidden' in new_models[key]['properties'][prop]:
        prop_to_remove.append(prop)
    for prop in prop_to_remove:
      new_models[key]['properties'].pop(prop)
  for key in to_remove:
    new_models.pop(key)
  return new_models

def load_pickle():
  if not isfile('schema.pkl'):
    return None
  try:
    with open('schema.pkl', 'rb') as pkl:
      return pickle.load(pkl)
  except:
    return None


def convert_sql_types(models):
  for key in models:
    for prop in models[key]['properties']:
      models[key]['properties'][prop]['orm_type'] = convert_type(models[key]['properties'][prop]['type'])
  return models


def convert_type(sql_type):
  if sql_type[-2:] == '[]':
    return postgresql.ARRAY( convert_type(sql_type[:-2]) )
  if type(sql_type) is not str:
    return sql_type
  return {
    'datetime': DateTime,
    'integer':Integer,
    'string': String,
    'boolean': Boolean,
    'pickletype': PickleType,
    'text' : Text
  }[sql_type]
