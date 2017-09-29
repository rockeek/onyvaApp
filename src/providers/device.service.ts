import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http, Response } from '@angular/http';
import { Config } from './config';
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
        this.registerDevice();
    }

    constructor(
        private storage: Storage,
        private http: Http,
        private platform: Platform) { 
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

    public registerDevice(){
        if(this.isFullyRegistered){
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
     
        let params = {identifier: this.identifier, version: Config.clientVersion, os: this.getOs()};
        let body = JSON.stringify(params);
        
        console.log("Try to register device.");
        this.http.post(Config.serverUrl + "device", body, options)
        .subscribe  ({
            complete: () => { 
                this.isFullyRegistered = true;
                console.log(body + " successfully registered."); },
            error: () => setTimeout(() => this.registerDevice(), 5000) // try again 5 sec later
        });
    }

    public loadUniqueIdentifier() {
        this.storage.get('identifier').then((val) => {
            if(val == null) {
                this.identifier = this.randomString(16);
                this.storage.set('identifier', this.identifier);
            }
            
            this.identifier = val;
        });
    }

    private randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}