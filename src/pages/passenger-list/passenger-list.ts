import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from 'ionic-angular';
import { PassengerService } from '../../providers/passenger.service';
import { PassengerDetailPage } from '../passenger-detail/passenger-detail';
import { Passenger } from '../../app/passenger';
import leaflet from 'leaflet';

@Component({
    selector: 'page-passenger-list',
    templateUrl: 'passenger-list.html',
    providers: [
        PassengerService
    ]
})
export class PassengerListPage implements OnInit {
    errorMessage: String;
    passengerName: String;
    passengers: Passenger[];
    passenger = new Passenger();
    isLoading: boolean;

    constructor(
        public navCtrl: NavController,
        public location: Location,
        public passengerService: PassengerService) {
    }

    ngOnInit(): void {
        this.fetchPassengers();
    }

    saveCallback = (passenger) => {
        return new Promise((resolve, reject) => {
            this.passengerService.updatePassengers([passenger])
                .subscribe(passengers => { 
                    this.passengers = passengers;
                    resolve(); // resolve only when we get the server's answer
                }, error => this.errorMessage = <any>error);            
        });
    }

    fetchPassengers(): void {
        this.isLoading = true;
        this.passengerService.getPassengers()
            .subscribe(passengers => {
                this.passengers = passengers;
                this.isLoading = false;
            },
            error => this.errorMessage = <any>error);
    }

    open(passenger: Passenger) {
        this.navCtrl.push(PassengerDetailPage,
            {
                passenger: passenger,
                callback: this.saveCallback
            }
        );
    }

    add() {
        let passenger = new Passenger();
        this.navCtrl.push(PassengerDetailPage,
            {
                passenger: passenger,
                callback: this.saveCallback
            });
    }

    delete(passenger: Passenger) {
        let index: number = this.passengers.indexOf(passenger);
        if (index !== -1) {
            this.passengerService.deletePassenger(passenger)
                .subscribe(passengers => this.passengers = passengers,
                error => this.errorMessage = <any>error);
            // this.passengers.splice(index, 1);
        }
    }

    goBack(): void {
        this.location.back();
    }
}