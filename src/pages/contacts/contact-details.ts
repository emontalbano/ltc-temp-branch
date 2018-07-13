import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import { SObjectService, CheckinService, InvoiceService } from '../../services';

import { MatDialogRef, MatDialog } from '@angular/material';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { DataSourceWrapper, timeDiffNumber, createDateObject } from '../../common';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { CheckOutPage, CheckInPage, SubmitTimeDialog } from './';
import { Subject } from 'rxjs/Subject';
import { EditTimeDialog } from './dialogs/edit-time';
import { FormGroup, FormBuilder } from '@angular/forms';


//@Todo: empty state matches wireframe
//@todo: check in changes page state & does not navigate
//@todo; Check for toast notifications, create if they exist

@Component({
  selector: 'jh-contact-details',
  templateUrl: 'contact-details.html',
  providers: [ SObjectService, Store  ]
})
export class ContactDetailComponent {
  public contact: any;
  public claim_id: string;
  public checkins: any;
  public hasCheckins: boolean;
  public hasInvoices: boolean;
  public hasActive: boolean = false;
  public meta: Observable<any>;
  public checking_in: boolean;
  public checkins_ds: DataSourceWrapper;
  public invoice_ds: DataSourceWrapper;
  public displayedColumns = ['date', 'billing'];
  private editDialogRef: MatDialogRef<EditTimeDialog>;
  private attest: MatDialogRef<SubmitTimeDialog>;
  
  public submittingInvoice = false;
  public invoiceMap: any;
  public endTime: Subject<Date>;
  public timerInterval: any;
  private currentInvoiceList: any;
  public form: FormGroup;
  public originalRate: string;
  public showEdit = false;

  constructor(private sObjects: CheckinService,
              private invoices: InvoiceService,
              private store: Store<any>, 
              private navCtrl: NavController, 
              public navParams: NavParams,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
    this.contact = navParams.data;
    this.claim_id = this.contact['id'];
    this.checkins = this.sObjects.filteredItems;
    this.sObjects.setType('ltc_time_log__c');
    this.sObjects.setParentId(this.claim_id, 'ltc_related_claim__c');
    this.sObjects.filter('ltc_check_out_datetime__c', null);
    this.sObjects.getAll();
    this.invoices.setType('ltc_claim_invoice__c');
    this.invoices.setParentId(this.claim_id, 'ltc_invoice_submission__r.ltc_associated_claim__c');
    this.invoices.getAll();
    this.meta = this.sObjects.meta;
    this.hasCheckins = false;
    this.hasInvoices = false;
    this.checkins_ds = new DataSourceWrapper(this.sObjects.filteredItems);
    this.invoice_ds = new DataSourceWrapper(this.invoices.filteredItems);
    this.sObjects.filteredItems.subscribe( e => {
      this.invoiceMap = {};
      e.map( a => { 
        this.invoiceMap[a.id] = true; 
        if (a.ltc_check_out_datetime__c !== null) {
          //let timeArr = a.ltc_check_out_datetime__c.split(':');
          let checkout = createDateObject(a.ltc_check_out_datetime__c);
          //checkout.setHours(timeArr[0]);
          //checkout.setMinutes(timeArr[1]);
          a.checkout = checkout;
        }
      });      
      this.hasCheckins = (e.length > 0);
      this.hasActive = (this.hasCheckins && e[0].ltc_check_out_datetime__c === null);
      this.currentInvoiceList = e;
    });

    this.endTime = new Subject<Date>();
    this.endTime.next(new Date());
    this.endTime.next(new Date());
    this.timerInterval = setInterval( () => {
      this.endTime.next(new Date());
    }, 1000);

    this.invoices.filteredItems.subscribe( data => {
      this.hasInvoices = (data.length > 0);
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: '',
      rate__c: ''
    });
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  submitInvoice() {
    this.submittingInvoice = true;
  }

  
  public refreshTimesheet() {
    this.sObjects.getAll({ refresh: true });
  }
  
  public refreshInvoice() {
    this.invoices.getAll({ refresh: true });
  }
  
  public async doSubmitInvoice() {
    const invoiceList = [];
    let earliest = null;
    let latest = null;
    let total_charges = 0;
    let hourly_rate = null;

    Object.keys(this.invoiceMap).map( key => {
      if (this.invoiceMap[key]) {
        invoiceList.push(key);

        this.currentInvoiceList.map( invoice => {
          console.log(invoice);
          if (invoice.id === key) {
            if (earliest === null || invoice.ltc_check_in_datetime__c < earliest) {
              earliest = invoice.ltc_check_in_datetime__c;
            }
            if (latest === null || invoice.ltc_check_in_datetime__c > latest) {
              latest = invoice.ltc_check_in_datetime__c;
            }
            if (hourly_rate === null) {
              hourly_rate = invoice.ltc_hourly_rate__c;
            }
            total_charges += (invoice.ltc_hourly_rate__c) * timeDiffNumber(new Date(invoice.ltc_check_in_datetime__c), invoice.checkout);
          }
        })
      }
    });
    if (invoiceList.length > 0) {
      if (invoiceList.length > 50) {
        throw 'Too many invoices. @todo: Add elegant failure message';
      }
      this.attest = this.dialog.open(SubmitTimeDialog);
      this.attest.afterClosed().subscribe(data => {
        if (data === '') return;
        this.invoices.createInvoice({
          ltc_associated_claim__c: this.claim_id,
          latestDate: latest,
          earliestDate: earliest,
          hourlyRate: hourly_rate,
          totalCharges: total_charges
        }).then( result => {
          console.log(result['id']);
          // @todo: On fail, delete id and give error message
          invoiceList.map( inv => {
            this.sObjects.update({
              id: inv,
              ltc_related_invoice__c: result['id']
            });
          });
        });
      });      
    }
    this.submittingInvoice = false;
  }
  
  cancelSubmitInvoice() {
    this.submittingInvoice = false;
  }

  editTimeEntry(item) {

    if (item.ltc_check_out_datetime__c === null) {

      this.originalRate = ''+item.ltc_hourly_rate__c;
      this.form.value.rate__c = this.originalRate;
      if (this.showEdit) {
        this.showEdit = false;
      } else {
        this.showEdit = true;
      }
    } else {
      this.editDialogRef = this.dialog.open(EditTimeDialog);
      this.editDialogRef.componentInstance.setData(item);
      this.editDialogRef.afterClosed().subscribe(data => {
        if (data !== '') {
          this.sObjects.update(data);
        }
      });
    }
  }

  checkout(checkin) {
    this.navCtrl.push(CheckOutPage, [this.contact, checkin]);
  }

  checkin() {
    const rate = (localStorage.getItem('billing_rate') === null) ? '' : localStorage.getItem('billing_rate');
    this.checking_in = true;
    this.sObjects.checkin({ rate__c: rate }, this.contact['id'], this.navCtrl).then( success => {
      this.checking_in = false;
    });
  }
}
