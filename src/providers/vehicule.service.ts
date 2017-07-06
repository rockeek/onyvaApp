import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Vehicule } from '../app/vehicule';

@Injectable()
export class VehiculeService {
    url = "api/vehicules";
    constructor(private http: Http) { }
    getVehiculesWithObservable(): Observable<Vehicule[]> {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    addVehiculeWithObservable(vehicule: Vehicule): Observable<Vehicule> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.url, vehicule, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }
    // getVehiculesWithPromise(): Promise<Vehicule[]> {
    //     return this.http.get(this.url).toPromise()
    //         .then(this.extractData)
    //         .catch(this.handleErrorPromise);
    // }
    // addVehiculeWithPromise(vehicule: Vehicule): Promise<Vehicule> {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     return this.http.post(this.url, vehicule, options).toPromise()
    //         .then(this.extractData)
    //         .catch(this.handleErrorPromise);
    // }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    // private handleErrorPromise(error: Response | any) {
    //     console.error(error.message || error);
    //     return Promise.reject(error.message || error);
    // }
} 