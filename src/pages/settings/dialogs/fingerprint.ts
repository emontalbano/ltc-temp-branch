import {Component, ViewChild, Input} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'jh-settings-fingerprint',
  templateUrl: 'fingerprint.html'
})
export class FingerprintSignInDialog {
  public enabled = false;
  public username = '';
  public form: FormGroup;
  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<FingerprintSignInDialog>) {
    this.form = this.formBuilder.group({ });
    const fingerprint = localStorage.getItem('fingerprint');
    if (fingerprint !== null) {
      this.enabled = true;
      this.username = fingerprint;
    }
  }

  submit(form) {
    if (this.enabled) {
      localStorage.removeItem('fingerprint');
      localStorage.removeItem('fingerprint_cipher');
      localStorage.removeItem('fingerprint_enabled');
    } else {
      if (localStorage.getItem('fingerprint') === null) {
        localStorage.setItem('fingerprint', 'nextlogin');
      }
      localStorage.setItem('fingerprint_enabled', 'true');
    }
    this.dialogRef.close(true);
  }
}
