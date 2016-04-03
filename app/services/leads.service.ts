import {Injectable} from "angular2/core";
import {Lead} from "../models/lead.model";
import {Http, RequestOptions, Headers} from "angular2/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LeadsService {

    private _leadAddedSource = new Subject<Lead>();
    public leadAdded$ = this._leadAddedSource.asObservable();

    constructor(private http: Http) {}

    getAllLeads() {
        let headers: Headers = new Headers({"Auth": localStorage.getItem("jwt"), "Content-type": "application/json"});
        let opts: RequestOptions = new RequestOptions({headers: headers});

        return this.http.get("api/leads", opts)
            .map((res: any) => res.json());
    }

    addLead(lead: Lead) {
        let headers: Headers = new Headers({"Auth": localStorage.getItem("jwt"), "Content-type": "application/json"});
        let opts: RequestOptions = new RequestOptions({headers: headers});

        this.http.post("api/leads/create", JSON.stringify({lead: lead}), opts)
            .map(res => res.json())
            .subscribe(res => console.log(res));

        this._leadAddedSource.next(lead);
    }
}
