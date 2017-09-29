import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {PropertyListPage} from '../pages/property-list/property-list';
import {VehiculeListPage} from '../pages/vehicule-list/vehicule-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';

import {BrokerListPage} from '../pages/broker-list/broker-list';
import {PassengerListPage} from '../pages/passenger-list/passenger-list';

import {DeviceService} from '../providers/device.service';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = WelcomePage;
    appMenuItems: Array<MenuItem>;
    configMenuItems: Array<MenuItem>;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public deviceService: DeviceService) {

        this.initializeApp();
        this.appMenuItems = [
            {title: 'Lobby', component: PropertyListPage, icon: 'chatboxes'}
        ];

        this.configMenuItems = [
            {title: 'Clubs', component: BrokerListPage, icon: 'md-person'},
            {title: 'Passengers', component: PassengerListPage, icon: 'md-walk'},
            {title: 'Vehicules', component: VehiculeListPage, icon: 'md-car'},
            {title: 'Travels', component: WelcomePage, icon: 'md-time'}
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.deviceService.loadUniqueIdentifier();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
