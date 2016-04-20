import {Component} from "angular2/core";
import {ComponentInstruction, CanActivate, RouteConfig, RouterOutlet} from "angular2/router";
import {isLoggedIn} from "../constants/is-logged-in.constant";
import {LeadsListComponent} from "./leads-list.component";
import {LeadsCreateComponent} from "./leads-create.component";
import {LeadsEditComponent} from "./leads-edit.component";
import {LeadsService} from "../services/leads.service";
import {LeadsShowComponent} from "./leads-show.component";

@Component({
    template: `
    <router-outlet></router-outlet>
    `,
    directives: [RouterOutlet],
    providers: [LeadsService]
})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isLoggedIn(next, previous);
})
@RouteConfig([
    {path: "/", name: "LeadsList", component: LeadsListComponent, useAsDefault: true},
    {path: "/create", name: "LeadsCreate", component: LeadsCreateComponent},
    {path: "/show/:id", name: "LeadsShow", component: LeadsShowComponent},
    {path: "/edit/:id", name: "LeadsEdit", component: LeadsEditComponent}
])
export class LeadsComponent {

}
