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
    isLoading: boolean;
    isNew: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public service: VehiculeService) {
        this.vehicules = this.navParams.get('vehicules');
        this.vehicule = this.navParams.get('vehicule');
        this.callback = this.navParams.get('callback');

        this.isNew = this.vehicules == null;
    }   

    save(): void {
        this.isLoading = true;
        
        if(this.isNew)
        {
            this.vehicules = [this.vehicule];
        }

        // Call the vehiculeListPage's callback so that, once saved, 
        // the server's response refreshes the list of vehicules automatically
        // Trick from // https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104/4
        this.callback(this.vehicules).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }
}
