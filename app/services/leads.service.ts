import {Injectable} from "angular2/core";
import {Lead} from "../models/lead.model";
import {Http, RequestOptions, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import "rxjs/add/operator/share";
import "rxjs/add/operator/startWith";

@Injectable()
export class LeadsService {

    leads$: Observable<Lead[]>;
    private _leadsObserver: Observer<Lead[]>;
    private _dataStore: {leads: Lead[]};

    constructor(private _http: Http) {
        this._dataStore = {leads: []};

        this.leads$ = new Observable(observer => {this._leadsObserver = observer; })
            .startWith(this._dataStore.leads)
            .share();
    };

    loadLeads() {
        let headers: Headers = new Headers({"Auth": localStorage.getItem("jwt"), "Content-type": "application/json"});
        let opts: RequestOptions = new RequestOptions({headers: headers});

        this._http.get("api/leads", opts)
            .map(response => response.json())
            .subscribe(data => {
                this._dataStore.leads = data;
                this._leadsObserver.next(this._dataStore.leads);
            }, error => console.log("Could not load leads."));
    }

    createLead(lead: Lead) {
        let headers: Headers = new Headers({"Auth": localStorage.getItem("jwt"), "Content-type": "application/json"});
        let opts: RequestOptions = new RequestOptions({headers: headers});

        this._http.post("api/leads/create", JSON.stringify({lead: lead}), opts)
            .map(response => response.json()).subscribe(data => {
            this._dataStore.leads.push(data);
            this._leadsObserver.next(this._dataStore.leads);
        }, error => console.log("Could not create lead."));
    }

    loadLead(leadId) {
        return this._dataStore.leads.find(lead => lead.id === leadId);
    }

    updateLead(lead: Lead) {
        let headers: Headers = new Headers({"Auth": localStorage.getItem("jwt"), "Content-type": "application/json"});
        let opts: RequestOptions = new RequestOptions({headers: headers});

        this._http.put("api/leads/update", JSON.stringify({lead: lead}), opts)
            .map(response => response.json())
            .subscribe(data => {
                console.log("Lead saved: " + JSON.stringify(data));
            });
    }

}
