import { Observable } from 'rxjs/Observable';
import { Pipe, PipeTransform } from '@angular/core';

/// <reference path="../assets/vendor/sjcl.d.ts" />
/// <reference path="../assets/vendor/fingerprint.d.ts" />
declare var cordova: any;

export const upsert = (state: any[], data: any, idField?:string, replaceFields?:boolean) => {
  idField = (idField) ? idField : 'id';
  state = state.map(obj => {
    const findById = function(newObj: any) {
      return typeof newObj !== 'undefined' && obj[idField] === newObj[idField];
    }
    const i = data.findIndex(findById);
    if (i > -1) {
      let retObj = data[i];
      if (!replaceFields) {
        for (const key in data[i]) {
          obj[key] = data[i][key];
        }
        retObj = obj;
      }
      
      delete data[i];
      return retObj;
    }
    return obj;
  });
  state = state.concat(data.filter(obj => (typeof obj !== 'undefined')));
  return state;
}

export const uuid = (a:any) => a ? (a^Math.random()*16>>a/4).toString(16):(""+1e7+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)

export const updatePending = (state:any[], newObject: any, uuid?:string) => {
  if (uuid) {
    newObject['tempId'] = uuid;
  }
  return upsert(state, newObject, 'tempId');
}

/**
 * Wraps all SJCL-dependent code into a wrapper which makes it testable and modular.
 */
export class SJCLWrapper {
  /**
   * Hasher takes a password-like code and adds entropy to it by passing it through a pbkdf 
   * at 2,000 iterations
   */
  public hash = (passcode:string) => sjcl.codec.hex.fromBits( sjcl.misc.pbkdf2( 
    passcode, 
    sjcl.codec.hex.toBits( '1156739577753345366a3269387173326966' ), 
    2000, 
    256) 
  );

  public sha256 = (code:string) => sjcl.codec.base64url.fromBits( sjcl.hash.sha256.hash(code) );

  public encrypt = (code: string) => sjcl.encrypt('@todo: secure this cipher', code);
  public decrypt = (json_string: any) => sjcl.decrypt('@todo: secure this cipher', json_string);
}

/**
 * Wraps all fingerprint-related code into a wrapper which makes it testable and modular.
 */
export class FingerprintWrapper {
  public async isAvailable() {
    return new Promise<boolean>( (resolve, reject) => {
      if (typeof Fingerprint === 'undefined') {
        resolve(false);
      }
      Fingerprint.isAvailable( result => {
        resolve(true);
      }, message => {
        resolve(false);
      });
    });    
  }

  public async show() {
    return new Promise<boolean>( (resolve, reject) => {
      if (typeof Fingerprint === 'undefined') {
        reject('fingerprint module not loaded');
      }
      Fingerprint.show({
        clientId: 'JH-LTC-Login',
        clientSecret: '@todo!:'
      }, () => {
        resolve(true);
      }, err => {
        reject(err);
      });
    });
  }
}

/**
 * Creates a temporary UID and inserts an object into the application state with a pending status,
 * then binds to the RESTful call to swap out the temporary UID with the server id once the operation
 * completes. 
 */
export const insertPending = (state:any[], data:any, serviceCall:any, callback:any) => {
  data['pending'] = true;
  const  uid = uuid(false);
  data['tempId'] = uid;
  serviceCall(data, callback);
  return [upsert(state, data), uid];
}

/**
 * Used to bind reducers to a standard observable which acts like a mock-server. Primarily
 * utilized by material data tables.
 */
export class DataSourceWrapper {
  constructor(private observable: any) {}

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {
    return this.observable;
  }

  disconnect() { }
}


/**
 * Given a start time and end time, returns the time difference in hours:minutes. 
 * Given a rate as well, it gives the total charge for that time difference.
 */
@Pipe({
  name: 'rateFormat'
})
export class RateFormatPipe implements PipeTransform {
  transform(start: any, end: any, rate?: number): any {
    try {
      end = new Date(end);
      start = new Date(start);
      if (!rate) {
        rate = 0;
      }
      return (timeDiffNumber(start, end) * rate / 60).toFixed(2);      
      
    } catch (e) {
      return 'INVALID DATE';
    }
  }
}


/**
 * Given a start and an end, returns the time difference in hours:minutes. If 
 * asNumber is set, it will return that as an integer.
 */
@Pipe({
  name: 'timeEst'
})
export class TimeEstimatePipe implements PipeTransform {
  transform(start: any, end?: any, asNumber?: boolean): any {

    try {
      end = (end) ? new Date(end) : new Date();
      start = new Date(start);
      if (asNumber) {
        return (timeDiffNumber(start, end) / 60).toFixed(2);
      }
      return timeDiff(start, end);
    } catch (e) {
      return 'INVALID DATE';
    }
  }
}

/**
 * Returns the difference between two times as a time string in hours:minutes 
 */
export const timeDiff = (startDate, endDate) => {
  try {
    let timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
    const hh = Math.floor(timeDiff / 1000 / 60 / 60);
    let timeStr = '' + hh;  
    timeDiff -= hh * 1000 * 60 * 60;
    const mm = Math.floor(timeDiff / 1000 / 60);
    timeStr += 'h ' + mm+ 'm';
    return timeStr;
  } catch (e) { return '0h 0m'; }
}

/**
 * Difference in hours between two times. Used to calculate the rate a customer was charged.
 */
export const timeDiffNumber = (start, end) => Math.abs( 
  parseFloat(
    ((end.getTime() - start.getTime()) / 1000 / 60).toFixed(2)
  ));

/**
 * Utility function which asynchronously returns the user's geolocation data once it is able to obtain it.
 */
export const getGeoCoords = async function(){
  return new Promise<any>( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      resolve(position);
    }, error => {
      if (typeof cordova !== 'undefined' && cordova.plugins && cordova.plugins.diagnostic) {
        cordova.plugins.diagnostic.isLocationAuthorized(function(enabled){
          if(!enabled){
            const statusEnum = cordova.plugins.diagnostic.permissionStatus;
            cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
              if (status === statusEnum.GRANTED || status === statusEnum.GRANTED_WHEN_IN_USE) {
                getGeoCoords().then( data => resolve(data), error => reject(error) );
              } else {
                reject('You have disabled location data for this app.')
              }
            }, function(error){
              reject(error);
            });
          }
        }, function(error){
          reject(error);
        });
      } else {
        reject('Could not request location status at this time.');
      }      
    }, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    });
  });  
}
