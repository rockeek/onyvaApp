import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { VehiculeService } from '../../providers/vehicule.service';
import { Vehicule } from '../../app/vehicule';

@Component({
    selector: 'app-observable',
    templateUrl: 'observable.component.html'
})
export class ObservableComponent implements OnInit {
    vehicules: Vehicule[];
    errorMessage: String;
    vehiculeName: String;
    vehicule = new Vehicule();

    constructor(private vehiculeService: VehiculeService) { }

    ngOnInit(): void {
        this.fetchVehicules();
    }

    fetchVehicules(): void {
        this.vehiculeService.getVehiculesWithObservable()
            .subscribe(vehicules => this.vehicules = vehicules,
            error => this.errorMessage = <any>error);
    }

    addVehicule(): void {
        this.vehiculeService.addVehiculeWithObservable(this.vehicule)
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
} 