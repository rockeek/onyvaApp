import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Config /*, NavController */ } from 'ionic-angular';
import {VehiculeService} from '../../providers/vehicule-service-mock';
import {Vehicule} from '../../app/vehicule';
// import {VehiculeDetailPage} from '../vehicule-detail/vehicule-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-vehicule-list',
    templateUrl: 'vehicule-list.html'
})
export class VehiculeListPage {
    
    vehicules: Array<Vehicule>;
    selectedVehicule: Vehicule;
    
    constructor(
        // public navCtrl: NavController,
        public location: Location,
        public service: VehiculeService,
        public config: Config) 
    {
        this.findAll(); 
    }
    
    openVehiculeDetail(vehicule: Vehicule) {
        this.selectedVehicule = vehicule;
        // this.navCtrl.push(VehiculeDetailPage, vehicule);
    }
    
    findAll() {
        this.service.findAll()
            .then(data => this.vehicules = data)
            .catch(error => alert(error));
    }

    goBack(): void {
        this.location.back();
    }

    // save():void {
    //     this.service.update(this.selectedVehicule)
    //         .then(() => this.goBack());
    // } 
}