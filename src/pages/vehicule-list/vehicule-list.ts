import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Config /*, NavController */ } from 'ionic-angular';
import {VehiculeService} from '../../providers/vehicule.service';
import {Vehicule} from '../../app/vehicule';
import leaflet from 'leaflet';

@Component({
    selector: 'page-vehicule-list',
    templateUrl: 'vehicule-list.html'
})
export class VehiculeListPage implements OnInit {
    errorMessage: String;
    vehiculeName: String;
    vehicules: Vehicule[];
    selectedVehicule: Vehicule;
    vehicule = new Vehicule();

    constructor(
        // public navCtrl: NavController,
        public location: Location,
        public vehiculeService: VehiculeService,
        public config: Config) 
    {
        this.fetchVehicules(); 
    }

    ngOnInit(): void {
        this.fetchVehicules();
    }

    fetchVehicules(): void {
        this.vehiculeService.getVehicules()
            .subscribe(vehicules => this.vehicules = vehicules,
            error => this.errorMessage = <any>error);
    }

    openVehiculeDetail(vehicule: Vehicule) {
        this.selectedVehicule = vehicule;
        // this.navCtrl.push(VehiculeDetailPage, vehicule);
    }
    
    addVehicule(): void {
        this.vehiculeService.addVehicule(this.vehicule)
            .subscribe(vehicule => {
                this.fetchVehicules();
                this.reset();
                this.vehiculeName = vehicule.name;
            },
            error => this.errorMessage = <any>error);
    }

    private reset() {
        this.vehicule.vehiculeId = null;
        this.vehicule.name = null;

        this.errorMessage = null;
        this.vehiculeName = null;
    }

    goBack(): void {
        this.location.back();
    }

    // save():void {
    //     this.vehiculeService.update(this.selectedVehicule)
    //         .then(() => this.goBack());
    // }
}