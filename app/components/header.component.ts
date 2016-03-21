import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'sl-header',
    template: `
    <div class="ui main menu">
      <div class="header item">
        <a [routerLink]="['Home']">SALED</a>
      </div>
      <div class="item">
        <a [routerLink]="['Leads']">Leads</a>
      </div>
      <div class="item right floated" *ngIf="!userIsLoggedIn">
        <a [routerLink]="['Signup']"><div class="ui primary button">Aanmelden</div></a>
      </div>
      <div class="item" *ngIf="!userIsLoggedIn">
        <a [routerLink]="['Login']"><div class="ui button">Inloggen</div></a>
      </div>
      <div class="item right floated" *ngIf="userIsLoggedIn">
        <a [routerLink]="['Home']" (click)="handleLogOut()"><div class="ui button">Uitloggen</div></a>
      </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {

    userIsLoggedIn: boolean;

    constructor(private authService: AuthService, private router: Router) {
        authService.loginState$.subscribe((val: boolean) => {
            this.userIsLoggedIn = val;
            console.log('val: ' + val);
        });
    }

    handleLogOut() {
        this.authService.logout()
            .subscribe((loggedin: boolean) => {
                if (!loggedin)
                    this.router.navigate(['Home'])
            });
    }

}
