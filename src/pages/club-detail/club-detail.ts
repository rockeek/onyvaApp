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

        if(this.club.isInvalid) {
            this.displayedName = '[invalid club]';
            this.club.password = '';
            this.form = formBuilder.group({
                'clubId': [this.club.clubId],
                'password': [this.club.password, Validators.compose([Validators.required, Validators.minLength(6)])]
            });
        }
        else if(this.isCreatingOrJoining) {
            this.displayedName = '[creating new club]';
            this.form = formBuilder.group({
                'name': [this.club.name, Validators.required],
                'password': [this.club.password, Validators.compose([Validators.required, Validators.minLength(6)])]
            });   
        }
        else if(this.isCreatingOrJoining == false) {
            this.displayedName = '[joining club]';
            this.form = formBuilder.group({
                'clubId': [this.club.clubId, Validators.required],
                'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
            });
        }
        else { // Sharable club
            this.displayedName = this.club.name;     
            this.form = formBuilder.group({
                'clubId': [this.club.clubId],
                'password': [this.club.password]
            });
        }
    }

    // TODO: all forms call this method for now.
    save(club: Club): void {
        this.isLoading = true;
        club.name = club.name == null ? null : club.name.trim();
        club.password = club.password == null ? null : club.password.trim();

        this.callback(club).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }
}
