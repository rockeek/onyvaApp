import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Club } from '../../app/club';
import { ClubService } from '../../providers/club.service';
import {
	FormBuilder,
	FormGroup,
  	Validators
} from '@angular/forms';

@Component({
    selector: 'page-club-detail',
    templateUrl: 'club-detail.html'
})
export class ClubDetailPage {
    public form: FormGroup;
    callback: any;
    club: Club;
    displayedName: string;
    errorMessage: string;
    isLoading: boolean;
    isCreatingOrJoining: boolean = null;
    invalidFromServer: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams, 
        private formBuilder: FormBuilder,
        private toastCtrl: ToastController,
        private clubService: ClubService) {
        // Copy the passed object to break the bindings.
        // If we don't, when we go back, the club appears modified.
        // this.club = Object.assign({}, this.navParams.get('club'));
        this.club = this.navParams.get('club');

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

    // Create a new club.
    create(club: Club): void {
        this.callback(this.sanitizeClub(club));
        this.navCtrl.pop();
    }

    // Validate an invalid club. Or Join a new club.
    join(club: Club): void {
        this.isLoading = true;
        this.invalidFromServer = false;
        this.clubService.checkClub(club)
            .subscribe(validatedClub => 
            {
                this.club.isInvalid = validatedClub.isInvalid;
                this.club.password = validatedClub.password;
                this.club.name = validatedClub.name;

                this.invalidFromServer = validatedClub.isInvalid;
                this.isLoading = false;

                if(this.club.isInvalid != true)
                {
                    this.callback(this.sanitizeClub(club));
                    this.navCtrl.pop();                    
                }
            });
    }

    // TODO: all forms call this method for now.
    save(club: Club): void {
        this.isLoading = true;

        this.callback(this.sanitizeClub(club)).then(()=>{
            this.isLoading = false;
            this.navCtrl.pop();
         });
    }

    private sanitizeClub(club: Club): Club {
        club.name = club.name == null ? null : club.name.trim();
        club.password = club.password == null ? null : club.password.trim();
        return club;
    }

    private showClubCreatedToast() {
        const toast = this.toastCtrl.create({
            message: 'Club successfully created',
            duration: 1500
        });
        toast.onDidDismiss(this.dismissHandler);
        toast.present();
    }

    private dismissHandler() {
        console.info('Toast onDidDismiss()');
    }
}
