import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

import {NavController} from 'ionic-angular';
import { ContactDetailComponent, CheckOutPage, CheckInPage } from './';
import { ViewChild, ElementRef } from '@angular/core';
import { SearchComponent, BaseComponent } from '../../common';
import { CheckinService, InvoiceService, ClaimService } from '../../services';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'jh-contacts',
  templateUrl: 'contacts.html',
  providers: [ ClaimService, Store  ]
})
export class ContactComponent extends BaseComponent {
  public meta: any;
  public checkedin: string;
  public checkedindt: string;
  public endTime: Subject<Date>;
  public checkinObj: any;
  public itemList: any = [];
  constructor(protected sObjects: ClaimService, 
              protected checkins: CheckinService, 
              protected store: Store<any>, 
              protected invoices: InvoiceService,
              protected navCtrl: NavController,
              private dialog: MatDialog) {
    super(sObjects, store, navCtrl);
    this.setType('claim__c');
    this.meta = sObjects.meta;
    this.checkins.getCheckinStatus(this.navCtrl);
    this.invoices.setType('ltc_claim_invoice__c');
    this.invoices.additionalFields = [];
    this.sObjects.sort('associated_policy__r.insured__r.name');
    this.invoices.getAll();
    this.invoices.filter('ltc_invoice_submission__r.ltc_associated_claim__c', '');

    this.meta.subscribe( metadata => {
      this.checkedin = metadata.checkedin;
      this.checkedindt = metadata.checkedindt;
      this.checkinObj = {
        id: this.checkedin,
        ltc_check_in_datetime__c: this.checkedindt
      }

      /* if (this.checkedin.length > 0) {        
        for (let i=0; i<this.itemList.length; i++) {
          if (this.itemList[i]['id'] === this.checkedin) {
            this.navCtrl.setRoot(ContactDetailComponent, this.itemList[i]);
          }
        }
      } */
    });

    this.items.subscribe( items => {
      this.itemList = items;
      if (items.length === 1) {
        this.navCtrl.setRoot(ContactDetailComponent, items[0]);
      } else {
        localStorage.setItem('multiple-customers', 'true');
      }

      /* console.log(this.checkedin);
      if (typeof this.checkedin !== 'undefined' && this.checkedin.length > 0) {
        for (let i=0; i<this.itemList.length; i++) {
          if (this.itemList[i]['id'] === this.checkedin) {
            this.navCtrl.setRoot(ContactDetailComponent, this.itemList[i]);
          }
        }
      } */
    });

    this.endTime = new Subject<Date>();
    this.endTime.next(new Date());
    this.endTime.next(new Date());
    let timerInterval = setInterval( () => {
      this.endTime.next(new Date());
    }, 1000);

    
  }

  openContactDetail(contact) {
    this.navCtrl.push(ContactDetailComponent, contact);
  }

  checkoutdt(event, contact, checkin_id, checkin_dt) {
    event.stopPropagation();
    const checkin = {
      id: checkin_id,
      ltc_check_in_datetime__c: checkin_dt
    };
    this.navCtrl.push(CheckOutPage, [contact, checkin]);
  }
  checkout(event, contact, checkin_id) {
    event.stopPropagation();
    const checkin = { id: checkin_id };
    this.navCtrl.push(CheckOutPage, [contact, checkin]);
  }

  checkin(event, contact) {
    event.stopPropagation();
    this.navCtrl.push(CheckInPage, contact);
  }

  openItem(checkinId) {
    if (typeof checkinId !== 'undefined' && checkinId.length > 0 && this.itemList.length > 0) {
      for (let i=0; i<this.itemList.length; i++) {
        if (this.itemList[i]['id'] === checkinId) {
          this.navCtrl.setRoot(ContactDetailComponent, this.itemList[i]);
        }
      }
    }
  }

}
