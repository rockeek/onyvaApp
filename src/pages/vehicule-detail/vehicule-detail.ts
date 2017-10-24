import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { VehiculeService } from '../../providers/vehicule.service';
import { Vehicule } from '../../app/vehicule';
import {
	FormBuilder,
	FormGroup,
  	Validators
} from '@angular/forms';
import {CustomValidators} from '../../providers/custom-validators';

@Component({
    selector: 'page-vehicule-detail',
    templateUrl: 'vehicule-detail.html',
    providers: [
        VehiculeService
    ]
})
export class VehiculeDetailPage {
    public form: FormGroup;
    callback: any;
    vehicule: Vehicule;
    displayedName: string;
    errorMessage: string;
    isLoading: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public service: VehiculeService,
        private formBuilder: FormBuilder) {
        // Copy the passed object to break the bindings.
        // If we don't, when we go back, the vehicule appears modified.
        this.vehicule = Object.assign({}, this.navParams.get('vehicule'));
        this.callback = this.navParams.get('callback');
        this.displayedName = this.vehicule.vehiculeId == null ? '[new]' : this.vehicule.name;
        this.form = formBuilder.group({
            'vehiculeId': [this.vehicule.vehiculeId],
            'name': [this.vehicule.name, Validators.required],
            'trademark' : [this.vehicule.trademark, Validators.required],
            'color' : [this.vehicule.color, Validators.required],
            'seats' : [this.vehicule.seats, CustomValidators.invalidSeats]
        });
    }

    save(vehicule: Vehicule): void {
        this.isLoading = true;
        vehicule.color = vehicule.color.trim();
        vehicule.name = vehicule.name.trim();
        vehicule.trademark = vehicule.trademark.trim();

        // Call the vehiculeListPage's callback so that, once saved, 
        // the server's response refreshes the list of vehicules automatically
        // Trick from // https://forum.ionicframework.com/t/solved-ionic2-navcontroller-pop-with-params/58104/4
        this.callback(vehicule).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }
}
