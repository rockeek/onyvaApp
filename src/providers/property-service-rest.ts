import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Config} from './config';

@Injectable()
export class PropertyService {
    private propertiesURL = this.config.serverUrl + 'properties/';
    private favoritesURL = this.propertiesURL + 'favorites/';

    constructor(
        private http: Http,
        private config: Config) {
        this.http = http;
    }

    findAll() {
        return this.http.get(this.propertiesURL)
            .map(res => res.json())
            .toPromise();
    }

    findByName(key:string) {
        return this.http.get(this.propertiesURL + "?key=" + key)
            .map(res => res.json())
            .toPromise();
    }

    findById(id) {
        return this.http.get(this.propertiesURL + id)
            .map(res => res.json())
            .toPromise();
    }

    getFavorites() {
        return this.http.get(this.propertiesURL)
            .map(res => res.json())
            .toPromise();
    }

    favorite(property) {
        let body = JSON.stringify(property),
            headers = new Headers({'Content-Type': 'application/json'}),
            options = new RequestOptions({headers: headers});
        return this.http.post(this.propertiesURL, body, options).toPromise();
    }

    unfavorite(favorite) {
        return this.http.delete(this.propertiesURL + favorite.id)
            .map(res => res.json())
            .toPromise();
    }

}
