import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import { Store } from '@ngrx/store';
import { BaseService, SalesforceService, CacheService } from './index'

@Injectable()
export class SObjectService extends BaseService {
  public fieldList: string[]; //@deprecate
  public queryLimit: number = 2000;
  public additionalFields: string[];

  constructor(protected http: Http, protected store: Store<any>, public sforce: SalesforceService, public cacher: CacheService) {
    super(http, store);
  }

  setType(type: string) {
    this.init({
      type: type
    });
  }

  public async getAll(params?) {
    try {
      this.setMetadata({'pending': true});
      const query = 'select '+this.buildFieldList()+' from '+this.type+' '+this.buildWhere()+' LIMIT ' + this.queryLimit;
      console.log(query);
      let freshTime = 1800;
      let queryCached = false;
      const refreshing = (params && params.refresh);
      if (refreshing) {
        this.setMetadata({'refreshing': true});
      }
      try {
        freshTime = this.schema['properties']['keep_fresh']['default'];
      } catch (e) { }
      if ( false && !refreshing && this.hasProperty('pending_create') && this.cacher.isFresh(query, freshTime)) {
        //try {
        //  await this.cacher.rebuildReducers(this.type);
        //  queryCached = true;
        //} catch (e) {}
      } else {        
        this.sforce.query(query).then(data => {
          let records = [];
          data['records'].map( a=> records.push( this.lowercaseAttributes(a) ));
          this.handlePayloadData('set', records);
          if (refreshing) {
            this.setMetadata({'refreshing': false});
          }
          this.setMetadata({'pending': false});
          if (queryCached) {            
            // this.cacher.cacheQuery(query);            
          }          
        }, e=>{
            console.log('Error', e);
        });
      }      
    } catch (e) {
      if (typeof this.schema == 'undefined') {
        throw 'The sObject type was either not set or not found.'
      } else {
        throw 'Unknown Error: ' + e;
      }
    }
  }

  getFieldList() {
    let i = 0;
    const fieldList = [];
    
    for (const key in this.schema['properties']) {
      i++;
      if (this.schema['ignoreList'].indexOf(i) === -1) {
        fieldList.push(key)
      }
    }
    if (this.additionalFields && this.additionalFields.length > 0) {
      return fieldList.concat(this.additionalFields);
    }
    return fieldList;
  }

  buildFieldList() {
    console.log(this.getFieldList());
    return this.getFieldList().join(', ');
  }
  
  buildWhere() {
    return '';
  }

  beforeCreate() {}
  async create(newObj, callback?) {
    let local_id;
    // @todo: If Cached
    if (this.hasProperty('pending_create')) {
      try {
        // local_id = await this.cacher.create(newObj, this.type, true);
      } catch (e) {}
    }

    return this.doCreate(newObj, local_id);    
  }

  afterCreate(payload, data) {
    return data;
  }

  private async doCreate(newObj, local_id) {
    const promise = this.sforce.create(this.type, newObj);

    newObj['pending'] = true;
    newObj['tempId'] = this.uuid(false);
    this.store.dispatch({
      type: 'insert_'+this.type, 
      payload: { data:newObj }
    });

    promise.then(payload => {
      console.log('Create Result', payload);
      newObj = this.afterCreate(payload, newObj);
      if (payload !== false) {
        newObj['id'] = payload['id'];
        newObj['pending'] = false;
        this.store.dispatch({
          type: 'update_pending_' + this.type,
          payload: { data: newObj }
        });
        try {
          // this.cacher.update({ 'id': payload['id'], 'pending_create': false }, this.type, local_id);
        } catch(e) {}
        return payload['id'];
      }
    }, error => {
      // @todo: Delete item from store
      // @todo: catch possible errors and handle each by type

      return false;
    });
    return promise;
  }

  async delete(id) {
    const promise = this.sforce.del(this.type, id);
    this.store.dispatch({
      type: 'delete_' + this.type,
      payload: {
        id: id
      }
    })
  }

  beforeUpdate() {}
  async update(newObj: any, callback?: any) {
    if (this.hasProperty('pending_update')) {
      try {
        // await this.cacher.update(newObj, this.type, newObj.id, 'id');
      } catch (e) {}
    }
    this.doUpdate(newObj);
  }
  
  async doUpdate(newObj) {
    const promise = this.sforce.update(this.type, newObj);
    newObj['pending'] = true;
    this.store.dispatch({
      type: 'update_'+this.type, 
      payload: { data: newObj }
    });
    promise.then(payload => {
      console.log('update result', payload);
      if (payload !== false) {
        newObj['pending'] = false;
        this.handlePayloadData('update_pending', newObj);
        try {
          // this.cacher.update({ 'pending_update':false }, this.type, newObj['id'], 'id');
        } catch (e) {}
      }

    }).catch(err => {
      console.log('update error: ', err);
    });    
  }



  handlePayloadData(operation, data) {
    this.store.dispatch({
      type: operation + '_' + this.type,
      payload: {data: data}
    });

    if (this.hasProperty('pending_create')) {
      try {
        // this.cacher.batchUpsert(data, this.type);
      } catch(e) {}
    }
  }

  lowercaseAttributes(obj: any) {
    const _ths = this;
    return Object.keys(obj).reduce(function (newObj, key) {
        let val = obj[key];
        let newVal = (typeof val === 'object' && val !== null) ? _ths.lowercaseAttributes(val) : val;
        newObj[key.toLowerCase()] = newVal;
        return newObj;
    }, {});
  }
}