import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, MenuToggle, Navbar } from 'ionic-angular';

import { LoginComponent, 
  ContactComponent, 
  SettingsComponent,
  InvoicesComponent, CheckInPage, CheckOutPage 
} from '../pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MatSidenav, MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TermsPage } from '../pages/login/terms';


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  rootPage = LoginComponent;
  pages = {
    'settings': SettingsComponent,
    'patients': ContactComponent,
    'invoices': InvoicesComponent,
    'terms': TermsPage
  }

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer
  ) {
    this.initializeApp();
  }

  /**
   * initializeApp
   * 
   * Any code that needs to run right after platform ready goes here.
   * Currently sets up the icon database, app styles, and removes the splashscreen.
   */
  initializeApp() {
    this.platform.ready().then(() => {
      this.iconRegistry.addSvgIcon(
        'care',
        this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/care.svg')
      ).addSvgIcon(
        'check-in',
        this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/clock-in.svg')
      ).addSvgIcon(
        'check-out',
        this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/clock-out.svg')
      ).addSvgIcon(
        'timetable',
        this.sanitizer.bypassSecurityTrustResourceUrl('./assets/icon/timetable.svg')
      );
      this.statusBar.styleDefault();
      //Before running this, check status of login details
      this.splashScreen.hide();
    });
  }

  openPage(page: string) {
    this.menu.close();
    if (page === 'settings') {
      this.nav.push(this.pages[page]);
    } else if (page === 'terms') {
      this.nav.push(this.pages[page], true);
    } else {
      this.nav.setRoot(this.pages[page]);
    }
  }

  public logout() {
    localStorage.removeItem('sf_oauth');
    this.nav.setRoot(LoginComponent, {'logout': true });
    this.menu.close();
  }


}
