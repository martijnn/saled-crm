import {Component} from 'angular2/core';
import {LeadsService} from "../services/leads.service";
import {Lead} from "../models/lead.model";
import {ComponentInstruction, CanActivate} from "angular2/router";
import {isLoggedIn} from "../constants/is-logged-in.constant";
@Component({
    template: `
    <h1>Leads</h1>
    <!--<div class="ui middle aligned center aligned grid">-->
      <!--<div class="column">-->
     <div class="ui container">
        <table class="ui small green celled padded table">
          <thead>
            <tr><th class="single line">Prioriteit</th>
            <th>Bedrijfsnaam</th>
            <th>Verantwoordelijke</th>
            <th>Status</th>
            <th></th>
          </tr></thead>
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
              <td><i class="large edit link icon"></i></td>
            </tr>
          </tbody>
        </table>
      <!--</div>-->
    </div>
    `,
    styles: [`
    h1 {
        text-align: center;
        color: white;
    }
    `],
    directives:[],
    providers: [LeadsService]

})
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return isLoggedIn(next, previous);
})
export class LeadsComponent {
    leads: Array<Lead>;

    constructor(private LeadsService: LeadsService) {
        this.leads = LeadsService.GetAllLeads();
    }
}
