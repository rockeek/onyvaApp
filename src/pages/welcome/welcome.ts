import {Component} from '@angular/core';
import {Config} from '../../providers/config'

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {
    constructor(private config: Config) {}
}
