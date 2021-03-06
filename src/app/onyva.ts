import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {PropertyListPage} from '../pages/property-list/property-list';
import {VehiculeListPage} from '../pages/vehicule-list/vehicule-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import {PassengerListPage} from '../pages/passenger-list/passenger-list';
import {ClubListPage} from '../pages/club-list/club-list';

import {DeviceService} from '../providers/device.service';
import {ClubService} from '../providers/club.service';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'onyva.html'
})
export class Onyva {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = WelcomePage;
    appMenuItems: Array<MenuItem>;
    configMenuItems: Array<MenuItem>;
    otherMenuItems: Array<MenuItem>;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public deviceService: DeviceService,
        public clubService: ClubService) {

        this.initializeApp();
        this.appMenuItems = [
            {title: 'Lobby', component: PropertyListPage, icon: 'chatboxes'}
        ];

        this.configMenuItems = [
            {title: 'Clubs', component: ClubListPage, icon: 'md-contacts'},
            {title: 'Travels', component: WelcomePage, icon: 'md-time'},
            {title: 'Vehicules', component: VehiculeListPage, icon: 'md-car'},
            {title: 'Passengers', component: PassengerListPage, icon: 'md-walk'}
        ];

        this.otherMenuItems = [
            {title: 'About', component: AboutPage, icon: 'md-help'}
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            this.deviceService.loadUniqueIdentifier(() => this.onFullyRegistered());
        });
    }

    onFullyRegistered() {
        console.debug("Entered onFullyRegistered");
        let resetForDebug = false;

        if(resetForDebug) {
            // for debug only. To initialize clubs when there are none.
            this.clubService.setDummyStoredClubs().then(
                () => this.clubService.loadStoredClubs());
        }
        else {
            // prod:
            this.clubService.loadStoredClubs();
        }
        
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }
}
