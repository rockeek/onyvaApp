import { Input } from '@angular/core';
import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Config} from './config';
import {Club} from '../app/club';
import {DeviceService} from './device.service';

@Injectable()
export class ClubService {
    private _storedClubs: Club[];
    errorMessage: String;

    constructor(
        private http: Http, 
        private deviceService: DeviceService,
        private storage: Storage,
        private config: Config) { }

    get storedClubs(): Club[] {
        return this._storedClubs;
    }

    @Input('storedClubs')
    set storedClubs(value: Club[]) {
        this._storedClubs = value;
        // Send to server
    }
    
    // getClubs(): Observable<Club[]> {
    //     // let verifiedClubs;
        

    //     let cpHeaders = new Headers({ 'Content-Type': 'application/json'});
    //     let options = new RequestOptions({ headers: cpHeaders });
    //     let params = { identifier: this.deviceService.identifier, clubs: clubs };
    //     let body = JSON.stringify(params);

    //     return this.http.post(this.config.serverUrl + "club", body, options)
    //         .map(this.extractData)
    //         .catch(this.handleErrorObservable);

    //     // return new Observable<Club[]>(observer => {
    //     //     let verifiedClubs = this.http.post(this.config.serverUrl + "getpassenger", body, options)
    //     //     .map(this.extractData)
    //     //     .catch(this.handleErrorObservable);
    //     // });

    // }

    updateClubs(clubs: Club[]): Observable<Club[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let params = {identifier: this.deviceService.identifier, clubs: clubs};
        let body = JSON.stringify(params);
        return this.http.post(this.config.serverUrl + "club", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    deleteClub(club: Club): Observable<Club[]> {
        if(club == null) {
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let params = {identifier: this.deviceService.identifier, clubId: club.clubId};
        let body = JSON.stringify(params);
        return this.http.post(this.config.serverUrl + "deleteclub", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
        let body = res.json();
        let clubs = body || {};

        clubs.forEach(club => {
            club.photo = "assets/img/club-96.png";
        });

        return clubs;
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }

    public setDummyStoredClubs() {
        let clubs = [
            {clubId: 10001, password: "boing", name: "", photo: "assets/img/club-100.png"},
            {clubId: 10010, password: "blabla", name: "Deuxième", photo: "assets/img/club-100.png"},
        ];
        
        this.storage.set('clubs', clubs);
    }

    public loadStoredClubs(): Promise<void> {
        return this.storage.get('clubs').then((val) => {
            this.storedClubs = val;
            // this.validateClubs(val).subscribe(
            //     _clubs => 
            //     this.storedClubs = _clubs);
        });
    }

    public validateClubs(clubs: Club[]): Observable<Club[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let params = {identifier: this.deviceService.identifier, clubs: clubs};
        let body = JSON.stringify(params);
        var response = this.http.post(this.config.serverUrl + "club", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

        response.subscribe(_clubs => this.storedClubs = _clubs);

        return response;
    }
}