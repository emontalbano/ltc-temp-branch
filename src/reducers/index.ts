export * from './base.reducer';
export * from './meta.reducer';
import { schema } from '../schema';
import { BaseReducer } from './base.reducer';
import { metaReducer } from '.';

export const reducers = {
    'meta': metaReducer
};

for (let key in schema) if (! (''+key.toLowerCase() in reducers) ) {
    key = key.toLowerCase();
    const generic = new BaseReducer();
    generic.REDUCER_TYPE = key;
    generic.init();
    reducers[key] = generic.getObjStore();
    reducers[key + '_interactivity'] = generic.getInteractivityReducer();
}