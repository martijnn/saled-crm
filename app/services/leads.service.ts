import {Injectable} from "angular2/core";
import {ILead} from "../models/lead.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LeadsService {

    private _leads: Array<ILead> = [
        {
            'priority': 1,
            'company_name': 'SALED b.v.',
            'person_responsible': 'Piet Mondriaan',
            'status': 'Open'
        },
        {
            'priority': 2,
            'company_name': 'Pizzabakker Henk',
            'person_responsible': 'Piet Heijn',
            'status': 'Afgehandeld'
        }
    ];

    getAllLeads() {
        return Observable.of(this._leads);
    }

    addLead(lead: ILead) {
        console.log(lead);
        this._leads.push(lead);
    }
}