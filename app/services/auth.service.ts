import {Observable} from "rxjs/Observable";
import {Injectable, EventEmitter} from "angular2/core";

@Injectable()
export class AuthService {
    private _loggedIn: boolean;
    public loginState$: EventEmitter<boolean>;

    constructor() {
        this.loginState$ = new EventEmitter();
        this._loggedIn = false;
    }

    login(email: string, password: string) {
        this.loginState$.emit(true);
        this._loggedIn = true;
        return Observable.of(this._loggedIn);
    }

    logout() {
        this.loginState$.emit(false);
        this._loggedIn = false;
        return Observable.of(this._loggedIn);
    }

    check() {
        return Observable.of(this._loggedIn);
    }
    
}