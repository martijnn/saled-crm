import {LeadsService} from "../services/leads.service";
import {provide} from "angular2/core";
import {Http} from "angular2/http";

let leadServiceFactory = (http: Http) => {
    // , authService: AuthService
    // return new LeadsService(http, authService);
    return new LeadsService(http);
};

export let LeadServiceProvider =
    provide(LeadsService, {
    useFactory: leadServiceFactory
    // deps: [AuthService]
});
