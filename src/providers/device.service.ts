import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Response } from '@angular/http';
import { Config } from './config';
import { HelpersService } from './helpers.service';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';

@Injectable()
export class DeviceService {
    private _identifier: string;
    private _os: string;
    private isFullyRegistered: boolean;

    get identifier(): string {
        return this._identifier;
    }

    @Input('identifier')
    set identifier(value: string) {
        this._identifier = value;
    }

    constructor(
        private storage: Storage,
        private http: Http,
        private platform: Platform,
        private helpersService: HelpersService,
        private config: Config) { 
    }

    public getOs(){
        if(this._os == null)
        { 
            this._os = this.platform.is('ios') ? 'ios' : 
                this.platform.is('android') ? 'android':
                this.platform.is('windows') ? 'windows' : 'unknown';
        }

        return this._os;
    }

    /**
     * Get unique ID from storage.
     * 
     * If it exists register the device.
     * It not, create an ID, store it and register the device.
     * 
     */
    public loadUniqueIdentifier(callback: Function) {
        this.storage.get('identifier').then((val) => {
            if(val == null) {
                this.identifier = this.helpersService.randomString(16);
                this.storage.set('identifier', this.identifier);
            }
            else {
                this.identifier = val;
            }

            var timer = Observable.timer(0, 5000).subscribe(() => {
                this.registerDevice().subscribe((val) => {
                    if(val){
                        this.isFullyRegistered = true;
                        callback();
                        timer.unsubscribe();
                    }
                });
            });
        });
    }

    private registerDevice(): Observable<any>{
        // if(this.isFullyRegistered){
        //     return;
        // }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let params = {identifier: this.identifier, version: this.config.clientVersion, os: this.getOs()};
        let body = JSON.stringify(params);
        
        console.debug("Try to register device.");

        var observablePost = this.http.post(this.config.serverUrl + "device", body, options);
        
        observablePost.subscribe ({
            complete: () => { 
                // this.isFullyRegistered = true;
                console.debug("Device successfully registered. " + body);
                return true;
                // observablePost
            },
            error: () => {
                console.debug("Failed to register device.");
                return false;
            }
        });

        return observablePost;
    }
}