import { version, schemaSQL, schema } from '../schema';
import { SJCLWrapper } from '../common/utils';
import { Injectable, EventEmitter } from '@angular/core';
import {Store} from '@ngrx/store';

declare var sqlitePlugin:any;
declare var device:any;
export class CacheControlObject {
  channel: string;
  totalSize: number;
  currentSize: number;
  lastCheck: Date;
  filters: any;
  currentOffset: number;
}

@Injectable()
export class CacheService {
  public channels: CacheControlObject[] = [];
  protected fullChannels: CacheControlObject[] = [];
  protected newData: EventEmitter<number[]> = new EventEmitter(true);
  public currentItemCount: number = -1;
  public filteredItemCount: number = -1;
  public fullItemCount: number = -2;
  public isFull: boolean = false;
  public curChannel: string = '&initial&';
  protected db: any;
  protected pendingRequests: any[];

  constructor(protected sjcl: SJCLWrapper) {

  }

  /**
   * Unlock Database
   * 
   * Unlocks the local SQLcipher database using a pbkdf2 of the provided passcode. If no passcode is
   * provided, it will use the cached sqlite code to unlock the database.
   * 
   * @param passcode The unsalted code used to unlock the database
   * @returns Boolean on success / failure
   */
  public async unlockDatabase(passcode?: string, destroyExisting?: boolean) {
    return new Promise<any>( (resolve, reject) => {
      const code = (passcode) ? 
        this.sjcl.hash(passcode + version + 'a8853jkhlafsasf783g' + ((typeof device !== 'undefined') ?  device.uuid : 'blank')  ) :
        localStorage.getItem('sqlite-code');
      
      if (code === null || typeof sqlitePlugin === 'undefined') {
        resolve(false);
      }

      const dbname = this.sjcl.sha256(code);

      const existingDb = localStorage.getItem('sqlite-db');
      if (existingDb !== null && dbname !== existingDb && destroyExisting) {
        sqlitePlugin.deleteDatabase({name: existingDb + '.db', location: 'default'});
      } else if (existingDb !== null && dbname !== existingDb) {
        resolve(false);
      }

      if (existingDb !== dbname) {
        localStorage.setItem('sqlite-db', dbname);
      }    

      if (code !== null) {
        this.db = sqlitePlugin.openDatabase({
          name: dbname + '.db', key: code, location: 'default'
        }, db => {
          this.db = db;
          const tables = schemaSQL.split(';');
          for (let i=0; i<tables.length; i++) {
            this.db.executeSql(tables[i].replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS'));
          }
          localStorage.setItem('sqlite-code', code);
          resolve(true);
        }, err => {
          console.log('error');
          console.log(err);
          reject(false);
        });
      }
    });
  }

  private async checkDb() {
    if (!this.db) {
      return await this.unlockDatabase();
    } else {
      return true;
    }
  }

  /**
   * execute
   * 
   * Runs a SQLite query on the local database.
   */
  private async execute(query: string, values: string[]) {
    if (!await this.checkDb()) {
      return;
    }
    return new Promise<any>( (resolve, reject) => {      
      this.db.transaction(tx => {
        this.db.executeSql(query, values, (resultSet) => {
          resolve(resultSet);
        }, err => {
          debugger;
          console.log('query error: ', err);
          reject(err);
        });
      }, txError => {
        console.log('transaction error: ', txError);
        reject(txError.message);
      });
    });
  }

  /**
   * Create an object in local cache
   * 
   * @param obj The object to save in the local cacher
   * @param objType The type name
   * @param pending Boolean based on whether or not the object has already saved successfully in the server
   */
  public async create(obj, objType: string, pending?: boolean) {
    if (!await this.checkDb()) {
      return;
    }

    const fields = schema[objType]['properties'];
    let newObj = [undefined];
    for (const field in fields) {
      if (field === 'cache_age') {
        newObj.push(this.currentTime())
      } else if (field === 'pending_create' && pending) {
        newObj.push(1);
      } else {
        newObj.push(this.processField(field, obj, fields[field]));
      }
    }
    
    const createStmt = 'INSERT INTO ' + objType + ' VALUES (' + ( newObj.map(a=>'?').join(',') ) + ')';
    return (await this.execute(createStmt, newObj)).insertId;
  }

  /**
   * Update an object in local cache
   * 
   * @param obj Object changes (PATCH style)
   * @param objType The type name
   * @param id The ID of the object to update
   * @param idField The field name used to track the local id. Defaut: "local_id"
   */
  public async update(obj, objType: string, id: string, idField?: string) {
    if (!await this.checkDb()) {
      return;
    }

    idField = (idField) ? idField : 'local_id';    

    const fields = schema[objType]['properties'];
    let newObj = [];
    let fieldStr = '';
    const addField = (f) => {
      if (fieldStr !== '') {
        fieldStr += ', ';
      }
      fieldStr += f + ' = ?';
    }
    for (const field in fields) {
      if (field === 'cache_age') {
        newObj.push(this.currentTime());
        addField(field);
      } else if (typeof obj[field] !== 'undefined') {
        newObj.push(obj[field]);
        addField(field);
      }
    }
    
    let updateStmt = 'UPDATE ' + objType + ' SET ' + fieldStr + ' WHERE ' + idField + '=\'' + id + '\'';
    return this.execute(updateStmt, newObj);
  }

  /**
   * Deletes an object from local cache.
   * 
   * @param objType The type name
   * @param id The ID of the object to delete
   * @param idField The field name used to track the local id. Default: "local_id"
   */
  public async delete(objType: string, id:string, idField?:string) {
    if (!await this.checkDb()) {
      return;
    }
    idField = (idField) ? idField : 'local_id';
    
    let deleteStmt = 'DELETE FROM ' + objType + ' WHERE ' + idField + '=\'' + id + '\'';
    return this.execute(deleteStmt, []);
  }


  /**
   * Updates and inserts a list of objects into local cache. Can perform both updates and inserts
   * in the same operation.
   * 
   * @param objs An array of objects to update/insert into local cache.
   * @param objType The type name.
   */
  public async batchUpsert(objs: any[], objType: string) {
    if (objs.length === 0) {
      return;
    }
    if (!await this.checkDb()) {
      return;
    }

    let toCreate = [];
    let toUpdate = [];
    let toUpdateLocalId = {};
    let valSet = [];
    let existing = [];
    const idSet = objs.map( obj => obj['id'] );
    const resultSet = await this.execute('SELECT id FROM ' + objType + ' WHERE id IN (' + idSet.map( a => '?' ).join(',') + ')', idSet);
    console.log(resultSet);
    for (let i=0; i < resultSet.rows.length; i++) {
      existing.push(resultSet.rows.item(i).id);
    }

    for (let i=0; i<objs.length; i++) {
      if (!(objs[i]['id'] in existing)) {
        toCreate.push(objs[i]);
      } else {
        valSet.push(objs[i]['id']);
        valSet.push(objs[i]['lastmodifieddate']);
        toUpdate.push('(id = ? and lastmodifieddate != ?)');
      }
    }
    if (toUpdate.length > 0) {
      const needUpdate = await this.execute('SELECT id, local_id FROM ' + objType + ' WHERE ' + toUpdate.join(' OR '), valSet);
      existing = [];
      toUpdate = [];
      for (let i=0; i<needUpdate.rows.length; i++) {
        existing.push(needUpdate.rows.item(i).id);
        toUpdateLocalId[needUpdate.rows.item(i).id] = needUpdate.rows.item(i).local_id;
      }

      for (let i=0; i<objs.length; i++) {
        if (!(objs[i]['id'] in existing)) {
          toUpdate.push(objs[i]);
        }
      }

      for (let i=0; i<toUpdate.length; i++) {
        await this.update(toUpdate[i], objType, toUpdateLocalId[toUpdate[i]['id']]);
      }
    }

    this.batchCreate(toCreate, objType);
  }

  /**
   * Creates a list of objects in local cache. Used by batchUpsert to create objects which 
   * don't currently exist in local store.
   * 
   * @param objs An array of objects to create
   * @param objType The type name
   */
  public async batchCreate(objs: any[], objType: string) {
    if (objs.length === 0) {
      throw 'Error: No objects provided';
    }
    if (!await this.checkDb()) {
      return;
    }

    const fields = schema[objType]['properties'];
    let newObjs = [];
    let fieldMap = null;
    for (var i=0; i<objs.length; i++) {
      newObjs.push(undefined);
      const obj = objs[i];
      let j = ['?'];
      for (const field in fields) {
        if (field === 'cache_age') {
          newObjs.push(this.currentTime())
        } else {
          newObjs.push(this.processField(field, obj, fields[field]));
        }
        if (fieldMap === null) {
          j.push('?');
        }        
      }
      if (fieldMap === null) {
        fieldMap = j;
      }      
    }
    const singleInsert = '(' + fieldMap.join(',') + ')';
    const createStmt = 'INSERT INTO ' + objType + ' VALUES ' + objs.map( a => singleInsert ).join(',');
    return this.execute(createStmt, newObjs);
  }

  /**
   * This function is called when a service is first initialized. If the object can be cached, this will take data 
   * from local cache and add it to the application state.
   * 
   * @param store Reference to the reducer to add into.
   * @param key (Optional) The type name to rebuild. Default: null (rebuild all cached models)
   */
  public async rebuildReducers(store, key?:string) {
    
    if (!key) {
      for (const key in this.cachedModels()){
        await this.rebuildReducers(store, key);
      }
    } else {
      
      const resultSet = await this.execute('SELECT * FROM ' + key, []);
      const records = [];
      const fieldList = this.serverFields(key);
      for (let i=0; i< resultSet.rows.length; i++) {
        let obj = {};
        const result = resultSet.rows.item(i);
        fieldList.map( field => {
          obj[field] = result[field];
        });
        records.push(obj);
      }
      store.select(key);

      store.dispatch({
        type: 'set_' + key,
        payload: { data: records }
      });
    }

  }
  
  /**
   * Purges items which have exceeded the schema's set freshness limit. Only runs after a connection has 
   * been established with the server and data can be refreshed.
   * 
   * @param key (Optional) The type name to purge. Default: null (purge all cached models)
   */
  public async purgeOldItems(key?: string) {
    if (!await this.checkDb()) {
      return;
    }
    if (!key) {
      for (const key in this.cachedModels()) {
        await this.purgeOldItems(key);
      } 
    } else {
      let pruneTime = 172800;
      try {
        pruneTime = schema[key]['properties']['prune']['default'];
      } catch (e) { }
      await this.execute('DELETE FROM ' + key + ' WHERE cache_age < ' + (this.currentTime() -  pruneTime), []);
    }
  }

  /** 
   * Retries pending items which have been stored in the local sqlite database
   */
  public async retryFromDatabase(restService: any, key?: any) {
    if (!key) {
      for (const key in this.cachedModels()) {
        await this.retryFromDatabase(restService, key);
      } 
    } else {
      const fieldList = this.serverFields(key);
      const pending = await this.execute('SELECT ' + fieldList.join(',') + ' FROM ' + key + ' WHERE pending_create = 1 OR pending_update = 1', []);
      const toCreate = [];
      const toUpdate = [];
      for (let i=0; i<pending.rows.length; i++) {
        const item = pending.rows.item(i);
        if (item['pending_create'] === 1) {
          toCreate.push(item);
        } else if (item['pending_update'] === 1) {
          toUpdate.push(item);
        } else {
          throw 'Logic Error: item was returned from database which had neither pending create or pending update flag set.';
        }
      }

      if (toCreate.length + toUpdate.length === 0) {
        return;
      }

      for (const obj in toCreate) {
        await restService.create(key, obj);
      }

      for (const obj in toUpdate) {
        await restService.update(key, obj);
      }
    }
  }

  public cacheQuery(query: string) {
    const hash = this.microhash(query);
    localStorage.setItem(hash, ''+this.currentTime());
  }

  public isFresh(query: string, time: number) {
    const hash = this.microhash(query);
    const lastFetch = localStorage.getItem(hash);
    return (lastFetch !== null && parseInt(lastFetch, 10) + time > this.currentTime());
  }

  /**
   * Hashes any size string into a small, insecure hash quickly.
   */
  private microhash(s: string) {
    var a = 1, c = 0, h, o;
    if (s) {
      a = 0;
      /*jshint plusplus:false bitwise:false*/
      for (h = s.length - 1; h >= 0; h--) {
        o = s.charCodeAt(h);
        a = (a<<6&268435455) + o + (o<<14);
        c = a & 266338304;
        a = c!==0?a^c>>21:a;
      }
    }
    return String(a);
  }

  protected cachedModels(): string[] {
    return Object.keys(schema).filter( key => typeof schema[key]['properties']['pending_create'] !== 'undefined' )
  }

  protected serverFields(key: string): string[] {
    const metaFields = schema[key]['ignoreList'];
    const fieldList = [];
    let j = 0;
    for (const field in schema[key]['properties']) {
      j++;
      if (metaFields.indexOf(j) === -1) {
        fieldList.push(field);
      }
    }
    return fieldList;
  }
  
  protected processField(field, obj, column) {
    if (column['type'] === 'boolean') {
      return (typeof obj[field] !== 'undefined' && (obj[field] === true || obj[field] === 1)) ? 1 : 0;
    } else {
      return obj[field];
    }
  }

  private currentTime(): number {
    return Math.round((new Date).getTime() / 1000);
  }
}