import {Injectable} from '@angular/core';
import vehicules from './mock-vehicules';

@Injectable()
export class VehiculeService {
    vehicules: Array<any> = [];
    
    findAll() {
        return Promise.resolve(vehicules);
    }
}