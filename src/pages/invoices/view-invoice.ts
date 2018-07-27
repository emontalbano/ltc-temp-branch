import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import { SObjectService, InvoiceService, CheckinService } from '../../services';

import { MatDialogRef, MatDialog } from '@angular/material';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { DataSourceWrapper } from '../../common';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SubmitInvoiceComponent } from '.';
import { CheckOutPage } from '..';

@Component({
  selector: 'jh-view-invoice',
  templateUrl: 'view-invoice.html',
  providers: [ SObjectService, Store, SObjectService  ]
})
export class ViewInvoicesComponent {
  public hasInvoices: boolean;
  public meta: Observable<any>;
  public invoice_ds: DataSourceWrapper;
  public displayedColumns = ['date', 'billing'];
  public filter = '';
  public invoice: any;
  public contact: any;
  public claim_id: string;  
  public endTime: Subject<Date>;
  private timerInterval: any;

  constructor(private sObjects: CheckinService,
              private store: Store<any>, 
              public navParams: NavParams,
              public navCtrl: NavController) {
                
    this.claim_id = this.navParams.data[0];
    this.contact = this.navParams.data[1];
    this.invoice = this.navParams.data[2];
    this.sObjects.setType('ltc_time_log__c');
    this.sObjects.setParentId(this.invoice.id, 'ltc_related_invoice__c');
    this.sObjects.sort('-ltc_check_in_datetime__c');
    this.sObjects.filter('ltc_check_out_datetime__c','');
    this.sObjects.getAll();    
    this.meta = this.sObjects.meta;
    this.hasInvoices = false;
    this.invoice_ds = new DataSourceWrapper(this.sObjects.filteredItems);

    this.sObjects.filteredItems.subscribe( data => {
      console.log(data);
      this.hasInvoices = (data.length > 0);
    });

    this.endTime = new Subject<Date>();
    this.endTime.next(new Date());
    this.endTime.next(new Date());
    this.timerInterval = setInterval( () => {
      this.endTime.next(new Date());
    }, 1000);
  }

  public refreshInvoice() {
    this.sObjects.getAll({ refresh: true });
  }

  public submitInvoice() {
    this.navCtrl.push(SubmitInvoiceComponent, [this.claim_id, this.contact, this.invoice]);
  }

  public editTimeEntry(entry) {

    if (this.invoice.ltc_cast_iron_pull_status__c === 'New') {
      if (entry.ltc_activities_for_daily_living__c === null) {
        entry.ltc_activities_for_daily_living__c = '';
      }
      this.navCtrl.push(CheckOutPage, [
        {id: this.claim_id,
          associated_policy__r: { insured__r: { name: this.contact.associated_policy__r.insured__r.name } }
        },
        entry,
        {
          id: entry.id,
          checkin__c: entry.ltc_check_in_datetime__c,
          checkout__c: entry.ltc_check_out_datetime__c,
          rate__c: entry.ltc_hourly_rate__c,
          caring: false,
          manual: false,
          Bathing: entry.ltc_activities_for_daily_living__c.indexOf('Bathing') !== -1,
          Continence:entry.ltc_activities_for_daily_living__c.indexOf('Continence') !== -1,
          Dressing: entry.ltc_activities_for_daily_living__c.indexOf('Dressing') !== -1,
          Eating:entry.ltc_activities_for_daily_living__c.indexOf('Eating') !== -1,
          Toileting:entry.ltc_activities_for_daily_living__c.indexOf('Toileting') !== -1,
          Transferring:entry.ltc_activities_for_daily_living__c.indexOf('Transferring') !== -1,
          Supervision:entry.ltc_activities_for_daily_living__c.indexOf('Supervision') !== -1,
          Other:entry.ltc_activities_for_daily_living__c.indexOf('Other') !== -1,
          othertext: entry.ltc_value_for_other__c
        },
        1,
        true
      ]);
    }
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
