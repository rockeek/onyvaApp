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
    errorMessage: string;
    isLoading: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: VehiculeService) {
        // Copy the passed object to break the bindings.
        // If we don't, when we go back, the vehicule appears modified.
        this.vehicule = Object.assign({}, this.navParams.get('vehicule'));
        this.callback = this.navParams.get('callback');
    }

    save(): void {
        this.isLoading = true;

        // Call the vehiculeListPage's callback so that, once saved, 
        // the server's response refreshes the list of vehicules automatically
        // Trick from // https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104/4
        this.callback(this.vehicule).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }
}
