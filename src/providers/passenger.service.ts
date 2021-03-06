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

    constructor(
        private http: Http,
        private deviceService: DeviceService,
        private config: Config) { }

    getPassengers(): Observable<Passenger[]> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json'}); // , 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'});
        let options = new RequestOptions({ headers: cpHeaders });

        let body = { identifier: this.deviceService.identifier };
        return this.http.post(this.config.serverUrl + "getpassenger", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    updatePassengers(passengers: Passenger[]): Observable<Passenger[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let params = {identifier: this.deviceService.identifier, passengers: passengers};
        let body = JSON.stringify(params);
        return this.http.post(this.config.serverUrl + "setpassenger", body, options)
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
        return this.http.post(this.config.serverUrl + "deletepassenger", body, options)
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

        // Set default image
        passengers.forEach(passenger => {
            passenger.photo = "assets/img/passenger-96.png";
        });

        return passengers;
    }

    private handleErrorObservable(error: Response | any) {
        console.error("Passenger service: " + (error.message || error));
        return Observable.throw("Passenger service is not feeling very well...");
    }
}