import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateTimePickerComponent } from '../../../common';


@Component({
  selector: 'jh-submit-time',
  templateUrl: 'submitAttestation.html',
  providers: [ Store ]
})
export class SubmitTimeDialog {
  public form: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SubmitTimeDialog>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      attest:false
   });
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }
  
  setData(invoices) {
    
  }
}
