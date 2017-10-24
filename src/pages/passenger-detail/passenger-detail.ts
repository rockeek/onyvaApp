import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PassengerService } from '../../providers/passenger.service';
import { Passenger } from '../../app/passenger';
import {
	FormBuilder,
	FormGroup,
  	Validators
} from '@angular/forms';

@Component({
    selector: 'page-passenger-detail',
    templateUrl: 'passenger-detail.html',
    providers: [
        PassengerService
    ]
})
export class PassengerDetailPage {
    public form: FormGroup;
    callback: any;
    passenger: Passenger;
    displayedName: string;
    errorMessage: string;
    isLoading: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams, 
        public service: PassengerService,
        private formBuilder: FormBuilder) {
        // Copy the passed object to break the bindings.
        // If we don't, when we go back, the passenger appears modified.
        this.passenger = Object.assign({}, this.navParams.get('passenger'));
        this.callback = this.navParams.get('callback');
        this.displayedName = this.passenger.passengerId == null ? '[new]' : this.passenger.name;
        this.form = formBuilder.group({
            'passengerId': [this.passenger.passengerId],
            'name': [this.passenger.name, Validators.required]
        });
    }

    save(passenger: Passenger): void {
        this.isLoading = true;
        passenger.name = passenger.name.trim();
        
        // Call the passengerListPage's callback so that, once saved, 
        // the server's response refreshes the list of passengers automatically
        // Trick from // https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104/4
        this.callback(passenger).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }
}
