import {Component, OnInit} from "angular2/core";
import {Lead} from "../models/lead.model";
import {LeadsService} from "../services/leads.service";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    template: `
    <div class="ui container">
        <table class="ui small green selectable celled padded table">
            <thead>
                <tr>
                    <th class="single line">Prioriteit</th>
                    <th>Bedrijfsnaam</th>
                    <th>Verantwoordelijke</th>
                    <th>Status</th>
                    <th [routerLink]="['LeadsCreate']"><i class="large add square link icon"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#lead of leads">
                  <td>
                    <h2 class="ui center aligned header">{{lead.priority}}</h2>
                  </td>
                  <td class="single line">
                    {{lead.company_name}}
                  </td>
                  <td>
                    {{lead.person_responsible}}
                  </td>
                  <td>
                    {{lead.status}}
                  </td>
                  <td [routerLink]="['LeadsEdit', {id: lead.id}]" class="collapsing"><i class="large edit link icon"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    styles: [`
    .ui.container {
        margin-top: 50px;
    }
    `]
})
export class LeadsListComponent implements OnInit {
    leads: Lead[] = [];

    constructor(private _leadsService: LeadsService) {}

    ngOnInit() {
        this._leadsService.leads$.subscribe((leads: Lead[]) => this.leads = leads);
        this._leadsService.loadLeads();
    }

}
