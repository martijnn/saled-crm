import {Component} from 'angular2/core';
import {ComponentInstruction, CanActivate, RouteConfig, RouterOutlet} from "angular2/router";
import {isLoggedIn} from "../constants/is-logged-in.constant";
import {LeadsListComponent} from "./leads-list.component";
import {LeadsCreateComponent} from "./leads-create.component";
@Component({
    template: `
    <router-outlet></router-outlet>
    `,
    styles: [`
    h1 {
        text-align: center;
        color: white;
    }
    `],
    directives:[RouterOutlet]
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isLoggedIn(next, previous);
})
@RouteConfig([
    {path:'/', name:'LeadsList', component: LeadsListComponent, useAsDefault: true},
    {path:'/create', name:'LeadsCreate', component: LeadsCreateComponent}
])
export class LeadsComponent {

}
