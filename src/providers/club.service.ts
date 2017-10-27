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
import { ToastController } from 'ionic-angular';

@Injectable()
export class ClubService {
    public isLoading: boolean;
    private _storedClubs: Club[];
    errorMessage: String;

    constructor(
        private http: Http, 
        private deviceService: DeviceService,
        private storage: Storage,
        private config: Config,
        private toastCtrl: ToastController) { }

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
            else {
                this.storage.set('clubs', new Array<Club>())
                    .then(() => this.isLoading = false);
            }
        });
    }

    public storeClubs(clubs: Club[]) {
        this.storage.set('clubs', clubs);
    }

    /**
     * Post and validate new club. Returns the created club with its clubId, name, password.
     * @param newClub Club to create. Contains only name and password.
     */
    public createClub(newClub: Club): Observable<Club> {
        let clubs = this.storedClubs;
        
        let clubArray: Club[] = [newClub];
        return this.validateClubs(clubArray)
            .map((clubs: Club[]) => {
                let _club = clubs[0];
                this.storage.get('clubs').then((val) => 
                {
                    val.push(_club);
                    this.storage.set('clubs', val);
                });
                return _club;
            });
    }

    public checkClub(club: Club): Observable<Club> {
        let clubArray: Club[] = [club];
        
        return this.validateClubs(clubArray)
            .map((clubs: Club[]) => {
                let _club = clubs[0];
                return _club;
            });
    }
    //----------------
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

    /**
     * Quit club. The new list of Clubs is stored.
     * @param club Club to quit
     */
    quitClub(club: Club): Observable<boolean> {

        return Observable.create(observer =>
        {
            if(club == null) {
                observer.next(false);
                observer.complete();
            }

            let index: number = this.storedClubs.indexOf(club);
            this.storedClubs.splice(index, 1);
            this.storeClubs(this.storedClubs);
            observer.next(true);
            observer.complete();
        });
        
    }

    /**
     * For test purposes only.
     * Create dummy clubs for the very first start of app.
     */
    public setDummyStoredClubs(): Promise<any> {
        let clubs = [
            {clubId: 10001, password: "boing44", name: "", photo: "assets/img/club-100.png"},
            {clubId: 10005, password: "blabla", name: "Deuxième", photo: "assets/img/club-100.png"},
            {clubId: 10003, password: "Wayne2", name: "", photo: "assets/img/club-100.png"},
            {clubId: null, password: "newClubPassword", name: "Dorothée club", photo: "assets/img/club-100.png"}
        ];
        
        // to reset clubs:
        // clubs = [];
        
        return this.storage.set('clubs', clubs);
    }

    /**
     * Displays a toast message.
     * @param message Message to display
     */
    public showToast(message: string) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.onDidDismiss(this.dismissHandler);
        toast.present();
    }

    private dismissHandler() {
        console.info('Toast onDidDismiss()');
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
}