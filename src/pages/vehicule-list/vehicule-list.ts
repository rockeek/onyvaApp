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

    constructor(
        public navCtrl: NavController,
        public location: Location,
        public vehiculeService: VehiculeService,
        public config: Config) {
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
        this.navCtrl.push(VehiculeDetailPage,
            {
                vehicule: vehicule,
                vehicules: this.vehicules
            }
        );
    }

    deleteItem(vehicule: Vehicule) {
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

    private reset() {
        this.vehicule.vehiculeId = null;
        this.vehicule.name = null;

        this.errorMessage = null;
        this.vehiculeName = null;
    }

    goBack(): void {
        this.location.back();
    }
}