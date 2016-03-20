import {Injectable} from "angular2/core";
import {Lead} from "../models/lead.model";

@Injectable()
export class LeadsService {

    private _leads: Array<Lead> = [
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

    GetAllLeads(){
        return this._leads;
    }

}