import { combineReducers } from '@ngrx/store';
const defaultState = {
  'pending': false,
  'refreshing': false,
  'checkedin': ''
};

/**
 * metaReducer
 * 
 * Holds metadata about the application in a reducer.
 */
export const metaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'set_meta':
      return Object.assign(state, action.payload);
    default:
      return state;
  }
}