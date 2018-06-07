import {Component, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import { SalesforceService } from '../../services';
//import { ContactComponent } from '../contacts/contacts';
import { Nav, NavParams, NavController } from 'ionic-angular';
import { CacheService } from '../../services/cache.service';
import { FingerprintWrapper, SJCLWrapper } from '../../common';
import { FingerprintSetupComponent } from './fingerprint-setup';
import { TermsPage } from './terms';

/**
 * Login Object
 * 
 * Describes the form structure for a typical login.
 */
export class Login {
  constructor(
    public username?: string,
    public password?: string,
    public encrypted?: boolean
  ) {  }
}


/**
 * LoginComponent
 * 
 * Provides interactivity for the login screen.
 */
@Component({
  selector: 'jh-login',
  templateUrl: 'login.html',
})
export class LoginComponent {
  public model = new Login();
  public selectedTab = 0;
  public loading = true;
  public fingerprint_enabled = false;
  public error = '';
  
  constructor(public store: Store<any[]>, public sforce: SalesforceService,
              private cacher: CacheService, private fingerprint: FingerprintWrapper, 
              private sjcl:SJCLWrapper, private navParams: NavParams, private nav:NavController) {    
    
    //If the user is currently logged in, reload their credentials
    let oauthData = localStorage.getItem('sf_oauth');
    if (oauthData !== null && oauthData) {
      oauthData = JSON.parse(oauthData);
    }

    //Timeout to set loading to false if querying salesforce fails.
    setTimeout(() => {
      this.loading = false;
    }, 8000);

    //Initializes salesforce connection
    this.sforce.init({
      appId: '3MVG9d3kx8wbPieHBpF8GIw2hY.rWIkaI.5M71yZGZKXw0pTThTrymPHZNPinLkvJno7m4bhW6Gylu2vxUqF8',
      apiVersion: 'v39.0',
      loginURL: 'https://portaldev6-jhltc.cs91.force.com/provider',
      oauthCallbackURL: 'http://localhost:8100/assets/oauthcallback.html',
      oauth: oauthData
    });

    if (oauthData) {
      const userId = this.sforce.getUserId()
      this.sforce.query('SELECT Id, Name FROM Account WHERE Id = \'' + userId + '\' LIMIT 1').then(data => {
        this.unlockCacher();
        
      }).catch(err => {
        this.loading = false;
      });
    } else {
      setTimeout(() => {
        this.loading = false;
      }, 300);
      
      this.setupFingerprintLogin();
      

    }
   }


   /**
    * unlockCacher
    * 
    * Using the user's login creds, unlock an encrypted cache database
    */
   unlockCacher() {
     
     this.cacher.unlockDatabase().then( success => {          
      // Console logging for debug purposes
      if (success) {            
        console.log('cache enabled');  
      } else {
        console.log('no caching');
      }

      this.gotoRoot();          
    }).catch(e => {
      console.log('no caching');
      this.gotoRoot();
    });
   }


   /**
    * setupFingerprintLogin
    * 
    * If the device is linked to a fingerprint database and the fingerprint is linked to an ISAM login, show the fingerprint dialog and button
    */
   setupFingerprintLogin() { 
    if (localStorage.getItem('fingerprint_enabled') === 'true' && localStorage.getItem('fingerprint') !== 'nextlogin') {
      this.fingerprint.isAvailable().then(result => {
        if (result) {
          this.fingerprint_enabled = true;
          if (typeof this.navParams.data === 'undefined' || this.navParams.data['logout'] !== true) {
            setTimeout(() => {
              this.showFingerprint();
            }, 2000);              
          }
        }
      });
    }
   }

  onSubmit() {
    if (typeof this.model.password === 'undefined') {
        return false;
    }
    try {
      this.cacher.unlockDatabase(this.model.password, true);
    } catch (e) { }

    this.sforce.jhLogin(this.model.username, this.model.password).then( data => {
      if (this.needFingerprintSetup()) {
        this.nav.setRoot(FingerprintSetupComponent, {'username': this.model.username, 'cipher': this.sjcl.encrypt(this.model.password)});
      } else {
        this.gotoRoot();
      }
    }, err => {
      this.error = err;
    });

    // var $this = this;
    // this.loginService.doLogin(this.model.username, this.model.password, function(data: any) {
        // $this.router.navigate(['/todo']);
    // }); 
  }

  /**
   * loginWithSalesforce
   * 
   * While ISAM is not currently fully available, allows developers and testers to log into the app using
   * a salesforce community user email and password.
   */
  loginWithSalesforce() {
    this.sforce.login().then( data => {
      localStorage.setItem('sf_oauth', JSON.stringify(data));
      if (this.needFingerprintSetup()) {
        const userid = data.id.split('/').pop();
        this.nav.setRoot(FingerprintSetupComponent, {'username': userid, 'cipher': this.sjcl.encrypt(userid)});
      } else {
        this.gotoRoot();
      }
    }, e => {
      console.log('Error', e);
    });
  }

  /**
   * needFingerprintSetup
   * 
   * Checks to see if the user needs to be redirected to fingerprint setup as its next step in the setup pipeline
   */
  needFingerprintSetup() {
    return (
      (localStorage.getItem('fingerprint_enabled') === 'true' && localStorage.getItem('fingerprint') === 'nextlogin')
      || (localStorage.getItem('fingerprint_enabled') === null && localStorage.getItem('fingerprint') === null)
    );
  }

  /**
   * showFingerprint
   * 
   * Shows the fingerprint login prompt. On success, logs the user in.
   */
  showFingerprint() {
    this.fingerprint.show().then( result => {
      if (result) {
        this.model.username = localStorage.getItem('fingerprint');
        this.model.password = this.sjcl.decrypt(localStorage.getItem('fingerprint_cipher'));
        this.onSubmit();
      }
    });
  }


  gotoRoot() {
    this.nav.setRoot(TermsPage);
  }

  setTab(index: number) {
    this.selectedTab = index;
  }
}
