import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClubService } from '../../providers/club.service';
import { Club } from '../../app/club';
import {
	FormBuilder,
	FormGroup,
  	Validators
} from '@angular/forms';

@Component({
    selector: 'page-club-detail',
    templateUrl: 'club-detail.html',
    providers: [
        ClubService
    ]
})
export class ClubDetailPage {
    public form: FormGroup;
    callback: any;
    club: Club;
    displayedName: string;
    errorMessage: string;
    isLoading: boolean;
    isCreatingOrJoining: boolean = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams, 
        public service: ClubService,
        private formBuilder: FormBuilder) {
        // Copy the passed object to break the bindings.
        // If we don't, when we go back, the club appears modified.
        this.club = Object.assign({}, this.navParams.get('club'));
        this.callback = this.navParams.get('callback');
        this.isCreatingOrJoining = this.navParams.get('isCreatingOrJoining');

        this.displayedName = this.club.isInvalid ? '[invalid club]'
            : this.isCreatingOrJoining ? '[creating new club]'
            : this.isCreatingOrJoining == false ? '[joining club]'
            : this.club.name;

        if(this.club.isInvalid) { 
            this.club.password = '';
        }

        this.form = formBuilder.group({
            'clubId': [this.club.clubId],
            'name': [this.club.name, this.club.clubId == null ? Validators.required : null ],
            'password': [this.club.password, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    save(club: Club): void {
        this.isLoading = true;

        this.callback(club).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }

    /**
     * Whether Club can be shared. If it is existing and valid, it can be shared.
     */
    isSharing(): boolean {
        return !this.club.isInvalid && this.club.clubId != null;
    }
}
