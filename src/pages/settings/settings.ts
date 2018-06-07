import { Component, ViewChild } from "@angular/core";
import { Nav } from "ionic-angular";
import { MatDialogRef, MatDialog } from "@angular/material";
import { FingerprintSignInDialog, BillingDialog } from "./dialogs";
import { FingerprintWrapper } from "../../common";


@Component({
  selector: 'jh-settings',
  templateUrl: 'settings.html'
})
export class SettingsComponent {
  @ViewChild(Nav) nav: Nav;
  public billing_rate: string = '';  
  private billingDialogRef: MatDialogRef<BillingDialog>;
  private fingerprintDialogRef: MatDialogRef<FingerprintSignInDialog>;
  public username: string = '';
  public enabled = false;
  public available = false;
  
  constructor(private dialog: MatDialog, private fingerprint: FingerprintWrapper) {
    this.billing_rate = (localStorage.getItem('billing_rate') !== null) ? localStorage.getItem('billing_rate') : '';
    this.checkFingerprint();
    fingerprint.isAvailable().then( result => {
      this.available = result;
    });
  }

  editBilling(){
    this.billingDialogRef = this.dialog.open(BillingDialog);
    this.billingDialogRef.afterClosed().subscribe( data => {
      if (typeof data !== 'undefined' && data.rate__c) {
        localStorage.setItem('billing_rate', data.rate__c);
        this.billing_rate = data.rate__c;
      }
    });
  }

  editFingerprint() {
    this.fingerprintDialogRef = this.dialog.open(FingerprintSignInDialog);
    this.fingerprintDialogRef.afterClosed().subscribe( data => {
      this.checkFingerprint();
    });
  }

  checkFingerprint() {
    const fingerprint = localStorage.getItem('fingerprint');
    if (fingerprint !== null) {
      this.username = fingerprint;
      this.enabled = true;
    } else {
      this.username = '';
      this.enabled = false;
    }
  }

  toggleFingerprint() {
    this.enabled = !this.enabled;
    const fpEnable = (this.enabled) ? 'true' : 'false';
    localStorage.setItem('fingerprint_enabled', fpEnable);
    if (this.enabled && localStorage.getItem('fingerprint') === null) {
      localStorage.setItem('fingerprint', 'nextlogin');
      this.username = 'nextlogin';
    } else if (!this.enabled && this.username === 'nextlogin') {
      this.username = '';
      localStorage.removeItem('fingerprint');
    }
  }


}