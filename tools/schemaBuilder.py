from tkinter.ttk import *
from tkinter.ttk import Checkbutton
from tkinter import *
from tkinter.font import *
from tkinter import filedialog
from tkinter import messagebox
import pickle
from os.path import isfile
from os import rename, remove
loginRoot = Tk()
from datetime import datetime
import sys
import hashlib
from copy import deepcopy
from simple_salesforce import Salesforce
from controller import openApp

ignore_list = ['Id', 'LastModifiedDate', 'CreatedDate', 'IsDeleted']

dark_1 = '#eceff1'
dark_2 = '#212121'
dark_3 = '#7f8fa6'
primary = '#21A0DF'
white = '#000'

USERNAME = 'eddie.montalbano@gmail.com'
TOKEN = 'x0ycBUNO4kcvfiwceDDij1Itt'
PASSWORD = ''
IS_SANDBOX = False

class Login(Frame):
  sf = None
  interior = None
  loginForm = {}

  def __init__(self, master=None):
    Frame.__init__(self, master)
    self.loginData = self.loadLoginData()
    self.buildLoginPane()
  
  def buildLoginPane(self):
    usernameVar = StringVar()
    usernameRememberVar = IntVar()
    passwordVar = StringVar()
    passwordRememberVar = IntVar()
    tokenVar = StringVar()
    tokenRememberVar = IntVar()
    sandboxVar = IntVar()

    savedLoginData = self.loadLoginData()
    if savedLoginData['username'] != '':
      usernameRememberVar.set(1)
      usernameVar.set(savedLoginData['username'])
    
    if savedLoginData['password'] != '':
      passwordRememberVar.set(1)
      passwordVar.set(savedLoginData['password'])

    if savedLoginData['token'] != '':
      tokenRememberVar.set(1)
      tokenVar.set(savedLoginData['token'])
    
    if savedLoginData['sandbox']:
      sandboxVar.set(1)
    
    
    outer = Frame(background=dark_1)
    outer.grid()
    f=Frame(outer, background=dark_1)
    f.grid(padx=24, pady=48)
    
    Label(f, text='Salesforce Schema Builder Login', font=Font(family='Roboto', size=18), background=dark_1, foreground=white).grid(
      column=0, row=0, columnspan=3, pady=24
    )

    Label(f, text='Salesforce Username:', font=Font(family='Roboto'), background=dark_1, foreground=white).grid(
      column=0, row=1, sticky=E, pady=8, padx=8
    )
    Entry(f, textvariable=usernameVar, width=40).grid(
      column=1, row=1, pady=8, padx=8
    )
    Checkbutton(f, variable=usernameRememberVar, text=' Save', font=Font(family='Roboto'), background=dark_1, activebackground=dark_1, foreground=white).grid(
      column=2, row=1, pady=8, padx=8
    )
    Label(f, text='Password:', font=Font(family='Roboto'), background=dark_1, foreground=white).grid(
      column=0, row=2, sticky=E, pady=8, padx=8
    )
    Entry(f, textvariable=passwordVar, show='*', width=40).grid(
      column=1, row=2, pady=8, padx=8
    )
    Checkbutton(f, variable=passwordRememberVar, text=' Save', font=Font(family='Roboto'), background=dark_1, activebackground=dark_1, foreground=white).grid(
      column=2, row=2, pady=8, padx=8
    )
    Label(f, text='Security Token:', font=Font(family='Roboto'), background=dark_1, foreground=white).grid(
      column=0, row=3, sticky=E, pady=8, padx=8
    )
    Entry(f, textvariable=tokenVar, width=40).grid(
      column=1, row=3, pady=8, padx=8
    )
    Checkbutton(f, variable=tokenRememberVar, text=' Save', font=Font(family='Roboto'), background=dark_1, activebackground=dark_1, foreground=white).grid(
      column=2, row=3, pady=8, padx=8
    )
    Checkbutton(f, variable=sandboxVar, text=' Sandbox', font=Font(family='Roboto'), background=dark_1, activebackground=dark_1, foreground=white).grid(
      column=1, row=4, pady=8, sticky=W, padx=8
    )
    Button(f, command=self.doLogin, text='LOGIN', background=primary, foreground='#FFF', font=Font(family='Roboto', size=14, weight='bold'), padx=32, pady=4, relief=FLAT).grid(
      column=0, row=5, sticky=W+E, pady=8, padx=8, columnspan=3
    )
    self.loginForm = {
      'username': usernameVar,
      'unRemember': usernameRememberVar,
      'password': passwordVar,
      'pwRemember': passwordRememberVar,
      'token': tokenVar,
      'tkRemember': tokenRememberVar,
      'sandbox': sandboxVar
    }
    style = Style()
    if 'aqua' in style.theme_names():
      self.theme = 'aqua'
    elif 'vista' in style.theme_names():
      self.theme = 'vista'
    else:
      self.theme = 'classic'
    style.theme_use(self.theme)


  def doLogin(self):
    try:
      f = self.loginForm
      self.sf = Salesforce(
        username=f['username'].get(),
        password=f['password'].get(),
        security_token=f['token'].get(),
        sandbox=f['sandbox'].get() == 1
      )
      self.saveLoginInfo()     
      
    except:
      messagebox.showerror(title='Failed to login', message='Please check your username and password')
      return None
    try:
      sObjects = self.buildDataStructure()
      loginRoot.destroy()
      openApp(sObjects)
    except Exception as e:
      print(e)

  def loadLoginData(self):
    if isfile('DONTcommitMe.pkl'):
      try:
        with open('DONTcommitMe.pkl', 'rb') as pkl:
          return pickle.load(pkl)
      except:
        pass
    return {'username':'', 'password':'', 'token':'', 'sandbox': 0}

  def saveLoginInfo(self):
    f = self.loginForm
    loginData = {
      'username': f['username'].get() if f['unRemember'].get() else '',
      'password': f['password'].get() if f['pwRemember'].get() else '',
      'token': f['token'].get() if f['tkRemember'].get() else '',
      'sandbox': f['sandbox'].get()
    }
    try:
      with open('DONTcommitMe.pkl', 'wb+') as creds:
        pickle.dump(loginData, creds)
    except Exception as e:
      messagebox.showerror(title='Filesystem Error', message='Failed to save login data:' + str(e))
    

  def buildDataStructure(self):
    describe = self.sf.describe()["sobjects"]
    existingTypes = [
      'id', 'boolean', 'reference', 'string', 'picklist',
      'textarea', 'double', 'address', 'phone', 'url', 
      'currency', 'int', 'date', 'time', 'datetime', 
      'percent', 'email', 'base64', 'combobox', 'multipicklist']
    conversion = {
      'boolean': 'boolean', 
      'multipicklist': 'array(string)', 
      'datetime': 'datetime',
      'int': 'integer'
    }
    sObjects = {}
    for obj in describe:
      if obj['layoutable']: # We don't want to deal with sobjects like oauth tokens or apex classes
        objDesc = getattr(self.sf, obj['name']).describe()
        fields = []

        for field in objDesc['fields']:
          name = field['name']
          label = field['label']
          objType = field['type']
          reference = None
          valuePairs = None
          if objType not in existingTypes:
            existingTypes.append(objType)
            print('WARNING: type not found: ' + objType)
            print(field)
            print('--------------------')
          if objType == 'relationship':
            reference = field['referenceTo'][0]
          if objType == 'picklist' or objType == 'combobox' or objType == 'multipicklist':
            valuePairs = []
            for val in field['picklistValues']:
              if val['active']:
                valuePairs.append((val['label'], val['value']))
            
          defaultValue = field['defaultValue']
          size = field['byteLength']
          unique = field['unique']
          readOnly = not field['updateable']
          required = not field['nillable']
          fields.append({
            'name': name, 
            'label': label,
            'type': objType,
            'reference': reference,
            'values': valuePairs,
            'defualt': defaultValue,
            'size': size,
            'unique': unique,
            'required': required,
            'readOnly': readOnly
          })
        sObjects[ obj['name'] ] = fields
    return sObjects
  
app = Login(loginRoot)
app.master.title('Schema Builder Login')
app.mainloop()