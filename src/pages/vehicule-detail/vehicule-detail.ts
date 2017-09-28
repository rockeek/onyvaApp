import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehiculeService } from '../../providers/vehicule.service';
import { Vehicule } from '../../app/vehicule';

@Component({
    selector: 'page-vehicule-detail',
    templateUrl: 'vehicule-detail.html'
})
export class VehiculeDetailPage {
    callback: any;
    vehicule: Vehicule;
    vehicules: Vehicule[];
    errorMessage: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: VehiculeService) {
        // this.vehicule = this.navParams.data;
        this.vehicule = this.navParams.get('vehicule');
        this.vehicules = this.navParams.get('vehicules');
        this.callback = this.navParams.get('callback');


    }

    // https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104/4
    save(): void {
        // this.service.updateVehicules(this.vehicules)
        //     .subscribe(vehicules => this.vehicules = vehicules,
        //     error => this.errorMessage = <any>error);

        this.callback(this.vehicules).then(()=>{
            this.navCtrl.pop();
         });
    }
}
