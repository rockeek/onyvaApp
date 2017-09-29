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
import { FavoriteListPage } from '../pages/favorite-list/favorite-list';
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

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    AboutPage,
    VehiculeListPage,
    VehiculeDetailPage,
    PropertyListPage,
    PropertyDetailPage,
    FavoriteListPage,
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
    PropertyListPage,
    PropertyDetailPage,
    FavoriteListPage,
    BrokerListPage,
    BrokerDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VehiculeService,
    PropertyService,
    BrokerService,
    DeviceService,
    HelpersService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
