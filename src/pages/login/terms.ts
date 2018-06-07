import { Component, ViewChild } from "@angular/core";
import { NavParams, Nav, NavController } from "ionic-angular";
import { FingerprintWrapper } from "../../common";
import { LoginComponent } from "..";

@Component({
  selector: 'jh-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {
  constructor(public navParams: NavParams, private nav: NavController) {

  }
  agree() {
    //this.nav.setRoot(ContactComponent);
  }

  decline() {
    localStorage.removeItem('sf_oauth');
    this.nav.setRoot(LoginComponent, {'logout': true });
  }
}