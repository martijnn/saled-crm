import {AuthService} from "../services/auth.service";
import {LocationStrategy, HashLocationStrategy} from "angular2/router";
import {provide} from "angular2/core";
export const GLOBAL_PROVIDERS = [
    AuthService,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
];
