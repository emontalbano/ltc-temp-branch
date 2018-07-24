import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DateTimePickerComponent } from '../../../common';


@Component({
  selector: 'jh-delete-time',
  templateUrl: 'delete-time.html',
  providers: [ Store ]
})
export class DeleteTimeDialog {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DeleteTimeDialog>) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({});
  }

  submit(form) {
    this.dialogRef.close(true);
  } 
  
}
