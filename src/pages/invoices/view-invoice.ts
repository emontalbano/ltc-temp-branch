import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import { SObjectService, InvoiceService } from '../../services';

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

  constructor(private invoices: InvoiceService,
              private store: Store<any>, 
              public navParams: NavParams) {
    this.invoices.setType('ltc_claim_invoice__c');
    this.invoices.getAll({ refresh: true });
    this.claim_id = this.navParams.data[0];
    this.contact = this.navParams.data[1];
    this.invoice = this.navParams.data[2];
    this.invoices.setType('ltc_claim_invoice__c');
    this.invoices.setParentId(this.claim_id, 'ltc_invoice_submission__r.ltc_associated_claim__c');
    this.invoices.getAll();    
    this.meta = this.invoices.meta;
    this.hasInvoices = false;
    this.invoice_ds = new DataSourceWrapper(this.invoices.filteredItems);

    this.invoices.filteredItems.subscribe( data => {
      console.log(data);
      this.hasInvoices = (data.length > 0);
    });
  }

  public filterPatient(contact_id: string, contact_name: string) {
    this.invoices.filter('contact__c', contact_id);
    this.filter = contact_name;
  }

  public refreshInvoice() {
    this.invoices.getAll({ refresh: true });
  }
}
