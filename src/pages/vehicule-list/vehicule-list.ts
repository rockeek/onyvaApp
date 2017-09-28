import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Config, NavController } from 'ionic-angular';
import { VehiculeService } from '../../providers/vehicule.service';
import { VehiculeDetailPage } from '../vehicule-detail/vehicule-detail';
import { Vehicule } from '../../app/vehicule';
import leaflet from 'leaflet';

@Component({
    selector: 'page-vehicule-list',
    templateUrl: 'vehicule-list.html'
})
export class VehiculeListPage implements OnInit {
    errorMessage: String;
    vehiculeName: String;
    vehicules: Vehicule[];
    vehicule = new Vehicule();
    isLoading: boolean;

    constructor(
        public navCtrl: NavController,
        public location: Location,
        public vehiculeService: VehiculeService,
        public config: Config) {
        
        this.fetchVehicules(); // It seems that fetching here and in ngOnInit speeds up the loading
    }

    saveCallback = (_params) => {
        return new Promise((resolve, reject) => {
            this.vehicules = _params;
            console.log('Back in the list page.');

            this.vehiculeService.updateVehicules(this.vehicules)
                .subscribe(vehicules => { 
                    this.vehicules = vehicules;
                    resolve(); // resolve only when we get the server's answer
                }, error => this.errorMessage = <any>error);            
        });
    }

    ngOnInit(): void {
        this.fetchVehicules(); // It seems that fetching here and in constructor speeds up the loading
    }

    fetchVehicules(): void {
        this.isLoading = true;
        this.vehiculeService.getVehicules()
            .subscribe(vehicules => {
                this.vehicules = vehicules;
                this.isLoading = false;
            },
            error => this.errorMessage = <any>error);
    }

    openDetail(vehicule: Vehicule) {
        this.navCtrl.push(VehiculeDetailPage,
            {
                vehicule: vehicule,
                vehicules: this.vehicules,
                callback: this.saveCallback
            }
        );
    }

    add() {
        let vehicule = new Vehicule();
        this.navCtrl.push(VehiculeDetailPage,
            {
                vehicule: vehicule,
                callback: this.saveCallback
            });
    }

    delete(vehicule: Vehicule) {
        let index: number = this.vehicules.indexOf(vehicule);
        if (index !== -1) {
            this.vehicules.splice(index, 1);
        }
        
        // TODO
        // this.deleteVehicule(index);
    }

    // private deleteVehicule(index: number) {
    //     this.vehiculeService.deleteVehicule(index)
    //         .subscribe(vehicules => this.vehicules = vehicules,
    //         error => this.errorMessage = <any>error);
    // }

    goBack(): void {
        this.location.back();
    }
}