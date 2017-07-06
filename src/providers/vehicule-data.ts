import { InMemoryDbService } from 'angular-in-memory-web-api';

export class VehiculeData implements InMemoryDbService {
  createDb() {
    let vehicules = [
      {
        vehiculeId: 1,
        photo: "../assets/img/onyva-logo.png",
        name: "Xsara Remy",
        trademark: "Citroen Xsara",
        color: "Grise",
        seats: 5
    },
    {
        vehiculeId: 2,
        photo: "../assets/img/onyva-logo.png",
        name: "Opel Olivier",
        trademark: "Opel Corsa",
        color: "Bleue",
        seats: 4
    },
    {
        vehiculeId: 3,
        photo: "../assets/img/onyva-logo.png",
        name: "Super Ferrarri",
        trademark: "Ferrarri",
        color: "Rouge",
        seats: 2
    }
    ];
    return {vehicules};
  }
} 