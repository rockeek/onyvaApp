import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {VehiculeService} from '../../providers/vehicule-service-mock';
// import {VehiculeDetailPage} from '../vehicule-detail/vehicule-detail';
import leaflet from 'leaflet';

@Component({
    selector: 'page-vehicule-list',
    templateUrl: 'vehicule-list.html'
})
export class VehiculeListPage {
    
    vehicules: Array<any>;
    
    constructor(public navCtrl: NavController, public service: VehiculeService, public config: Config) {
        this.findAll(); 
    }
    
    // openVehiculeDetail(vehicule: any) {
    //     this.navCtrl.push(VehiculeDetailPage, vehicule);
    // }
    
    findAll() {
        this.service.findAll()
            .then(data => this.vehicules = data)
            .catch(error => alert(error));
    }   
}