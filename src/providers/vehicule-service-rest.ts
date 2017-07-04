import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {SERVER_URL} from './config';

let propertiesURL = SERVER_URL + 'getvehicule/';

@Injectable()
export class VehiculeService {

    constructor(public http: Http) {
        this.http = http;
    }

    findAll() {
        return this.http.get(propertiesURL)
            .map(res => res.json())
            .toPromise();
    }
}