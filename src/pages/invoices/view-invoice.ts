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
              public navParams: NavParams) {
                
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
  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
