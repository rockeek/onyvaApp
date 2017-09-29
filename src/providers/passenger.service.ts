import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Config} from './config';
import {Passenger} from '../app/passenger';
import {DeviceService} from './device.service';

@Injectable()
export class PassengerService {
    errorMessage: String;

    constructor(private http: Http, private deviceService: DeviceService) { }

    getPassengers(): Observable<Passenger[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json'}); // , 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
        let options = new RequestOptions({ headers: cpHeaders });

        let body = { identifier: this.deviceService.identifier };
        let passengers = this.http.post(Config.serverUrl + "getpassenger", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
        return passengers;
    }

    updatePassengers(passengers: Passenger[]): Observable<Passenger[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let params = {identifier: this.deviceService.identifier, passengers: passengers};
        let body = JSON.stringify(params);
        return this.http.post(Config.serverUrl + "setpassenger", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    deletePassenger(passenger: Passenger): Observable<Passenger[]> {
        if(passenger == null) {
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let params = {identifier: this.deviceService.identifier, passengerId: passenger.passengerId};
        let body = JSON.stringify(params);
        return this.http.post(Config.serverUrl + "deletepassenger", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    findById(id: number): Observable<Passenger> {
        return this.getPassengers()
        .filter(<Passenger>(v) => v.passengerId === id)
        .catch(err => Observable.throw(err));
    }

    private extractData(res: Response) {
        let body = res.json();
        let passengers = body || {};
        return passengers;
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}