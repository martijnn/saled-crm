import {Component, OnInit} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {LeadsService} from "../services/leads.service";
import {Lead} from "../models/lead.model";
@Component({
    template: `
    <div class="ui container">
        Id: {{_lead}}
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
export class LeadsEditComponent implements OnInit {
    private _lead: Lead;

    constructor(private _routeParams: RouteParams, private _leadsService: LeadsService) {}

    ngOnInit() {
        this._lead = this._leadsService.loadLead(this._routeParams.get("id"));
    }


}
