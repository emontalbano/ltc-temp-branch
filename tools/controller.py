from tkinter.ttk import *
from tkinter import *
from tkinter.font import *
from tkinter import filedialog
from tkinter import messagebox
import pickle
from os.path import isfile
from os import rename, remove
from datetime import datetime
import sys
import hashlib
from copy import deepcopy
from f2bParser import build_schema


ignore_list = ['Id', 'LastModifiedDate', 'CreatedDate', 'IsDeleted']

dark_1 = '#2f3640'
dark_2 = '#212121'
dark_3 = '#718093'
primary = '#00a8ff'
white = '#fff'
root = None
baseDDL = """abstract SOBJECT [
  member create update delete,
  guest read
] {
  id string read-only,
  lastmodifieddate datetime read-only,
  createddate datetime read-only,
  isdeleted boolean read-only
}

abstract OFFLINE {
  pending_create boolean local-only : false,
  pending_update boolean local-only : false,
  pending_delete boolean local-only : false,
  cache_age Integer local-only,
  keep_fresh Integer local-only : 10 min,
  prune Integer local-only : 2 days
}

"""
scroll_1 = 0
scroll_2 = 0

class VerticalScrolledFrame(Frame):
  scroller = 0
  canvas = None
  size = None
  def __init__(self, parent, *args, **kw):
    Frame.__init__(self, parent, *args, **kw)
    vscrollbar = Scrollbar(self, orient=VERTICAL, background=dark_1, activebackground='#111', highlightbackground=dark_1, highlightcolor=dark_3, troughcolor='#ff0000')
    vscrollbar.pack(fill=Y, side=RIGHT, expand=FALSE)
    canvas = Canvas(self, bd=0, width=800, height=1000, highlightthickness=0,
                    yscrollcommand=vscrollbar.set,yscrollincrement=10)
    canvas.pack(side=LEFT, fill=BOTH, expand=TRUE)
    self.scroller = 0 if kw.get('background') == dark_1 else 1
    vscrollbar.config(command=self.yview_wrapper)

    canvas.xview_moveto(0)
    global scroll_1, scroll2  
    canvas.yview(SCROLL, scroll_1 if self.scroller == 1 else scroll_2, 'units')
    
    self.interior = interior = Frame(canvas)
    interior_id = canvas.create_window(0, 0, window=interior,
                                        anchor=NW)
    self.canvas = canvas
    
    def _on_mousewheel(event):
      change = int(-1 * (event.delta/20))
      if self.scroller == 1:
        global scroll_1
        scroll_1 += change
      else:
        global scroll_2
        scroll_2 += change
      self.canvas.yview_scroll(change, 'units')
    
    def _on_mouseenter(event):
      canvas.bind_all("<MouseWheel>", _on_mousewheel)
    
    def _on_mouseleave(event):
      canvas.unbind_all('<MouseWheel>')
    
    canvas.bind('<Enter>', _on_mouseenter)
    canvas.bind('<Leave>', _on_mouseleave)

    def _configure_interior(event):
      size = (interior.winfo_reqwidth(), interior.winfo_reqheight())
      canvas.config(scrollregion="0 0 %s %s" % size, bg=kw.get('background'))
      self.size = size
      if interior.winfo_reqwidth() != canvas.winfo_width():
        canvas.config(width=interior.winfo_reqwidth())
    interior.bind('<Configure>', _configure_interior)

    def _configure_canvas(event):
      if interior.winfo_reqwidth() != canvas.winfo_width():
        # update the inner frame's width to fill the canvas
        canvas.itemconfigure(interior_id, width=canvas.winfo_width())
    canvas.bind('<Configure>', _configure_canvas)
  
  def yview_wrapper(self, *args):
    if self.scroller == 1:
      global scroll_1
      scroll_1 = int((float(args[1]) / 10) * self.size[1])
    else:
      global scroll_2
      scroll_2 = int((float(args[1]) / 10) * self.size[1])
    self.canvas.yview(*args)


class NumberEntry(Entry):
  def __init__(self, master, value="", **kw):
    Entry.__init__(self, master, **kw)
    self.__value = value
    self.__variable = kw.get('textvariable')
    self.__variable.trace("w", self.__callback)

  def __callback(self, *dummy):
    value = self.__variable.get()
    newvalue = self.validate(value)
    if newvalue is None:
      self.__variable.set(self.__value)
    elif newvalue != value:
      self.__value = newvalue
      self.__variable.set(newvalue)
    else:
      self.__value = value

  def validate(self, value):
    if value == '':
      return ''
    try:
      int(value)
      return value
    except:
      return None


class Application(Frame):
  objFormList = []
  objFormFields = {}
  objFieldConfig = {}
  activeObjects = []
  activeObjectFields = {}
  transforms = {}
  oldTransforms = None
  defaults = {}
  grid = None
  ct = 0
  rowct = 1
  frame = None
  panel = None
  theme = ''
  curNotebook = None
  codepad = None
  n = None

  def __init__(self, master=None, sObjects=None):
    Frame.__init__(self, master)
    global root
    self.sObjects = sObjects
    self.setupThemes()
    self.oldTransforms = self.load_pickle()
    self.activeObjects, self.activeObjectFields, self.transforms = deepcopy(self.oldTransforms)
    self.buildObjSelector()
    self.buildConfigurePanel()
    nextbtn = Button(command=self.save, text='SAVE AND GENERATE', background=primary, foreground=white, font=Font(family='Roboto', size=14, weight='bold'), padx=32, pady=4, relief=FLAT)
    nextbtn.grid(row=self.rowct+1, column=1, padx=24, pady=16, sticky=S+E)
    loadbtn = Button(command=self.load_manually, text='LOAD SCHEMA', background=dark_3, foreground=white, font=Font(family='Roboto', size=14, weight='bold'), padx=32, pady=4, relief=FLAT)
    loadbtn.grid(row=self.rowct+1, column=0, padx=24, pady=16, sticky=S+W)
    root.config(background=dark_2)
    root.protocol("WM_DELETE_WINDOW", self.on_exit)
    root.resizable(False, False)

  def load_manually(self):    
    root.filename =  filedialog.askopenfilename(initialdir = "./",title = "Select file",filetypes=(("Schema Configs","*.pkl"),))
    if root.filename is not None and root.filename != '':
      self.activeObjects, self.activeObjectFields, self.transforms = self.load_pickle(root.filename)
      self.buildObjSelector()
      self.buildConfigurePanel()

  def unsavedChanges(self):
    return self.oldTransforms != (self.activeObjects, self.activeObjectFields, self.transforms)

  def on_exit(self):
      if self.unsavedChanges() and messagebox.askyesno("Unsaved changes", "Save this schema before closing?"):
        self.save()
      root.destroy()
  
  def setupThemes(self):
    style = Style()
    if 'aqua' in style.theme_names():
      self.theme = 'aqua'
    elif 'vista' in style.theme_names():
      self.theme = 'vista'
    else:
      self.theme = 'classic'
    style.theme_use(self.theme)

  #------------------------------------------------------------------------------------------------------
  # Left Panel
  #------------------------------------------------------------------------------------------------------
  def buildObjSelector(self):
    self.objFormList = []
    self.objFormFields = {}
    if self.frame:
      self.frame.grid_forget()
      self.frame.destroy()
    self.frame = VerticalScrolledFrame(root, background=dark_1)
    self.frame.grid(row=0, column=0)
    self.frame.interior.config(background=dark_1)
    label = Label(self.frame.interior, text='OBJECTS IN SCHEMA                     ', background=dark_1, font=Font(family='Roboto', size=10), foreground='#BDBDBD')
    label.grid(column=0, padx=16, pady=8, columnspan=3, sticky=W)
    for key in self.sObjects:
      self.objectCheckbox(key, self.sObjects[key])
    style = Style()
    style.theme_use(self.theme)

  
  def objectCheckbox(self, name, fields):
    var = StringVar()
    cb = Checkbutton(self.frame.interior, variable=var, text='  '+name, onvalue=name, offvalue='', command=self.updateActiveList, background=dark_1, activebackground=dark_3, font=Font(family='Roboto'), foreground=white, selectcolor=dark_1)
    cb.grid(padx=8, pady=8, sticky=W, columnspan=3)
    if name in self.activeObjects:
      var.set(name)
      self.objFormFields[name] = {}
      for field in fields:
        if field['name'] not in ignore_list:
          self.objectField(name, field['name'], field['label'])
    self.objFormList.append(var)

  def objectField(self, objectName, fieldName, label):
    var = StringVar()
    cb = Checkbutton(self.frame.interior, variable=var, text='  '+label, onvalue=fieldName, offvalue='',  command=self.updateFieldList, background=dark_1, activebackground=dark_3, font=Font(family='Roboto', size=11), foreground='#e0e0e0', selectcolor=dark_1)
    cb.grid(padx=36, pady=0, columnspan=2, column=1, sticky=W)
    if objectName in self.activeObjectFields and fieldName in self.activeObjectFields[objectName]:
      var.set(fieldName)
    self.objFormFields[objectName][fieldName] = var

  def updateActiveList(self, refreshView=True):
    self.updateFieldList(refreshView)
    if refreshView:
      self.buildObjSelector()


  def updateFieldList(self, refreshView=True):
    aof_history = deepcopy(self.activeObjectFields)
    ao_history = deepcopy(self.activeObjects)
    self.activeObjects = []
    self.activeObjectFields = {}
    oldChange = self.curNotebook
    self.curNotebook = None
    
    for obj in self.objFormList:
      objName = obj.get()
      if objName != '':
        if self.curNotebook is None and objName not in ao_history:
          self.curNotebook = objName
        self.activeObjects.append(objName)
        self.activeObjectFields[objName] = []
        if objName in self.objFormFields:
          for field in self.objFormFields[objName]:
            fieldName = self.objFormFields[objName][field].get()
            if fieldName != '':
              self.activeObjectFields[objName].append(fieldName)
              if self.curNotebook is None and field not in aof_history[objName]:
                self.curNotebook = objName
    
    if self.curNotebook == None:
      self.curNotebook = oldChange
    
    self.activeObjects.sort()
    if refreshView:
      self.buildConfigurePanel()

  
  #------------------------------------------------------------------------------------------------------
  # Right Panel
  #------------------------------------------------------------------------------------------------------
  
  def buildConfigurePanel(self):
    if self.panel:
      self.panel.grid_forget()
      self.panel.destroy()
    self.panel = VerticalScrolledFrame(root)
    self.panel.grid(row=0, column=1)
    self.activeObjects.sort()
    Label(self.panel.interior, text='SObject Schema Configuration                                       ', font=Font(family='Roboto', size=21, weight='bold'), foreground='#222').grid(padx=24, pady=16, columnspan=4)
    n = Notebook(self.panel.interior)

    def notebook_tab_change(tst):
      self.curNotebook = n.tab(n.select(), "text")
      self.buildCodepad()

    n.bind('<<NotebookTabChanged>>', notebook_tab_change)
    i = 0
    for sObject in self.activeObjects:
      frame = Frame(n)
      self.buildSObjectConfig(sObject, frame)
      n.add(frame, text=sObject)
      if sObject == self.curNotebook:
        n.select([i])
      i += 1
    n.grid(padx=24, pady=8, columnspan=4, sticky=W+E)
    self.n = n
    self.buildCodepad()
    style = Style()
    style.theme_use(self.theme) 

  def buildCodepad(self):
    if self.codepad != None:
      self.codepad.destroy()

    if len(self.activeObjects) > 0:
      self.codepad = Text(self.panel.interior, height=4, width=30, background=dark_2, foreground=white, padx=8, pady=8, font=Font(family='Courier'))
      
      self.codepad.grid(
        padx=24, pady=16, columnspan=4, sticky=W+E
      )
      
      self.generateF2B(self.curNotebook or self.n.tab(self.n.select(), 'text'), self.codepad)
      self.codepad.config(state=DISABLED)
    else:
      self.codepad = None

  
  def buildSObjectConfig(self, sObjectName, frame):
    frame.config(background=white)
    Label(frame, text=sObjectName, font=Font(family='Roboto', size=16, weight='bold'), background=white).grid(
      padx=16, pady=16, sticky=W, column=0, row=self.next_row()
    )
    self.defaults[sObjectName] = {}
    self.defaults[sObjectName]['_meta'] = {}
    cacheVar = IntVar()
    self.defaults[sObjectName]['_meta']['cached'] = cacheVar
    cacheTimeVar = StringVar()
    self.defaults[sObjectName]['_meta']['cacheTime'] = cacheTimeVar
    cacheTimeMultiVar = StringVar()
    self.defaults[sObjectName]['_meta']['cacheTimeMultiplier'] = cacheTimeMultiVar

    throttleVar = IntVar()
    self.defaults[sObjectName]['_meta']['throttle'] = throttleVar
    throttleTimeVar = StringVar()
    self.defaults[sObjectName]['_meta']['throttleTime'] = throttleTimeVar
    throttleRateVar = StringVar()
    self.defaults[sObjectName]['_meta']['throttleRate'] = throttleRateVar
    throttleTimeMultiVar = StringVar()
    self.defaults[sObjectName]['_meta']['throttleTimeMultiplier'] = throttleTimeMultiVar   

    # Cache Section
    cacheCanvas = Canvas( frame, background=white, bd=0, relief=FLAT, highlightthickness=0 )
    cacheCanvas.grid(column=0, row=self.next_row(), columnspan=4, sticky=W, padx=24, pady=16)

    cacheCb = Checkbutton( cacheCanvas, variable=cacheVar, command=self.updateTransformRefresh, background=white, font=Font(family='Roboto'), text=' Cached').pack(side=LEFT, padx=8)
    overwrite, val = self.overwriteDefault(sObjectName, '_meta', 'cached')
    if overwrite and not val:
      cacheVar.set(0)
      cache = False
    else:
      cacheVar.set(1)
      cacheTime = NumberEntry(cacheCanvas, textvariable=cacheTimeVar, justify=RIGHT, width=6)
      cacheTime.pack(side=LEFT)
      
      ctOverwrite, ctVal = self.overwriteDefault(sObjectName, '_meta', 'cacheTime')
      if ctOverwrite and ctVal != '':
        cacheTimeVar.set(ctVal)
      else:
        cacheTimeVar.set('30')
      cacheTimeCombo = Combobox(cacheCanvas, textvariable=cacheTimeMultiVar, values='seconds minutes hours days weeks months', background=white, foreground='#222')
      cacheTimeCombo.bind('<<ComboboxSelected>>', self.updateTransforms)
      cacheTimeCombo.pack(side=LEFT)
      cacheTimeMultiVar.set('minutes')
      ctmOverwrite, ctmVal = self.overwriteDefault(sObjectName, '_meta', 'cacheTimeMultiplier')
      if ctmOverwrite and ctmVal != '':
        cacheTimeMultiVar.set(ctmVal)

    # Throttle Section
    throttleCanvas = Canvas( frame, background=white, bd=0, relief=FLAT, highlightthickness=0 )
    throttleCanvas.grid(column=0, row=self.next_row(), columnspan=4, sticky=W, padx=24, pady=16)
    Checkbutton( throttleCanvas, variable=throttleVar, command=self.updateTransformRefresh, background=white, font=Font(family='Roboto'), text=' Throttle creation').pack(side=LEFT, padx=8)
    overwriteThr, thrVal = self.overwriteDefault(sObjectName, '_meta', 'throttle')
    if overwriteThr and thrVal:
      throttleVar.set(1)
      NumberEntry(throttleCanvas, textvariable=throttleRateVar, justify=RIGHT, width=6).pack(side=LEFT)
      Label(throttleCanvas, text='per', font=Font(family='Roboto', size=13), background=white).pack(side=LEFT)
      NumberEntry(throttleCanvas, textvariable=throttleTimeVar, justify=RIGHT, width=6).pack(side=LEFT)
      throttleTimeCombo = Combobox(throttleCanvas, textvariable=throttleTimeMultiVar, values='seconds minutes hours days weeks months', background=white, foreground='#222')
      throttleTimeCombo.bind('<<ComboboxSelected>>', self.updateTransforms)
      throttleTimeCombo.pack(side=LEFT)

      trOverwrite, trVal = self.overwriteDefault(sObjectName, '_meta', 'throttleRate')
      ttOverwrite, ttVal = self.overwriteDefault(sObjectName, '_meta', 'throttleTime')
      ttmOverwrite, ttmVal = self.overwriteDefault(sObjectName, '_meta', 'throttleTimeMultiplier')
      if trOverwrite and trOverwrite != '':
        throttleRateVar.set(trVal)
      else:
        throttleRateVar.set('3')
      if ttOverwrite and ttOverwrite != '':
        throttleTimeVar.set(ttVal)
      else:
        throttleTimeVar.set('30')
      if ttmOverwrite and ttmOverwrite != '':
        throttleTimeMultiVar.set(ttmVal)
      else:
        throttleTimeMultiVar.set('minutes')
    else:
      throttleVar.set(0)
    

    Separator(frame, orient=HORIZONTAL).grid(
      sticky=E+W, row=self.next_row(), columnspan=4, padx=16, pady=16
    )

    
    if len(self.activeObjectFields[sObjectName]) == 0:
      Label(frame, text='No fields selected.', font=Font(family='Roboto', size=14), bg=white).grid(
        padx=8, pady=8, sticky=W, column=0, row=self.next_row()
      )
    for field in self.activeObjectFields[sObjectName]:      
      self.buildSObjectFieldConfig(sObjectName, field, frame)

  def fieldAndOptions(self, sObjectName, fieldName, disableCache=False):
    field = [ f for f in self.sObjects[sObjectName] if f['name'] == fieldName ][0]    
    options = [
      ('searchable', True, False),
      ('readonly', field['readOnly'], field['readOnly']),
      ('required', field['required'], field['required']),
      #('cached', not disableCache, disableCache),
      ('unique', field['unique'], True)
      #('detail-only', False, False)
    ]
    return (field, options)

  def buildSObjectFieldConfig(self, sObjectName, fieldName, frame):
    typeVar = StringVar()
    cacheOverwrite, cacheVal = self.overwriteDefault(sObjectName, '_meta', 'cached')

    field, options = self.fieldAndOptions(sObjectName, fieldName, (cacheOverwrite and not cacheVal))
    typeVarOptions = ['integer','string','boolean','datetime','text','array(string)']
    if field['type'] in typeVarOptions:
      typeVar.set(field['type'])
    else:
      typeVar.set('string')    
    overwrite, val = self.overwriteDefault(sObjectName, fieldName, 'type')
    if overwrite:
      typeVar.set(val)
    p = Panedwindow(frame, orient=VERTICAL)
    f = LabelFrame(p, text= '  '+ field['label'] + ' (' + fieldName + ')  ', bd=1, background=white, font=Font(family='Roboto', size=13), padx=8, pady=8 )
    f.config(background=white)
    typeCombo = Combobox(f, textvariable=typeVar, values='integer string boolean datetime text array(string)', background=white, foreground='#222')
    typeCombo.bind('<<ComboboxSelected>>', self.updateTransforms)
    typeCombo.grid(padx=8, pady=8, column=0, row=self.cur_row(), sticky=W, columnspan=2)
    self.ct = 2
    
    self.defaults[sObjectName][fieldName] = {}
    for opt, default, disable in options:
      self.addCheckbox(sObjectName, fieldName, opt, default, disable, f)
    p.add(f)
    p.grid(padx=8, pady=8, row=self.next_row(), sticky=W, columnspan=4)
    self.defaults[sObjectName][fieldName]['type'] = typeVar

  def addCheckbox(self, sObjectName, fieldName, option, default, disable, frame):
    textvar = StringVar()
    if self.ct == 8:
      self.ct = 0
      self.rowct += 1
    cb = Checkbutton(frame, variable=textvar, text=' '+option, onvalue=option, offvalue='', command=self.updateTransforms, state=DISABLED if disable else NORMAL, background=white, font=Font(family='Roboto'), disabledforeground='#BDBDBD')
    
    if default:
      textvar.set(option)
    overwrite, val = self.overwriteDefault(sObjectName, fieldName, option)
    if overwrite and val:
      textvar.set(option)
    elif overwrite and not val:
      textvar.set('')

    cb.grid(padx=8, pady=8, column=self.ct, row=self.rowct, sticky=W)
    self.defaults[sObjectName][fieldName][option] = textvar
    self.ct += 1

  def overwriteDefault(self, sObjectName, fieldName, config):
    if sObjectName in self.transforms and fieldName in self.transforms[sObjectName] and config in self.transforms[sObjectName][fieldName] and self.transforms[sObjectName][fieldName][config] is not None:
      return (True, self.transforms[sObjectName][fieldName][config])
    return (False, None)

  #------------------------------------------------------------------------------------------------------
  # Packaging
  #------------------------------------------------------------------------------------------------------

  def updateTransformRefresh(self, e=None):
    self.updateTransforms(e)
    self.buildConfigurePanel()

  def updateTransforms(self, e=None):
    transforms = {}
    for obj in self.activeObjects:
      if obj in self.activeObjectFields:
        transforms[obj] = {}
        transforms[obj]['_meta'] = {}
        props = ['cached', 'cacheTime', 'cacheTimeMultiplier', 'throttle', 'throttleTime', 'throttleRate', 'throttleTimeMultiplier']
        for prop in props:
          if self.defaults[obj]['_meta'][prop].get() != '':
            transforms[obj]['_meta'][prop] = self.defaults[obj]['_meta'][prop].get()
        
        for field in self.activeObjectFields[obj]:
          fieldObj, options = self.fieldAndOptions(obj, field)
          transforms[obj][field] = {}
          if self.defaults[obj][field]['type'].get() != fieldObj['type']:
            transforms[obj][field]['type'] = self.defaults[obj][field]['type'].get()
          for name, default, disabled in options:
            if not disabled and default and self.defaults[obj][field][name].get() == '':
              transforms[obj][field][name] = False
            elif not disabled and not default and self.defaults[obj][field][name].get() != '':
              transforms[obj][field][name] = True
    self.transforms = transforms
    self.buildCodepad()

  def generateF2B(self, obj=None, text=None):
    
    lines = 2
    _ = None
    if obj is None:
      self.textStr = ''
      self.textStr += baseDDL
      for activeObj in self.activeObjects:
        self.generateF2B(activeObj)
        self.textStr += '\n\n'
      return self.textStr
    
    if text:
      def _(contents, tag=None):
        tag = tag if tag else 'normal'
        text.insert(END, contents, tag)
      text.tag_config('strong', foreground='#fbc531')
      text.tag_config('params', foreground='#9c88ff')
      text.tag_config('normal', foreground=white)
      text.tag_config('keyword', foreground='#00a8ff')
      text.tag_config('value', foreground='#e84118')
      text.tag_config('enum', foreground='#4cd137')
    else:
      def _(contents, tag=None):
        self.textStr += contents
    if obj:
      form = self.defaults[obj]
      meta = form['_meta']

      _(str(obj.lower()), 'strong')
      _(' (')
      _('SOBJECT', 'params')
      if meta['cached'].get() == 1:
        _(', OFFLINE', 'params')
        lines += 1
      _(') ')
      if meta['throttle'].get() == 1:
        lines += 2
        _('[\n  ')
        _('max ', 'keyword')
        _( meta['throttleRate'].get(), 'value')
        _(' / ')
        _(meta['throttleTime'].get(), 'value')
        _(' ' + meta['throttleTimeMultiplier'].get(), 'keyword')
        _('\n] ')
      _('{\n')
      
      i = 0
      if meta['cached'].get() == 1:
        _('  keep_fresh ')
        _('integer ', 'enum')
        _('local-only ', 'keyword')
        _(': ')
        _(meta['cacheTime'].get(), 'value')
        _(' ' + meta['cacheTimeMultiplier'].get(), 'keyword')
        _(',\n')
      
      if obj in self.activeObjectFields:
        for field in self.activeObjectFields[obj]:
          formField = form[field]
          _('  ' + field.lower() + ' ')
          _(formField['type'].get(), 'enum')
          
          if formField['readonly'].get():
            _(' read-only', 'keyword')

          for prop in ['required', 'searchable', 'unique']:
            if formField[prop].get():
              _(' ' + prop, 'keyword')
          i += 1
          if i < len(self.activeObjectFields[obj]):
            _(',')

          _('\n')
        _('}')
        lines += len(self.activeObjectFields[obj])
        if text:
          text.config(height=lines)

    if not text:
      return self.textStr

  def save(self):
    self.updateActiveList(False)
    self.save_pickle((self.activeObjects, self.activeObjectFields, self.transforms))
    self.oldTransforms = deepcopy( (self.activeObjects, self.activeObjectFields, self.transforms) )
    f2b = self.generateF2B()
    self.save_ddl(f2b)
    try:
      build_schema(f2b)
      messagebox.showinfo(title='Success!', message='Schema successfully generated at src/schema.ts')
    except Exception as e:
      messagebox.showerror(title='Parser Error', message='Failed to generate Schema.JSON: ' + str(e))
      return
    
    
  def save_ddl(self, schema):
    try:
      with open('schema.f2b', 'w+') as f2b:
        f2b.write(schema)
    except:
      messagebox.showerror(title='Filesystem Error', message='Failed to save DDL!')      
  
  def save_pickle(self, obj):
    renameStr = None
    if not self.unsavedChanges():
      return None
    if isfile('schemaConfig.pkl'):
      datestr = str(datetime.now().date())      
      if isfile('schemaConfig-backup-' + datestr + '.pkl'):
        i = 2
        while isfile('schemaConfig-backup-' + datestr + '(' + str(i) + ')' + '.pkl'):
          i += 1
        renameStr = 'schemaConfig-backup-' + datestr + '(' + str(i) + ')' + '.pkl'
      else:
        renameStr = 'schemaConfig-backup-' + datestr + '.pkl'
      try:
        rename('schemaConfig.pkl', renameStr)
      except:
        messagebox.showerror(title='Filesystem Error', message='Failed to backup old schema. No changes were made.')
    try:
      with open('schemaConfig.pkl', 'wb+') as pkl:
        pickle.dump(obj, pkl)
    except:
      messagebox.showerror(title='Filesystem Error', message='Failed to backup old schema. No changes were made.')

  def load_pickle(self, file='schemaConfig.pkl'):
    if not isfile(file):
      return ([], {}, {})
    try:
      with open(file, 'rb') as pkl:
        return pickle.load(pkl)
    except:
      messagebox.showerror(title='Filesystem Error', message='Failed to load existing schema. The file may be locked.')
      return None

  def next_row(self):
    self.rowct += 1
    return self.rowct

  def cur_row(self):
    return self.rowct

def openApp(sObjects):
  global root
  root = Tk()
  app = Application(root, sObjects)
  app.master.title('Salesforce F2BDDL Schema Builder')
  app.mainloop()
