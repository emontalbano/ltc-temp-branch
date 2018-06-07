import { DetailService, SalesforceService, CacheService } from ".";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Store } from "@ngrx/store";
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { ContactComponent, ContactDetailComponent, CheckOutPage } from '../pages'
import { Nav, NavParams, NavController } from 'ionic-angular';
import { MatDialogRef, MatDialog } from '@angular/material';
import { timeDiff } from '../common/utils';

@Injectable()
export class CheckinService extends DetailService {
  public type = '';
  private runner: any;

  constructor(protected http: Http, protected store: Store<any>, public sforce: SalesforceService, public cacher: CacheService, private notification: LocalNotifications, private dialog: MatDialog) {
    super(http, store, sforce, cacher);
  }

  forceInit() {
    if (this.type === '') {
      this.setType('time_log__c');
    }
  }

  /**
   * Creates a timelog object which marks the user as checked in for a given claim.   
   */
  checkin(data: any, claim_id: string, nav: NavController) {
    if (typeof data !== 'undefined' && parseFloat(data.rate__c) > 0) {
      this.setMetadata({'checkedin': claim_id});
      let checkin = {
        ltc_hourly_rate__c: data.rate__c,
        ltc_related_claim__c: claim_id,
        ltc_check_in_datetime__c: new Date(),
        ltc_check_out_time__c: null,
        ltc_related_invoice__c: null
      };
      this.create(checkin).then( (payload: any) => {
        this.setMetadata({ 'checkedin_id': payload.id });
        checkin['id'] = payload.id;
        this.notification.schedule([{
          id: 1,
          title: 'You are currently checked in with a client.',
          text: 'Checked in for 0:00.',
          silent: true,
          sound: null,
          priority: 2,
          ongoing: true,
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
        this.notification.on('click', (notification, state) => {
          //nav.push(CheckOutPage, [ { id: claim_id }, checkin ]);
        });

        nav.pop();
      });
    }
  }

  /**
   * Checks the user out from their previous check in
   */
  checkout(data: any, nav) {
    if (typeof data !== 'undefined' && data !== '' && data.checkout__c !== '') {
      this.setMetadata({'checkedin': ''});
      this.setMetadata({ 'checkedin_id': ''});
      let checkout = data.checkout__c;
      if (typeof checkout.getHours !== 'function') {
        checkout = new Date(checkout);
      }
      const hours = checkout.getHours() < 9 ? '0' + checkout.getHours() : checkout.getHours();
      const minutes = checkout.getMinutes() < 9 ? '0' + checkout.getMinutes() : checkout.getMinutes();
      let timeStr = hours + ':' + minutes + ':00';

      this.update({
        id: data.id,
        ltc_check_out_time__c: timeStr
      });
      this.notification.cancel(1);
      clearInterval(this.runner);
      nav.pop();
    }
  }

  /**
   * Gets the current check-in status for the current user.
   */
  getCheckinStatus() {
    this.forceInit();
    // const user_id = this.sforce.getUserId();
    this.sforce.query('SELECT Id, ltc_related_claim__c FROM time_log__c WHERE ltc_check_out_time__c = NULL LIMIT 1').then( (data: any) => {
      if (data.records.length > 0) {
        console.log(data.records[0]);
        this.setMetadata({ 'checkedin': data.records[0].LTC_Related_Claim__c });
        this.setMetadata({ 'checkedin_id': data.records[0].Id });
      } else {
        this.setMetadata({ 'checkedin': ''});
        this.setMetadata({ 'checkedin_id': ''});
      }
    }).catch( err => {
      console.log(err);
    });
  }
}