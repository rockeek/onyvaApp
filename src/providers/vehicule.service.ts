import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {SERVER_URL} from './config';
import { Vehicule } from '../app/vehicule';

let vehiculesURL = SERVER_URL + "getvehicule";

@Injectable()
export class VehiculeService {
    errorMessage: String;

    constructor(private http: Http) { }

    getVehicules(): Observable<Vehicule[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json'}); // , 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
        let cpParams = new URLSearchParams();
        let options = new RequestOptions({ headers: cpHeaders, params: cpParams });

        let body = { identifier:"aaabbb" };
        let vehicules = this.http.post(vehiculesURL, body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
        return vehicules;
    }

    addVehicule(vehicule: Vehicule): Observable<Vehicule> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(vehiculesURL, vehicule, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    updateVehicules(vehicules: Vehicule[]): Observable<Vehicule[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let params = {identifier:"aaabbb", vehicules: vehicules}; // This array should be useless. Server must be modified.
        let body = JSON.stringify(params);
        return this.http.post(SERVER_URL + "setvehicule", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    findById(id: number): Observable<Vehicule> {
        return this.getVehicules()
        .filter(<Vehicule>(v) => v.vehiculeId === id)
        .catch(err => Observable.throw(err));
    }

    private extractData(res: Response) {
        let body = res.json();
        let vehicules = body || {};

        // Set default image for each vehicule while server does not implement that.
        vehicules.forEach(vehicule => {
            vehicule.photo = "assets/img/onyva-logo.png";
        });

        return vehicules;
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}