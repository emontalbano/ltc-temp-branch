import { DetailService, SalesforceService, CacheService, InvoiceService } from ".";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { ContactComponent, ContactDetailComponent, CheckOutPage } from '../pages'
import { Nav, NavParams, NavController } from 'ionic-angular';
import { MatDialogRef, MatDialog } from '@angular/material';
import { timeDiff, createDateObject } from '../common/utils';
import { identifierModuleUrl } from "@angular/compiler";
import { ContactComponent, ContactDetailComponent } from "../pages";

@Injectable()
export class CheckinService extends DetailService {
  public type = '';
  private runner: any;

  constructor(protected http: Http, protected store: Store<any>, public sforce: SalesforceService, public cacher: CacheService, private notification: LocalNotifications, private dialog: MatDialog, private invoices: InvoiceService) {
    super(http, store, sforce, cacher);
  }

  forceInit() {
    if (this.type === '') {
      this.setType('ltc_time_log__c');
    }
  }

  /**
   * Creates a timelog object which marks the user as checked in for a given claim.   
   */
  checkin(data: any, claim: string, nav: NavController) {
    const claim_id = claim['id'];
    return new Promise<any>( (resolve, reject) => {
      if (typeof data !== "undefined" && parseFloat(data.rate__c) <= 0) {
        data.rate__c = '0';
      }
      if (typeof data !== 'undefined') {
        this.setMetadata({'checkedin': claim_id});
        this.setMetadata({'checkedindt': new Date()});
        let checkin = {
          ltc_hourly_rate__c: data.rate__c,
          ltc_related_claim__c: claim_id,
          ltc_check_in_datetime__c: new Date(),
          ltc_check_out_datetime__c: null,
          ltc_related_invoice__c: null,
          RecordTypeId: null
        };

        this.invoices.getRecordType().then(recordTypes => {
          const recordType = recordTypes[1];
          checkin.RecordTypeId = recordType;

          this.create(checkin).then( (payload: any) => {
            this.setMetadata({ 'checkedin_id': payload.id });
            
            checkin['id'] = payload.id;
            
            
            /*this.notification.schedule([{
              id: 1,
              title: 'You are currently checked in with a client.',
              text: 'Checked in for 0:00.',
              silent: true,
              sound: null,
              priority: 2,
              //ongoing: true,
              data: {id: 'test'}
            }]);
        
            const startTime = new Date();
            const noti = this.notification;
            let updateFunc = () => {
              const timeStr = timeDiff(startTime, new Date());
              noti.update({
                id: 1,
                text: 'Checked in for ' + timeStr
              });
            }
    
            this.runner = setInterval(updateFunc, 60000);
            //this.notification.on('click', (notification, state) => {
              //nav.push(CheckOutPage, [ { id: claim_id }, checkin ]);
            //});*/
            resolve(true);
          });
        });
      }
    });
  }

  /**
   * Checks the user out from their previous check in
   */
  checkout(data: any, claim: any, nav, update?: boolean, manual? :string) {
    const claim_id = claim['id'];
    if (typeof data !== 'undefined' && data !== '' && data.checkout__c !== '') {
      const adls = ['Bathing', 'Continence', 'Dressing', 'Eating', 'Toileting', 'Transferring', 'Supervision', 'Other'];
      let adlStr = '';
      for (let adl in adls) {
        if (data[adls[adl]]) {
          if (adlStr.length !== 0) {
            adlStr += ';';
          }
          if (adls[adl] === 'Supervision') {
            adlStr += 'Supervision/Safety';
          } else if (adls[adl] === 'Transferring') {
            adlStr += 'Transferring/Mobility';
          } else {
            adlStr += adls[adl];
          }
        }
      }
      console.log(adlStr);
      if (!update && !manual) {
        this.setMetadata({'checkedin': ''});
        this.setMetadata({ 'checkedin_id': ''});
        this.setMetadata({'checkedindt': ''});
      }
      let checkout = data.checkout__c;
      let checkin = data.checkin__c;
      if (typeof checkout.getHours !== 'function') {
        checkout = createDateObject(checkout);
      }

      if (typeof checkin.getHours !== 'function') {
        checkin = createDateObject(checkin);
      }
      /*let checkin = {
        ltc_hourly_rate__c: data.rate__c,
        ltc_related_claim__c: claim_id,
        ltc_check_in_datetime__c: checkout,
        ltc_check_out_datetime__c: checkout,
        ltc_related_invoice__c: null,
        RecordTypeId: null
      };*/

      const hours = checkout.getHours() < 13 ? checkout.getHours() : checkout.getHours() - 12;
      const minutes = checkout.getMinutes() < 9 ? '0' + checkout.getMinutes() : checkout.getMinutes();
      const outAP = checkout.getHours() < 12 ? ' AM' : ' PM';
      const local_checkout = (checkout.getMonth() + 1) + '/' + checkout.getDate() + '/' + (checkout.getYear()-100) + ' '+hours + ':' + minutes + outAP;

      const othertext = (data.othertext && data['Other']) ? data.othertext : '';

      const inHours = checkin.getHours() < 13 ? checkin.getHours() : checkin.getHours() - 12;
      const inMinutes = checkin.getMinutes() < 9 ? '0' + checkin.getMinutes() : checkin.getMinutes();
      const inAP = (checkin.getHours < 12) ? ' AM' : ' PM'
      const local_checkin = (checkin.getMonth()+1) + '/' + checkin.getDate() + '/' + (checkin.getYear()-100) + ' ' + inHours + ':' + inMinutes + inAP;
      
      this.notification.cancel(1);
      clearInterval(this.runner);
      if (update) {
        localStorage.setItem('toast','Timesheet updated');
      } else {
        localStorage.setItem('toast','Timesheet Added to Current Invoice');
      }
      
      //this.invoices.getInitialInvoiceId(checkin).then( id => {
        //const invoiceId = id;
        if (createDateObject(data.checkin__c).toDateString() !== this.minusOne(createDateObject(data.checkout__c)).toDateString()) {          
          const endDate = createDateObject(data.checkout__c);
          let first = true;
          for (let i = createDateObject(data.checkin__c); 
              i.toDateString() !== endDate.toDateString(); 
              i = new Date(i.getTime() + (60*60*24*1000))) {
            let dateInstance = {
              date: '',
              start: '',
              end: ''
            }
            if (first) {
              first = false;
              let endInst = new Date(i);
              endInst.setHours(23)
              endInst.setMinutes(59);
              endInst.setSeconds(59);
              endInst.setTime( endInst.getTime() + 1000);
              this.update({
                id: data.id,
                ltc_check_out_datetime__c: endInst,
                ltc_hourly_rate__c: data.rate__c,
                ltc_activities_for_daily_living__c: adlStr,
                ltc_value_for_other__c: othertext,
                ltc_local_check_in_date_and_time__c: local_checkin,
                ltc_local_check_out_date_and_time__c: local_checkout,
                //,ltc_related_claim_invoice__c: invoiceId
              }).then( data => {
                this.returnHome(nav, claim, update);
              });
            } else {
              let startInst = new Date(i);
              startInst.setHours(0);
              startInst.setMinutes(0);
              startInst.setSeconds(0);
              startInst.setMilliseconds(0);
              let endInst = new Date(i);
              endInst.setHours(23)
              endInst.setMinutes(59);
              endInst.setSeconds(59);
              endInst.setTime( endInst.getTime() + 1000);
              this.create({
                ltc_hourly_rate__c: data.rate__c,
                ltc_related_claim__c: claim_id,
                ltc_check_in_datetime__c: startInst,
                ltc_check_out_datetime__c: endInst,
                ltc_activities_for_daily_living__c: adlStr,
                ltc_value_for_other__c: othertext,
                ltc_local_check_in_date_and_time__c: local_checkin,
                ltc_local_check_out_date_and_time__c: local_checkout
                //,ltc_related_claim_invoice__c: invoiceId
              }).then( data => {
                this.returnHome(nav, claim, update);
              });
            }
          }
          let startInst = createDateObject(endDate);
          startInst.setHours(0);
          startInst.setMinutes(0);
          startInst.setSeconds(0);
          startInst.setMilliseconds(0);
          this.create({
            ltc_hourly_rate__c: data.rate__c,
            ltc_related_claim__c: claim_id,
            ltc_check_in_datetime__c: startInst,
            ltc_check_out_datetime__c: endDate,
            ltc_activities_for_daily_living__c: adlStr,
            ltc_value_for_other__c: othertext,
            ltc_local_check_in_date_and_time__c: local_checkin,
            ltc_local_check_out_date_and_time__c: local_checkout
            //,ltc_related_claim_invoice__c: invoiceId
          }).then( data => {
            this.returnHome(nav, claim, update);
          });
        } else if (manual) {
          let checkin = {
            ltc_hourly_rate__c: data.rate__c,
            ltc_related_claim__c: claim_id,
            ltc_check_in_datetime__c: data.checkin__c,
            ltc_check_out_datetime__c: checkout,
            ltc_related_invoice__c: manual,
            RecordTypeId: null,
            ltc_local_check_in_date_and_time__c: local_checkin,
            ltc_local_check_out_date_and_time__c: local_checkout
          };
  
          this.invoices.getRecordType().then(recordTypes => {
            const recordType = recordTypes[1];
            checkin.RecordTypeId = recordType;
  
            this.create(checkin).then( (payload: any) => {
              this.setMetadata({ 'checkedin_id': payload.id });              
              checkin['id'] = payload.id;
              this.returnHome(nav, claim, true);
            });
          });
        } else {
          this.update({
            id: data.id,
            ltc_check_in_datetime__c: data.checkin__c,
            ltc_check_out_datetime__c: checkout,
            ltc_hourly_rate__c: data.rate__c,
            ltc_activities_for_daily_living__c: adlStr,
            ltc_value_for_other__c: othertext,
            ltc_local_check_in_date_and_time__c: local_checkin,
            ltc_local_check_out_date_and_time__c: local_checkout
            //,ltc_related_claim_invoice__c: invoiceId
          }).then( data => {
            this.returnHome(nav, claim, update);
          });
        }        
        //nav.setRoot()
      //});
    }
  }

  minusOne(dateObj) {
    return new Date(dateObj.getTime() - 1000);
  }

  returnHome(nav, claim, isUpdate?: boolean) {
    if (isUpdate) {
      nav.pop();
      nav.pop();
    } else {
      localStorage.setItem('checked-in', 'false');
      if (localStorage.getItem('multiple-customers') === 'true') {
        nav.setRoot(ContactComponent);
        nav.push(ContactDetailComponent, claim);
      } else {
        nav.setRoot(ContactDetailComponent, claim);
      }
    }
  }

  /**
   * Gets the current check-in status for the current user.
   */
  getCheckinStatus(nav) {
    this.forceInit();
    // const user_id = this.sforce.getUserId();
    this.sforce.query('SELECT Id, ltc_related_claim__c, LTC_Check_In_DateTime__c, LTC_Related_Claim__r.Associated_Policy__r.Insured__r.Name, LTC_Related_Claim__r.Id FROM ltc_time_log__c WHERE ltc_check_out_datetime__c = NULL LIMIT 1').then( (data: any) => {
      if (data.records.length > 0) {
        
        this.setMetadata({ 'checkedin': data.records[0].LTC_Related_Claim__c });
        this.setMetadata({ 'checkedin_id': data.records[0].Id });
        this.setMetadata({ 'checkedindt': data.records[0].LTC_Check_In_DateTime__c });
        
        localStorage.setItem('multiple-customers', 'true');
        localStorage.setItem('checked-in', 'true');
        nav.setRoot(ContactDetailComponent, {
          id: data.records[0].LTC_Related_Claim__r.Id,
          associated_policy__r: { insured__r: { name: data.records[0].LTC_Related_Claim__r.Associated_Policy__r.Insured__r.Name } }
        });
      } else {
        this.setMetadata({ 'checkedin': ''});
        this.setMetadata({ 'checkedindt': ''});
        this.setMetadata({ 'checkedin_id': ''});
      }
    }).catch( err => {
      console.log(err);
    });
  }
}