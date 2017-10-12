import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Onyva } from './onyva';

import { WelcomePage } from '../pages/welcome/welcome';
import { PassengerListPage } from '../pages/passenger-list/passenger-list';
import { PassengerDetailPage } from '../pages/passenger-detail/passenger-detail';
import { VehiculeListPage } from '../pages/vehicule-list/vehicule-list';
import { VehiculeDetailPage } from '../pages/vehicule-detail/vehicule-detail';
import { PropertyListPage } from '../pages/property-list/property-list';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';
import { BrokerListPage } from '../pages/broker-list/broker-list';
import { BrokerDetailPage } from '../pages/broker-detail/broker-detail';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { DeviceService } from "../providers/device.service";
import { HelpersService } from '../providers/helpers.service';


import { Config } from '../providers/config';

@NgModule({
  declarations: [
    Onyva,
    WelcomePage,
    AboutPage,
    VehiculeListPage,
    VehiculeDetailPage,
    PassengerListPage,
    PassengerDetailPage,
    PropertyListPage,
    PropertyDetailPage,
    BrokerListPage,
    BrokerDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(Onyva),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Onyva,
    WelcomePage,
    AboutPage,
    VehiculeListPage,
    VehiculeDetailPage,
    PassengerListPage,
    PassengerDetailPage,
    PropertyListPage,
    PropertyDetailPage,
    BrokerListPage,
    BrokerDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceService,
    HelpersService,
    Config,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
