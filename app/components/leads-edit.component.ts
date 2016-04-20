import {Component, OnInit} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {LeadsService} from "../services/leads.service";
import {Lead} from "../models/lead.model";
@Component({
    template: `
    <div class="ui container">
        <div class="ui raised very padded text container segment">
        <h2 class="item">{{_lead.company_name}}</h2>    
        <div class="ui list">
            <div class="item">Verantwoordelijke: {{_lead.person_responsible}}</div>
            <div class="item">Status: {{_lead.status}}</div>
            <div class="item">Prioriteit: {{_lead.priority}}</div>
        </div>
        
        <br>
        <button class="ui button" [routerLink]="['../LeadsList']">Terug</button>
        <button class="ui right floated primary button" (click)="saveLead()">Opslaan</button>
    </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
export class LeadsEditComponent implements OnInit {
    private _lead: Lead;

    constructor(private _routeParams: RouteParams, private _leadsService: LeadsService) {}

    ngOnInit() {
        this._lead = this._leadsService.loadLead(this._routeParams.get("id"));
    }

    saveLead() {
        this._leadsService.updateLead(this._lead);
    }
}
