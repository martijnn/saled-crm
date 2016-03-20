import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

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
      <div class="item right floated">
        <a [routerLink]="['Signup']"><div class="ui primary button">Aanmelden</div></a>
      </div>
      <div class="item">
        <a [routerLink]="['Login']"><div class="ui button">Inloggen</div></a>
      </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {}
