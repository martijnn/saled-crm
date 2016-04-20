import {Component, OnInit} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {LeadsService} from "../services/leads.service";
import {Lead} from "../models/lead.model";
@Component({
    template: `
    <div class="ui container">
        <div class="ui raised very padded text container segment">
            <span class="ui top attached orange label">{{_lead.status}}</span>
            <h2 class="ui dividing header">{{_lead.company_name}}</h2>
            <i class="small edit icon" [routerLink]="['LeadsEdit', {id: _lead.id}]"></i>
            <div class="ui list">
                <div class="item">Verantwoordelijke: {{_lead.person_responsible}}</div>
                <div class="item">Prioriteit: {{_lead.priority}}</div>
            </div>
            
            <br>
            <button class="ui button" [routerLink]="['../LeadsList']">Terug</button>
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class LeadsShowComponent implements OnInit {
    private _lead: Lead;

    constructor(private _routeParams: RouteParams, private _leadsService: LeadsService) {}

    ngOnInit() {
        this._lead = this._leadsService.loadLead(this._routeParams.get("id"));
    }
}
