import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from 'ionic-angular';
import { ClubService } from '../../providers/club.service';
import { ClubDetailPage } from '../club-detail/club-detail';
import { Club } from '../../app/club';
import leaflet from 'leaflet';

@Component({
    selector: 'page-club-list',
    templateUrl: 'club-list.html',
    providers: [
        ClubService
    ]
})
export class ClubListPage implements OnInit {
    errorMessage: String;
    clubName: String;
    clubs: Club[];
    club = new Club();
    isLoading: boolean;

    constructor(
        public navCtrl: NavController,
        public location: Location,
        public clubService: ClubService) {
    }

    ngOnInit(): void {
        this.fetchClubs();
    }
 
    fetchClubs(): void {
        this.clubService.loadStoredClubs().then((val) => {
            this.clubService.validateClubs(this.clubService.storedClubs)
            .subscribe(_clubs =>
                this.clubs = _clubs)
            });
    }
    //-----------------------------------

    saveCallback = (club) => {
        return new Promise((resolve, reject) => {
            console.debug('Back in the list page.');

            this.clubService.updateClubs([club])
                .subscribe(clubs => { 
                    this.clubs = clubs;
                    resolve(); // resolve only when we get the server's answer
                }, error => this.errorMessage = <any>error);            
        });
    }

    open(club: Club) {
        this.navCtrl.push(ClubDetailPage,
            {
                club: club,
                callback: this.saveCallback
            }
        );
    }

    add() {
        let club = new Club();
        this.navCtrl.push(ClubDetailPage,
            {
                club: club,
                callback: this.saveCallback
            });
    }

    delete(club: Club) {
        let index: number = this.clubs.indexOf(club);
        if (index !== -1) {
            this.clubService.deleteClub(club)
                .subscribe(clubs => this.clubs = clubs,
                error => this.errorMessage = <any>error);
        }
    }

    goBack(): void {
        this.location.back();
    }
}