import {Component} from "angular2/core";
import {LeadsService} from "../services/leads.service";
import {Router} from "angular2/router";
import {FORM_DIRECTIVES} from "angular2/common";
import {LeadStatus} from "../models/lead.model";

@Component({
    template: `
    <div class="ui container">
        <div class="ui raised very padded text container segment">
        <h2>Lead aanmaken</h2>
        <form #form="ngForm" (ngSubmit)="onSubmit(form.value)" class="ui form">
            <div class="field">
                <label for="company_name">Bedrijfsnaam</label>
                <input ngControl="company_name" type="text" name="company_name" required>
            </div>
            <div class="field">
                <label for="priority">Prioriteit</label>
                <input ngControl="priority" type="text" name="priority" required>
            </div>
            <div class="field">
                <label for="person_responsible">Verantwoordelijke</label>
                <input ngControl="person_responsible" type="text" name="person_responsible">
            </div>
            <div class="field">
                <label for="status">Status</label>
                <!--<input ngControl="status" type="text" name="status" required>-->
                <select>
                    <option *ngFor="#key of keys" [value]="key" [label]="leadStatus[key]"></option>                
                </select>
            </div>            
            <button type="submit" class="ui button">Aanmaken</button>
        </form>
        </div>
    </div>
    `,
    directives: [FORM_DIRECTIVES]
})
export class LeadsCreateComponent {

    leadStatus = LeadStatus;
    keys;

    constructor(private _leadsService: LeadsService, private _router: Router) {
        this.keys = Object.keys(this.leadStatus)
            .filter(v => isNaN(parseInt(v, 10)));
            // .forEach(v => console.log(leadStatus[v]));
    }

    onSubmit(lead) {
        this._leadsService.createLead(lead);
        this._router.navigate(["../LeadsList"]);
        return false;
    }

}
