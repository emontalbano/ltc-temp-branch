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
  checkin(data: any, claim_id: string, nav: NavController) {
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
  checkout(data: any, claim_id: string, nav) {
    if (typeof data !== 'undefined' && data !== '' && data.checkout__c !== '') {
      const adls = ['Bathing', 'Continence', 'Dressing', 'Eating', 'Toileting', 'Transferring', 'Supervision', 'Other'];
      let adlStr = '';
      for (let adl in adls) {
        if (data[adls[adl]]) {
          if (adlStr.length !== 0) {
            adlStr += ';';
          }
          adlStr += adl;
        }
      }
      console.log(adlStr);
      this.setMetadata({'checkedin': ''});
      this.setMetadata({ 'checkedin_id': ''});
      this.setMetadata({'checkedindt': ''});
      let checkout = data.checkout__c;
      if (typeof checkout.getHours !== 'function') {
        checkout = createDateObject(checkout);
      }
      /*let checkin = {
        ltc_hourly_rate__c: data.rate__c,
        ltc_related_claim__c: claim_id,
        ltc_check_in_datetime__c: checkout,
        ltc_check_out_datetime__c: checkout,
        ltc_related_invoice__c: null,
        RecordTypeId: null
      };*/

      const hours = checkout.getHours() < 9 ? '0' + checkout.getHours() : checkout.getHours();
      const minutes = checkout.getMinutes() < 9 ? '0' + checkout.getMinutes() : checkout.getMinutes();
      let timeStr = hours + ':' + minutes + ':00';

      
      this.notification.cancel(1);
      clearInterval(this.runner);
      localStorage.setItem('toast','Timesheet added successfully');
      nav.pop();
      nav.pop();
      //this.invoices.getInitialInvoiceId(checkin).then( id => {
        //const invoiceId = id;
        if (createDateObject(data.checkin__c).toDateString() !== createDateObject(data.checkout__c).toDateString()) {
          nav.pop();
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
                ltc_activities_for_daily_living__c: adlStr
                //,ltc_related_claim_invoice__c: invoiceId
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
                ltc_check_out_datetime__c: endInst
                //,ltc_related_claim_invoice__c: invoiceId
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
            ltc_check_out_datetime__c: endDate
            //,ltc_related_claim_invoice__c: invoiceId
          });
        } else {
          this.update({
            id: data.id,
            ltc_check_out_datetime__c: checkout
            //,ltc_related_claim_invoice__c: invoiceId
          });
        }
      //});
    }
  }

  /**
   * Gets the current check-in status for the current user.
   */
  getCheckinStatus() {
    this.forceInit();
    // const user_id = this.sforce.getUserId();
    this.sforce.query('SELECT Id, ltc_related_claim__c, LTC_Check_In_DateTime__c FROM ltc_time_log__c WHERE ltc_check_out_datetime__c = NULL LIMIT 1').then( (data: any) => {
      if (data.records.length > 0) {
        console.log(data.records[0]);
        this.setMetadata({ 'checkedin': data.records[0].LTC_Related_Claim__c });
        this.setMetadata({ 'checkedin_id': data.records[0].Id });
        this.setMetadata({ 'checkedindt': data.records[0].LTC_Check_In_DateTime__c })
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