import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {NavController} from 'ionic-angular';
import { ContactDetailComponent, CheckOutPage, CheckInPage } from './';
import { ViewChild, ElementRef } from '@angular/core';
import { SearchComponent, BaseComponent } from '../../common';
import { CheckinService, InvoiceService, ClaimService } from '../../services';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'jh-contacts',
  templateUrl: 'contacts.html',
  providers: [ ClaimService, Store  ]
})
export class ContactComponent extends BaseComponent {
  public meta: any;
  public checkedin: string;
  public checkedindt: string;

  constructor(protected sObjects: ClaimService, 
              protected checkins: CheckinService, 
              protected store: Store<any>, 
              protected invoices: InvoiceService,
              protected navCtrl: NavController,
              private dialog: MatDialog) {
    super(sObjects, store, navCtrl);
    this.setType('claim__c');
    this.meta = sObjects.meta;
    this.checkins.getCheckinStatus();
    this.invoices.setType('ltc_claim_invoice__c');
    this.invoices.additionalFields = [];
    this.invoices.getAll();
    this.invoices.filter('ltc_invoice_submission__r.ltc_associated_claim__c', '');

    this.items.subscribe( items => {
      if (items.length === 1) {
        this.navCtrl.setRoot(ContactDetailComponent, items[0]);
      }
    });
    this.meta.subscribe( metadata => {
      this.checkedin = metadata.checkedin;
      this.checkedindt = metadata.checkedindt;
    });
  }

  openContactDetail(contact) {
    this.navCtrl.push(ContactDetailComponent, contact);
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

}
