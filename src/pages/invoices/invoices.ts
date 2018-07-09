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
  selector: 'jh-invoices',
  templateUrl: 'invoices.html',
  providers: [ SObjectService, Store, SObjectService  ]
})
export class InvoicesComponent {
  public hasInvoices: boolean;
  public meta: Observable<any>;
  public invoice_ds: DataSourceWrapper;
  public displayedColumns = ['user', 'date', 'billing'];
  public filter = '';

  constructor(private invoices: InvoiceService,
              private store: Store<any>, 
              public navParams: NavParams) {
    this.invoices.setType('ltc_claim_invoice__c');
    this.invoices.getAll({ refresh: true });
    this.invoices.filter('ltc_invoice_submission__r.ltc_associated_claim__c', '');
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
