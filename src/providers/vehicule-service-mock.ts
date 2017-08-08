import {Injectable} from '@angular/core';
import vehicules from './mock-vehicules';
import {Vehicule} from '../app/vehicule';

@Injectable()
export class VehiculeService {
    vehicules: Array<Vehicule> = [];
    
    findAll() {
        return Promise.resolve(vehicules);
    }
}