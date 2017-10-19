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
    public isLoading: boolean;
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
    }
    
    /**
     * Load validated clubs from storage and validate them.
     */
    public loadStoredClubs(): Promise<void> {
        this.isLoading = true;
        return this.storage.get('clubs').then((val) => {
            if(val != null)
            {
                this.validateClubs(val).subscribe(
                    _clubs => {
                        this.storage.set('clubs', _clubs);
                        this.storedClubs = _clubs;
                        console.debug("Clubs loaded.");
                        this.isLoading = false;
                    }
                )
            }
        });
    }

    //----------------
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
        console.error("Club service: " + (error.message || error));
        return Observable.throw("Club service: " + (error.message || error));
    }

    /**
     * For test purposes only.
     * Create dummy clubs for the very first start of app.
     */
    public setDummyStoredClubs(): Promise<any> {
        let clubs = [
            {clubId: 10001, password: "boing", name: "", photo: "assets/img/club-100.png"},
            {clubId: 10010, password: "blabla", name: "Deuxième", photo: "assets/img/club-100.png"},
            {clubId: 10003, password: "Wayne", name: "", photo: "assets/img/club-100.png"},
            {clubId: null, password: "newClubPassword", name: "Dorothée club", photo: "assets/img/club-100.png"}
        ];
        
        // to reset clubs:
        // clubs = [];
        return this.storage.set('clubs', clubs);
    }

    /**
     * Validate stored clubs against server. Validated clubs are stored back.
     * 
     * @param clubs Clubs to validate. They usually come from storage
     */
    private validateClubs(clubs: Club[]): Observable<Club[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let params = {identifier: this.deviceService.identifier, clubs: clubs};
        let body = JSON.stringify(params);
        var response = this.http.post(this.config.serverUrl + "club", body, options)
            .map(this.extractData)
            .catch(this.handleErrorObservable);

        return response;
    }
}