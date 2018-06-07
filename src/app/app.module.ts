import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import {StoreModule} from '@ngrx/store';

import { LoginComponent, SettingsComponent } from '../pages';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { reducers, BaseReducer } from '../reducers';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule } from '@angular/material';
  
import {CdkTableModule} from '@angular/cdk/table';
import { BaseService, SalesforceService, DetailService, CacheService, SObjectService, CheckinService, InvoiceService, ClaimService } from '../services';
import { CommonModule } from '@angular/common';
import { SearchComponent, RateFormatPipe, TimeEstimatePipe, PendingComponent, StaticMapComponent, DateTimePickerComponent, SJCLWrapper, FingerprintWrapper } from '../common';
import { HttpClientModule } from '@angular/common/http';
import { BillingDialog, FingerprintSignInDialog } from '../pages/settings/dialogs';
import { FingerprintSetupComponent } from '../pages/login/fingerprint-setup';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { DatePicker } from '@ionic-native/date-picker';
import { TermsPage } from '../pages/login/terms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    RateFormatPipe,
    TimeEstimatePipe,
    PendingComponent,
    StaticMapComponent,
    SettingsComponent,
    BillingDialog,
    FingerprintSignInDialog,
    FingerprintSetupComponent,
    DateTimePickerComponent,
    TermsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CdkTableModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,    
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    IonicModule.forRoot(AppComponent),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    PendingComponent,
    StaticMapComponent,
    SettingsComponent,
    BillingDialog,
    FingerprintSignInDialog,
    FingerprintSetupComponent,
    DateTimePickerComponent,
    TermsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BaseService,
    BaseReducer,
    SalesforceService,
    CacheService,
    SObjectService,
    DetailService,
    CheckinService,
    SJCLWrapper,
    InvoiceService,
    ClaimService,
    FingerprintWrapper,
    DatePicker,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}