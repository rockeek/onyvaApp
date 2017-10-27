import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from 'ionic-angular';
import { ClubService } from '../../providers/club.service';
import { ClubDetailPage } from '../club-detail/club-detail';
import { Club } from '../../app/club';
import leaflet from 'leaflet';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page-club-list',
    templateUrl: 'club-list.html'
})
export class ClubListPage implements OnInit {
    errorMessage: String;
    clubName: String;
    clubs: Club[];
    club = new Club();
    isLoading: boolean = null;

    constructor(
        public navCtrl: NavController,
        public location: Location,
        public clubService: ClubService) {
    }

    ngOnInit(): void {
        this.fetchClubs();
    }
 
    fetchClubs(): void {
        this.clubs = this.clubService.storedClubs;
    }

    createCallback = (club) => {
        this.clubService.createClub(club)
            .subscribe(_club => 
                    {
                        this.clubs.push(_club);
                        this.clubService.showToast('Club successfully created.')
                    });
    };

    // Click on Create
    create() {
        let club = new Club();
        this.navCtrl.push(ClubDetailPage,
            {
                isCreatingOrJoining: true,
                club: club,
                callback: this.createCallback
            });
    }

    joinExistingClubCallback = (club) => {
        this.clubService.storeClubs(this.clubs);
    }

    // Open an existing club.
    // Give a callback for joining a club.
    open(club: Club) {
        this.navCtrl.push(ClubDetailPage,
            {
                club: club,
                callback: this.joinExistingClubCallback
            }
        );
    }

    joinNewClubCallback = (club: Club) => {
        this.clubs.push(club);
        this.clubService.storeClubs(this.clubs);
    }

    // Click on join
    join() {
        let club = new Club();
        this.navCtrl.push(ClubDetailPage,
            {
                isCreatingOrJoining: false,
                club: club,
                callback: this.joinNewClubCallback
            });
    }

//---------------
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