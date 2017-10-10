import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { VehiculeListPage } from '../pages/vehicule-list/vehicule-list';
import { VehiculeDetailPage } from '../pages/vehicule-detail/vehicule-detail';
import { PropertyListPage } from '../pages/property-list/property-list';
import { PropertyDetailPage } from '../pages/property-detail/property-detail';
import { BrokerListPage } from '../pages/broker-list/broker-list';
import { BrokerDetailPage } from '../pages/broker-detail/broker-detail';
import { AboutPage } from '../pages/about/about';

import { VehiculeService } from "../providers/vehicule.service";
//import { VehiculeService } from "../providers/vehicule-service-mock";
import { PropertyService } from "../providers/property-service-mock";

import { BrokerService } from "../providers/broker-service-mock";
import { VehiculeData } from '../providers/vehicule-data';

// To disable to use real API services
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DeviceService } from "../providers/device.service";
import { IonicStorageModule } from '@ionic/storage';
import { HelpersService } from '../providers/helpers.service';
import { PassengerService } from '../providers/passenger.service';
import { PassengerListPage } from '../pages/passenger-list/passenger-list';
import { PassengerDetailPage } from '../pages/passenger-detail/passenger-detail';

import { Config } from '../providers/config';

@NgModule({
  declarations: [
    MyApp,
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
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    // Disable InMemoryWebApiModule to let real web service be reached
    // InMemoryWebApiModule.forRoot(VehiculeData)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    VehiculeService,
    PassengerService,
    PropertyService,
    BrokerService,
    DeviceService,
    HelpersService,
    Config,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
