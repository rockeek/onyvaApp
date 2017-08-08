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
    
    constructor(private http: Http) { }

    getVehiculesWithObservable(): Observable<Vehicule[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json'}); // , 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
        let cpParams = new URLSearchParams();
        let options = new RequestOptions({ headers: cpHeaders, params: cpParams });

        let body = { identifier:"aaabbb" };
        return this.http.post(vehiculesURL, body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    addVehiculeWithObservable(vehicule: Vehicule): Observable<Vehicule> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(vehiculesURL, vehicule, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}