import { Component, ViewChild } from "@angular/core";
import { NavParams, Nav, NavController } from "ionic-angular";
import { FingerprintWrapper } from "../../common";
//import { ContactComponent } from "..";

@Component({
  selector: 'jh-fingerprint-setup',
  templateUrl: 'fingerprint-setup.html'
})
export class FingerprintSetupComponent {
  public fp_status: string = 'suggestion';
  constructor(private fingerprint: FingerprintWrapper, public navParams: NavParams, private nav: NavController) {
    const fp_name = localStorage.getItem('fingerprint');
    if (fp_name === 'nextlogin') {
      this.fp_status = 'setup';
      this.showFingerprint();
    }
  }

  showFingerprint() {
    this.fingerprint.show().then( result => {
      if (result) {
        localStorage.setItem('fingerprint', this.navParams.data['username']);
        localStorage.setItem('fingerprint_cipher', this.navParams.data['cipher']);
        localStorage.setItem('fingerprint_enabled', 'true');
        //this.nav.setRoot(ContactComponent);
      }
    }).catch( err => {
      //this.nav.setRoot(ContactComponent);
    });
  }

  noThanks() {
    localStorage.setItem('fingerprint_enabled', 'false');
    localStorage.removeItem('fingerprint');
    //this.nav.setRoot(ContactComponent);
  }
}