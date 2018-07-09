import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateTimePickerComponent } from '../../../common';


@Component({
  selector: 'jh-edit-time',
  templateUrl: 'edit-time.html',
  providers: [ Store ]
})
export class EditTimeDialog {
  public form: FormGroup;
  public errorMessage: string;

  @ViewChild('checkin') checkin: DateTimePickerComponent;
  @ViewChild('checkout') checkout: DateTimePickerComponent;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditTimeDialog>) {
  }

  ngOnInit() {
      
  }

  submit(form) {
    console.log(this.checkin.value);
    this.form.value.checkin__c = this.checkin.value;
    this.form.value.checkout__c = this.checkout.value;
    this.dialogRef.close(form.value);
  }
  
  setData(checkin) {
    this.form = this.formBuilder.group({
      id: checkin.id,
      checkout__c: checkin.ltc_check_out_datetime__c,
      checkin__c: checkin.ltc_check_in_datetime__c,
      rate__c: checkin.ltc_hourly_rate__c,
    });    

    // this.checkin.setValue(checkin.ltc_check_in_datetime__c);
    // this.checkout.setValue(checkin.ltc_check_out_datetime__c);
  }
}
