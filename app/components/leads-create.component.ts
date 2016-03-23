import {Component} from "angular2/core";
import {LeadsService} from "../services/leads.service";
import {ILead} from "../models/lead.model";
import {Router} from "angular2/router";
import {FORM_DIRECTIVES} from "angular2/common";

@Component({
    template: `
    <div class="ui container">
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
                <input ngControl="status" type="text" name="status" required>
            </div>            
            <button type="submit" class="ui button">Aanmaken</button>
        </form>
    </div>
    `,
    providers: [LeadsService],
    directives: [FORM_DIRECTIVES],
    styles: [`
    .ui.container {
        margin-top: 50px;
    }
    `]
})
export class LeadsCreateComponent {

    constructor(private _leadsService: LeadsService, private _router: Router) {}

    onSubmit(lead) {
        this._leadsService.addLead(lead);
        this._router.navigate(['../LeadsList']);
        return false;
    }

}