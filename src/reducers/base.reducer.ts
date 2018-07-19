import { upsert } from '../common/utils';
import { combineReducers } from '@ngrx/store';
import { schema } from '../schema';

/**
 * BaseReducer
 * 
 * This is the base reducer used to search, sort, and filter datasets.
 */
export class BaseReducer {
  public REDUCER_TYPE = 'NOT_SET';
  public default_sort = '-last_modified_date';
  public nulls_last = true;
  public initial_filter = { '0': {
    'filter': obj => true,
    'search': obj => true,
    'sort': (a,b) => a['id'] < b['id'],
    'current_filters': {},
    'current_sort': this.default_sort,
    'current_search': ''
  } };
  
  public reducers = {
    'update': this.doUpdate,
    'insert': this.doInsert,
    'set': this.doSet,
    'delete': this.doDelete,
    'update_pending': this.doUpdatePending,
    'clear': this.doClear
  };

  public interactions = {};

  public clear_filter_on_search = false;
  public clear_sort_on_search = false;

  init() {
    this.interactions = {
      'search': this.buildSearch(),
      'search_all': this.buildSearchAll(),
      'sort': this.buildSort(),
      'filter': this.buildFilter()
    }
  }
  
  /**
   * getObjStore
   * 
   * Returns a function used to interact with a reducer which maps to the data schema
   */
  getObjStore() {
    const $this = this;
    return (state: any[] = [], action: any) => {
      const actionType = action.type.replace('_' + $this.REDUCER_TYPE, '');
      if ($this.reducers.hasOwnProperty(actionType)) {
        return $this.reducers[actionType](state, action);
      }
      return state;
    };
  }

  /**
   * getInteractivityReducer
   * 
   * Same as getObjStore, but strictly holds the reducer which tracks interactions on t he data set.
   */
  getInteractivityReducer() {
    const $this = this;
    return (state: any = this.initial_filter, action: any) => {
      const actionType = action.type.replace('_' + $this.REDUCER_TYPE, '');
      if ($this.interactions.hasOwnProperty(actionType)) {
        return $this.interactions[actionType](state, action);
      }
      return state;
    };
  }

  /**
   * combineReducers
   * 
   * Takes an data set and the interactivity reducer, which together make up that object's application state
   * and return a combined reducer.   
   */
  combineReducers(objStore, interactivity) {
    const combiner = {};
    combiner[this.REDUCER_TYPE] = objStore;
    combiner[this.REDUCER_TYPE + '_interactivity'] = interactivity;
    return combineReducers(combiner);
  }

  
  // ==================================================================
  /**
   * do*Operation*
   * 
   * lambda functions referenced in the object store's properties to facilitate changes to the application state.
   */
  doUpdate(state, action) {
    return upsert(state, [action.payload.data]);
  }

  doInsert(state, action) {
    return [action.payload.data].concat(state);
  }

  doSet(state, action) {
    const data = (typeof action.payload.data.push === 'function') ?
      action.payload.data :
      [action.payload.data];
    return upsert(state, data);
  }

  doDelete(state, action) {
    return state.filter(obj => obj.id !== action.payload.id);
  }

  doUpdatePending(state, action) {
    return upsert(state, [action.payload.data], 'tempId');
  }
  
  doReset(state, action) {
    return this.initial_filter;
  }

  doClear(state, action) {
    return [];
  }

  // ==================================================================
  /**
   * Filter Builders
   * 
   * build* functions build and return a reducer function for performing 
   * operations on the dataset. For example, Search compiles the searchable 
   * fields for a given type and returns a function which can be run on the
   * dataset to reduce it to only items which match the query.
   */
  buildUpdateState() {
    return (state: any, key: string) => {
      const newState = {};
      newState[''+(parseInt(key)+1)] = state;
      return newState;
    }
  }

  buildSearchAll() {
    return this.buildSearch(true);
  }

  canSearch(prop) {
    return prop.hasOwnProperty('searchable') || 
      (prop.hasOwnProperty('indexed') && !prop.hasOwnProperty('not-searchable'));
  }

  buildSearch(search_all?) {
    const fields = [];
    const props = schema[this.REDUCER_TYPE]['properties'];
    for (let field_name in props) {
      if (search_all || this.canSearch(props[field_name])){
        const property = props[field_name];
        if (property['type'] === 'boolean') { 
          continue;
        }

        const searchMethod = (property['type'] === 'integer') ?
          (val, query) => val === parseInt(query, 10) :
          (property['type'] === 'datetime') ?
          (val, query) => false && this.roundTime(val) === this.roundTime(query) :
          (val, query) => {
            if (typeof (val) === 'string' && val.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
              return true;
            } else if (query.toLowerCase() === 'null' && val === null) {
              return true;
            }
            return false;
        };

        fields.push([field_name, searchMethod]);
      }
    }
    const updateState = this.buildUpdateState();
    return (state: any, action: any) => {
      const curState = Object.keys(state)[0];
      state = state[curState];
      if (action.payload.data === '') {
        state['search'] = obj => true;
      } else {
        const searchTerm = action.payload.data;
        state['search'] = obj => {
          for (let i = 0; i < fields.length; i++) {
            if (!obj.hasOwnProperty(fields[i][0])) {
              console.log('MISSING PROPERTY');
              continue;
            }
            if (fields[i][1](obj[fields[i][0]], searchTerm)) {
              return true;
            }
          }
          return false;
        }
      }

      return updateState(state, curState);
    }
  }

  buildFilter() {
    const updateState = this.buildUpdateState();
    const fields = {};

    const props = schema[this.REDUCER_TYPE]['properties'];
    for (let prop in props) {
      const propType = props[prop]['type'];
      fields[prop] =
        (propType === 'datetime') ?
          (val, query) => {
            // @todo: Handle datetime enums like TODAY, LAST WEEK...
            return false;
          } :
          (propType === 'boolean') ?
            (val, query) => ((val === true && query === 'true')
              || (val === false && query === 'false')) :
            (propType.indexOf('[]') !== -1) ?
              (val, query) => {
                return val.indexOf(query) !== -1;
              } :
              (val, query) => {
                if (val === null || query === null || typeof val === 'undefined' || typeof val.toLowerCase === 'undefined' || typeof query.toLowerCase === 'undefined') {
                  return val === query;
                }
                return val.toLowerCase() === query.toLowerCase();
              };

    }
    return (state: any , action: any) => {
      const curState = Object.keys(state)[0];
      state = state[curState];
      if (action.payload.data === '') {
        state['filter'] = obj => true;
        return state;
      } else {
        const key = Object.keys(action.payload.data)[0];
        state['current_filters'][key] = action.payload.data[key];
        let empty = true;
        for (let key in state['current_filters']) {
          if (state['current_filters'][key] === '') {
            delete state['current_filters'][key];
          } else {
            empty = false;
          }
        }
        if (empty) {
          state['filter'] = obj => true;
          return updateState(state, curState);
        }
        state['filter'] = obj => {
          for (let key in state['current_filters']) {
            let compare = obj;
            if (key.indexOf('.') !== -1) {
              const path = key.split('.');
              for (let i=0; i<path.length; i++) {
                if (compare.hasOwnProperty(path[i])) {
                  compare = compare[path[i]];
                } else {
                  return false;
                }
              }
            } else {
              compare = obj[key];
            }
            if (!fields[key](compare, state['current_filters'][key])) {
              return false;
            }
          }
          return true;
        }
      }
      return updateState(state, curState);
    }
  }

  buildSort() {
    const updateState = this.buildUpdateState();
    const fields = {};

    const props = schema[this.REDUCER_TYPE]['properties'];
    for (let prop in props) {
      const propType = props[prop]['type'];
      fields[prop] =
        (propType === 'datetime') ?
          (val, query) => {
            // @todo: Handle datetime enums like TODAY, LAST WEEK...
            return false;
          } :
          (propType === 'boolean') ?
            (val, query) => ((val === true && query === 'true')
              || (val === false && query === 'false')) :
            (propType.indexOf('[]') !== -1) ?
              (val, query) => {
                return val.indexOf(query) !== -1;
              } :
              (val, query) => {
                return val.toLowerCase() === query.toLowerCase();
              };

    }
    return (state: any, action:any) => {
      const curState = Object.keys(state)[0];
      state = state[curState];
      let lt = true;
      if (action.payload.data === '') {
        state['current_sort'] = this.default_sort;
      } else {
        state['current_sort'] = action.payload.data;
      }
      let field = '';
      if (state['current_sort'][0] === '-') {
        lt = false;
        field = state['current_sort'].substring(1);
      } else {
        field = state['current_sort'];
      }
      
      
      if (lt) {
        state['sort'] = (a,b) => {
          console.log('sorting');
          if (field.indexOf('.') !== -1) {
            const path = field.split('.');
            for (let i=0; i<path.length; i++) {
              a = a[path[i]];
              b = b[path[i]];              
            }
            return a < b;
          } else {
            return a[field] < b[field];
          }
        };
      } else {
        state['sort'] = (a,b) => {
          console.log('sorting');
          if (field.indexOf('.') !== -1) {
            const path = field.split('.');
            for (let i=0; i<path.length; i++) {
              a = a[path[i]];
              b = b[path[i]];              
            }
            return a > b;
          } else {
            return a[field] > b[field];
          }
        };
      }
      return updateState(state, curState);
    }
  }

  roundTime(time) {
    return 0;
  }
}