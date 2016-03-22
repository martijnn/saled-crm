import {Component} from "angular2/core";
import {LeadsService} from "../services/leads.service";
import {ILead} from "../models/lead.model";
import {Router} from "angular2/router";

@Component({
    template: `
    <div class="ui container">
        <h2>Aanmaken Lead</h2>
        <form class="ui form">
            <div class="field">
                <label for="company_name">Name</label>
                <input type="text" name="company_name" required>
            </div>
            <div class="field">
                <label for="priority">Alter Ego</label>
                <input type="text" name="priority" required>
            </div>
            <button type="submit" class="ui button" (click)="onSubmit()">Aanmaken</button>
        </form>
    </div>
    
    <!--<pre>{{lead}}</pre>-->
    `,
    providers: [LeadsService, Router],
    styles: [`
    h2 {
        text-align: center;
        color: white;
    }
    `]
})
export class LeadsCreateComponent{

    private _lead: ILead;

    constructor(private _leadsService: LeadsService, private _router: Router) {}

    onSubmit() {
        this._leadsService.addLead(this._lead);
        this._router.navigate(['../']);
        /**
         * TODO: resolve
         * EXCEPTION: Cannot resolve all parameters for 'Router'(RouteRegistry, Router, ?, Router).
         * Make sure that all the parameters are decorated with Inject or have valid type annotations and that 'Router' is decorated with Injectable.
        **/
    }

}