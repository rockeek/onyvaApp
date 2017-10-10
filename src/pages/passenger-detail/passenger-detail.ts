import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PassengerService } from '../../providers/passenger.service';
import { Passenger } from '../../app/passenger';

@Component({
    selector: 'page-passenger-detail',
    templateUrl: 'passenger-detail.html',
    providers: [
        PassengerService
    ]
})
export class PassengerDetailPage {
    callback: any;
    passenger: Passenger;
    errorMessage: string;
    isLoading: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: PassengerService) {
        // Copy the passed object to break the bindings.
        // If we don't, when we go back, the passenger appears modified.
        this.passenger = Object.assign({}, this.navParams.get('passenger'));
        this.callback = this.navParams.get('callback');
    }

    save(): void {
        this.isLoading = true;

        // Call the passengerListPage's callback so that, once saved, 
        // the server's response refreshes the list of passengers automatically
        // Trick from // https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104/4
        this.callback(this.passenger).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }
}
