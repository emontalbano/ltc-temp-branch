import {Component, ViewChild, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StaticMapComponent, createDateObject } from '../../../common';
import { getGeoCoords } from '../../../common/utils';
import { NavController, NavParams } from 'ionic-angular';
import { CheckinService } from '../../../services';
import { Subject } from 'rxjs/Subject';
import { DeleteTimeDialog } from '.';
import { MatDialogRef, MatDialog } from '@angular/material';


@Component({
  selector: 'jh-check-out',
  templateUrl: 'check-out.html',
  providers: [ Store  ]
})
export class CheckOutPage {
  public form: FormGroup;
  public coords: any;
  public errorMessage: string;
  public claim: any;
  public checkin: any;
  public checkin_dt: Date;  
  private deleteDialogRef: MatDialogRef<DeleteTimeDialog>;
  public setCheckin_dt(date: Date) {
    this.checkin_dt = date;
  }

  public checkout_dt: Date;
  public setCheckout_dt(date: Date) {
    this.checkout_dt = date;
  }

  public dayData = [];

  public locationComplete = false;
  public submitting = false;

  public rateError: string;
  public startError: string;
  public endError: string;
  public otherTextError: string;
  public defaultRate: string = localStorage.getItem('billing_rate');

  public formData = {
    id: '',
    checkin__c: '',
    checkout__c: new Date(),
    rate__c: (localStorage.getItem('billing_rate') === null) ? '' : localStorage.getItem('billing_rate'),
    caring: false,
    manual: false,
    Bathing: false,
    Continence: false,
    Dressing: false,
    Eating: false,
    Toileting: false,
    Transferring: false,
    Supervision: false,
    Other: false,
    othertext: ''
  };
  public step = 1;

  @ViewChild(StaticMapComponent) mapCmp : StaticMapComponent;
  constructor(private formBuilder: FormBuilder,private sObjects: CheckinService, private navCtrl: NavController, private navParams: NavParams,
      private dialog: MatDialog) {
    if (typeof navParams.data === 'undefined' || (navParams.data.length !== 2 && navParams.data.length !== 4)) {
      this.errorMessage = 'Error: No checkin data provided';
    }
    this.claim = navParams.data[0];
    this.checkin = navParams.data[1];
    if (navParams.data.length === 4) {
      this.formData = navParams.data[2];
      this.step = navParams.data[3];
    }
    this.sObjects.setType('ltc_time_log__c');
  }


  ngOnInit() {
    if (this.step === 1 && this.formData.checkin__c === '') {
      console.log(this.checkin);
      this.formData.checkin__c = this.checkin.ltc_check_in_datetime__c;
      this.formData.checkout__c = new Date();
    } 
    
    this.form = this.formBuilder.group(this.formData);
    
    if (this.step === 2) {
      const endDate = createDateObject(this.form.value.checkout__c);
      let dateArray = [];
      const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      for (let i = createDateObject(this.form.value.checkin__c); 
          i.toDateString() !== endDate.toDateString(); 
          i = new Date(i.getTime() + (60*60*24*1000))) {
        let dateInstance = {
          date: '',
          start: '',
          end: ''
        }
        dateInstance.date = MONTHS[i.getMonth()] + ' ' + i.getDate();
        dateInstance.end = '11:59 pm';
        if (dateArray.length === 0) {
          dateInstance.start = i.toLocaleTimeString().replace(/\:[0-9]+ /gmi, ' ').toLowerCase();
        } else {
          dateInstance.start = '12:00 am';
        }
        dateArray.push(dateInstance);
      }

      dateArray.push({
        date: MONTHS[endDate.getMonth()] + ' ' + endDate.getDate(),
        start: '12:00 am',
        end: endDate.toLocaleTimeString().replace(/\:[0-9]+ /gmi, ' ').toLowerCase()
      });
      this.dayData = dateArray;
    }
    // this.getGeoCoordinates();
  }

  next() {
    console.log('here');
    if (this.step === 1 && this.validateStep1()) {
      if (createDateObject(this.form.value.checkin__c).toDateString() !== createDateObject(this.form.value.checkout__c).toDateString()) {
        this.navCtrl.push(CheckOutPage, [
          this.claim,
          this.checkin,
          this.form.value,
          2
        ]);
      } else {
        this.navCtrl.push(CheckOutPage, [
          this.claim,
          this.checkin,
          this.form.value,
          3
        ]);
      }      
    } else if (this.step === 2) {
      this.navCtrl.push(CheckOutPage, [
        this.claim, this.checkin, this.form.value,
        3
      ]);
    } else if (this.step === 3 && this.validateStep3()) {
      this.submitting = true;
      this.form.value.id = this.checkin.id;
      this.sObjects.checkout( this.form.value, this.claim, this.navCtrl );
    }
  }

  validateStep1() {
    let error = false;
    this.form.controls.checkin__c.setValue(this.checkin_dt);
    this.form.controls.checkout__c.setValue(this.checkout_dt);
    const start = createDateObject(this.form.value.checkin__c);
    const end = createDateObject(this.form.value.checkout__c);
    this.startError = '';
    this.endError = '';
    this.rateError = '';

    if (start.getFullYear() < 2017) {
      this.startError = 'Invalid check in date.';
      error = true;
    } else if ( start >= end ) {
      this.startError = 'Date and time must be after the Start Time.';
      error = true;
    }
    if ( end > new Date() ) {
      this.endError = 'Date and Time must be in the past.';
      error = true;
    }
    if (!(parseInt(this.form.value.rate__c, 10) > 0)) {
      this.rateError = 'Invalid hourly rate.';
      error = true;
    }

    return !error;
  }

  validateStep3() {    
    if (this.form.value.Other && this.form.value.othertext.length === 0) {
      this.otherTextError = 'Please enter a value for \'Other\'.';
      return false;
    }
    return true;
  }

  submit(form) {
    console.log(form);
    return false;
    //this.submitting = true;
    //form.value.id = this.checkin.id;
    //form.value.checkout__c = new Date();
    //this.sObjects.checkout( form.value, this.navCtrl );
  }

  delete() {
    this.deleteDialogRef = this.dialog.open(DeleteTimeDialog);
    this.deleteDialogRef.afterClosed().subscribe( data => {
      console.log('dialog closed');
      console.log(data);

      if (data === true) {
        this.sObjects.delete(this.checkin.id);
      }
    });
  }

  getGeoCoordinates() {

    getGeoCoords().then(position => {
      this.coords = position.coords;
      this.mapCmp.setCoord(position.coords);
      this.locationComplete = true;
    }).catch(error => {      
      this.locationComplete = true;
      this.mapCmp.gettingLocation = false;
      this.errorMessage = error;
    });

    setTimeout( () => {
      if (!this.locationComplete) {
        this.locationComplete = true;
        this.mapCmp.gettingLocation = false;
        this.errorMessage = 'Could not get location data';
      }
    }, 20000);
    
  }

}
