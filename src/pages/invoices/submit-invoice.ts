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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'jh-submit-invoice',
  templateUrl: 'submit-invoice.html',
  providers: [ SObjectService, Store, SObjectService  ]
})
export class SubmitInvoiceComponent {
  public meta: Observable<any>;
  public invoice_ds: DataSourceWrapper;
  public displayedColumns = ['date', 'billing'];
  public filter = '';
  public invoice: any;
  public contact: any;
  public claim_id: string;  
  public endTime: Subject<Date>;
  private timerInterval: any;
  public form: FormGroup;
    public errorMessage: string;

  constructor(private sObjects: CheckinService,
              private store: Store<any>, 
              public navParams: NavParams,
              private formBuilder: FormBuilder) {
                
    this.claim_id = this.navParams.data[0];
    this.contact = this.navParams.data[1];
    this.invoice = this.navParams.data[2];
    this.sObjects.setType('ltc_time_log__c');
    this.meta = this.sObjects.meta;
    this.invoice_ds = new DataSourceWrapper(this.sObjects.filteredItems);
    
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      attest:false,
      additionalInfo: ''
    });
  }

  submit(form) {
    console.log('not implemented');
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }
}
