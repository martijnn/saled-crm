
import {Component} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    template: `
    <div class="ui container">
        Id: {{id}}
        <br>
        <button class="ui button" [routerLink]="['../LeadsList']">Terug</button>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
    .ui.container {
        margin-top: 50px;
    }
    `]
})
export class LeadsShowComponent {

    id: string;

    constructor(private routeParams: RouteParams) {
        this.id = routeParams.get("id");
    }



}
