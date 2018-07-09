import { Component, ViewChild } from "@angular/core";
import { NavParams, Nav, NavController } from "ionic-angular";
import { FingerprintWrapper } from "../../common";
import { LoginComponent, ContactComponent } from "..";
import { FingerprintSetupComponent } from "./fingerprint-setup";
import { SObjectService, SalesforceService } from "../../services";

@Component({
  selector: 'jh-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {
  public fromHome: boolean = false;
  constructor(public navParams: NavParams, private nav: NavController, private sforce: SalesforceService) {
    if (navParams.data === true) {
      this.fromHome = true;
    }
  }

  agree() {
    localStorage.setItem('tos', 'true');
    const accountId = this.sforce.getUserId();
    const query = this.sforce.query('SELECT Id FROM Contact WHERE AccountId in (SELECT AccountId from User WHERE id = \''+accountId+'\')');
    query.then( (data:any) => {
      this.sforce.update('contact', {
        id: data.records[0]['Id'],
        'LTC_Terms_Conditions_Agreement__c': new Date()
      }).then( () => {
        if ((localStorage.getItem('fingerprint_enabled') === 'true' && localStorage.getItem('fingerprint') === 'nextlogin')
          || (localStorage.getItem('fingerprint_enabled') === null && localStorage.getItem('fingerprint') === null)) {
            this.nav.setRoot(FingerprintSetupComponent);
        } else {
          this.nav.setRoot(ContactComponent);
        }
      });
    });


    
  }

  decline() {
    localStorage.removeItem('sf_oauth');
    this.nav.setRoot(LoginComponent, {'logout': true });
  }
}