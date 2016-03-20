import {Observable} from "rxjs/Observable";

export class AuthService {
    private loggedIn = false;

    constructor() {
        this.loggedIn = false;
    }

    login(email, password) {
        this.loggedIn = true;
        console.log('Login submitted succesfully');
    }

    logout() {
        this.loggedIn = false;
        console.log('Logged out succesfully');
    }

    check() {
        return Observable.of(this.loggedIn);
    }
    
}