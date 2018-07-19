import {Component, ViewChild, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StaticMapComponent } from '../../../common';
import { getGeoCoords } from '../../../common/utils';
import { NavController, NavParams } from 'ionic-angular';
import { CheckinService } from '../../../services';


@Component({
  selector: 'jh-check-in-create',
  templateUrl: 'check-in.html',
  providers: [ Store  ]
})
export class CheckInPage {
  public form: FormGroup;
  public form2: FormGroup;
  public coords: any;
  public errorMessage: string;
  public locationComplete = false;
  public claim: any;
  public submitting: boolean = false;
  
  @ViewChild(StaticMapComponent) mapCmp : StaticMapComponent;
  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private sObjects: CheckinService, private navParams: NavParams) {
    if (typeof navParams.data === 'undefined' || !navParams.data) {
      this.errorMessage = 'Error: No checkin object provided.';
    }
    this.claim = navParams.data;
    this.sObjects.setType('ltc_time_log__c');

  }

  ngOnInit() {
    const rate = (localStorage.getItem('billing_rate') === null) ? '' : localStorage.getItem('billing_rate');
      this.form2 = this.formBuilder.group({
        checkin_time: '',
        checkout_time: '',
        rate__c: rate
      });
      this.form = this.formBuilder.group({
      rate__c: rate
    });
    // this.getGeoCoordinates();
  }

  submit(form) {
    this.submitting = true;
    this.sObjects.checkin(form.value, this.claim, this.navCtrl);
  }

  manualEntry() {
    
  }


  setManual() {
    if (this.form.value.manual) {
      
    }
  }

  async getGeoCoordinates() {
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
