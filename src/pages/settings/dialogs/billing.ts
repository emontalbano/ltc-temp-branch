import {Component, ViewChild, Input} from '@angular/core';

import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'jh-settings-billing',
  templateUrl: 'billing.html'
})
export class BillingDialog {
  public form: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<BillingDialog>) { }

  ngOnInit() {
    const rate = (localStorage.getItem('billing_rate') === null) ? '' : localStorage.getItem('billing_rate');
    this.form = this.formBuilder.group({
      rate__c: rate
    });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
}
