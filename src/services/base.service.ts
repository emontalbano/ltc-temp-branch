/*tshint disable: no-bitwise*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import { Store } from '@ngrx/store';
import { CacheService } from './cache.service';
import { schema } from '../schema';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';



@Injectable()
export class BaseService {
  items: Observable<any>;
  filteredItems: Observable<any>;
  protected formHeader: Headers;
  protected basicHeader: Headers;
  protected user;
  protected objMode = true;
  protected data;
  public cacher;
  protected lastItemInList: any;
  protected currentSort: string;
  protected schema: any;
  public type: string;
  public meta: Observable<any>;

  protected options = {
    requiresAuth: false,
    baseUrl: '/api/',
    restUrl: '',
    clearOnSearch: false,
  };

  constructor(protected http: Http, protected store: Store<any>) { }

  /**
   * Initializes the service. Ensures required values are set.
   */
  init(config) {
    if (!config.hasOwnProperty('type')) {
      throw 'Service must have property \'type\'';
    }

    for (let key in config) {
      this.options[key] = config[key];
    }

    this.type = this.options['type'];

    if (!''+this.type.toLowerCase() in schema) {
      throw 'Object type \'' + this.type + '\' not found in schema';
    }
    

    this.schema = schema[this.type.toLowerCase()];
    this.meta = this.store.select('meta');
    this.items = this.store.select(this.type);
    if (this.options.restUrl.length === 0) {
      this.options['restUrl'] = this.options['baseUrl'] + this.type;
    }
    this.buildFilteredList();
  }

  /**
   * Builds and saves the active application state associated with this instance of the service.
   * This filtered list will reflect search, sort, and filter operations applied to it.
   */
  buildFilteredList() {
    var interactiveStore = this.store.select(this.type + '_interactivity');
    this.filteredItems = Observable.combineLatest(
      this.store.select(this.type),
      interactiveStore,
      (objs: any, interactivityFilter: any) => {
        if (typeof interactivityFilter === 'undefined') {
          return objs;
        }
        var f = interactivityFilter[Object.keys(interactivityFilter)[0]];
        if (f.pending && this.options.clearOnSearch) {
          return [];
        }
        var items = objs.filter(f.filter).filter(f.search).sort(f.sort);
        // this.cacher.filteredItemCount = items.length;
        this.lastItemInList = items[items.length - 1];
        this.currentSort = f.current_sort;
        return items;
      }
    );
  }

  handlePayloadData(operation, data){
    for (let key in data) {
      if (key !== this.type) {
        this.data = this.store.select(key);
      }
      console.log('store dispatch :' +operation+'_'+key);
      this.store.dispatch({
        type:operation+'_'+key,
        payload: {'data': data[key]}
      });

      if (key !== this.type) {
        this.store.select(this.type);
      }
    }
  }

  /**
   * Sets a value in the application metadata.
   */
  public setMetadata(payload: Object) {
    this.store.select('meta');
    this.store.dispatch({
      type: 'set_meta',
      payload: payload
    });
    this.store.select(this.type);
  }

  search(query) {
    this.doSearch(query);
  }

  doSearch(query) {
    this.store.select(this.type + '_interactivity');
    this.store.dispatch({
      type: 'search_' + this.type,
      payload: { data: query }
    });
    this.store.select(this.type);
    //@todo: implement (call getAll with url_query set)
  }

  filter(field, query) {
    this.store.select(this.type + '_interactivity');
    const filterData = {};
    filterData[field] = query;
    this.store.dispatch({
      type: 'filter_' + this.type,
      payload: { data: filterData }
    });
    this.store.select(this.type)
  }

  sort(field) {
    this.store.select(this.type + '_interactivity');
    this.store.dispatch({
      type: 'sort_' + this.type,
      payload: { data: field }
    });
    this.store.select(this.type);
  }
  

  getAll(params: any) {
    var url = this.options.restUrl;
    this.store.dispatch({
      type: 'pending_' + this.type,
      payload: true
    });
    this.http.get(url, {headers:this.basicHeader})
      .map(res => res.json())
      .subscribe(payload => {
        this.store.dispatch({
          type: 'pending_' + this.type,
          payload: false
        });
        //@todo: handle standard network returns
        
        this.handlePayloadData('set', payload.data);
        if (typeof params !== 'undefined' && params.callback === 'function')
          params.callback(payload);
      });
  }

  /**
   * Restful get of a single data object.
   */
  get(id, callback?) {
    this.http.get(this.options.restUrl + '/' + id, {headers:this.basicHeader})
      .map(res => res.json())
      .subscribe(payload => {
        this.handlePayloadData('set', payload.data)
        if (typeof callback === 'function')
          callback(payload);
      });
  }

  /**
   * Create call
   */
  beforeCreate(newObj, parentObject?) {
    var user = this.user;
    newObj['created_date'] = new Date().getTime();
    newObj['last_modified_date'] = new Date().getTime();
    if (typeof user !== 'undefined' && user.id) {
      newObj['last_modified_user_id'] = user.id;
      newObj['owner_user_id'] = user.id;
    }
    return newObj; 
  }

  async create(newObj, callback?, parentObject?): Promise<{}> {
    newObj = this.beforeCreate(newObj, parentObject);
    if (newObj.hasOwnProperty('id'))
      throw 'New object cannot have property, \'id\'';
    var postData = '';
    for (let key in newObj) {
      postData += key + '=' + encodeURIComponent(newObj[key]) + '&';
    }
    var promise = this.http.post( 
      this.options.restUrl,
      postData.substring(0,postData.length-1),
      {headers: this.formHeader}
    );
    
    newObj['pending'] = true;
    newObj['tempId'] = this.uuid(false);

    this.store.dispatch({
      type: 'insert_'+this.type,
      payload: { data: newObj }
    });

    promise.map(res => res.json())
    .subscribe(payload => {
      if (this.afterCreate(payload, newObj)){
        this.store.dispatch({
          type:'update_pending_'+this.type,
          payload: { data: payload.data }
        });
        if (typeof callback === 'function')
          callback(payload);
      }
    });
    return promise;
  }
  afterCreate(payload, data) { return data; }


  /**
   * Update call
   */
  beforeUpdate(updates) { 
    var user = this.user;
    updates['last_modified_date'] = new Date().getTime();
    if (typeof user !== 'undefined' && user.id) {
      updates['last_modified_user_id'] = user.id;
    }
    return updates; 
  }
  async update(updates, callback?) {
    var $this = this;
    var postData = '';
    updates = this.beforeUpdate(updates);    

    if (!updates.hasOwnProperty('id'))
      throw 'Update statement requires an ID';
    
    for (let key in updates) {
      if (key != 'id')
      postData += key + '=' + encodeURIComponent(updates[key]) + '&';
    }

    var promise = this.http.put( 
      this.options.restUrl + '/' + updates.id,
      postData.substring(0,postData.length-1),
      {headers: this.formHeader}
    );

    updates['pending'] = true;
    updates['tempId'] = this.uuid(false);

    $this.store.dispatch({type:'update_'+this.type, payload:{data: updates} });
    
    promise
      .map(res => res.json())
      .subscribe(response => {
        updates['pending'] = false;
        if (this.afterUpdate(updates)) {
          this.store.dispatch({
            type:'update_pending_'+this.type,
            payload: { data: updates }
          });

          if (typeof callback === 'function') {
            callback(updates);
          }
        }
      });
  }
  afterUpdate(payload) { return true; }

  /**
   * Delete call
   */
  beforeDelete(object) { 
    var user = this.user;
    object['lastModifiedDate'] = new Date().getTime();
    if (typeof user !== 'undefined' && user.id) {
      object['lastModifiedBy'] = user.id;
    }
    return object; 
  }
  delete(object, callback?) {
    object = this.beforeDelete(object);
    if (!object.hasOwnProperty('id')){
      throw 'Delete statement requires an ID';
    }
    this.http.delete( 
      this.options.restUrl + '/' + object.id,
      {headers: this.basicHeader}
    )
    .map(res => res.json())
    .map(payload => ({type: 'delete_' + this.type, payload}))
    .subscribe(action => {
      if (this.afterDelete(action.payload)){
        this.store.dispatch(action);
        if (typeof callback === 'function')
          callback(action.payload);
      }
    });
  }
  afterDelete(payload) { return true; }

  /**
   * Helper Functions
   */
  protected hasProperty(prop: string) {
    return prop in schema[this.type]['properties'];
  }

  /**
   * Returns a uuid
   */
  uuid(a:any) { return a ? 
    (a^Math.random()*16>>a/4).toString(16):
    (""+1e7+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,this.uuid);
  }

  /**
   * Strips any characters which aren't alphanumeric (a-z, 0-9, period, undershift, dash)
   */
  alphanumeric(s:string) {
    return s.replace(/[^a-z0-9._-]/gi, '');
  }


}