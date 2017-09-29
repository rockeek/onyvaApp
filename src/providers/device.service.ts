import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DeviceService {
    public identifier: string;

    constructor(public storage: Storage) { 
    }

    public loadUniqueIdentifier() {
        this.storage.get('identifier').then((val) => {
            if(val == null) {
                this.identifier = this.randomString(16);
                this.storage.set('identifier', this.identifier);
            }
            
            this.identifier = val;
            console.log('identifier: ' + this.identifier);
        });
    }

    randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}