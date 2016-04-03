import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions} from "angular2/http";
import "rxjs/operator/map";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {
    public data: string;
    private _loggedIn: boolean;
    private _loginStateSource = new Subject<Boolean>();
    public loginState$ = this._loginStateSource.asObservable();

    constructor(public http: Http) {
        this._loggedIn = false;
    }

    signup(email: string, password: string) {
        let headers: Headers = new Headers({"Content-type": "application/json"});
        let opts = new RequestOptions({headers: headers});
        return Observable.create((observer) => {
            this.http.post("/login/signup", JSON.stringify({email: email, password: password}), opts)
                .map((res: any) => res.json())
                .subscribe(
                    (res: any) => {
                        if (res.hasOwnProperty("jwt")) {
                            localStorage.setItem("jwt", res.jwt);
                            this._loginStateSource.next(true);
                            this._loggedIn = true;
                        } else {
                            this._loggedIn = false;
                        }
                        observer.next(this._loggedIn);
                    },
                    (err: any) => console.log(err),
                    () => observer.complete()
                );
        });
    }

    login(email: string, password: string) {
        let headers: Headers = new Headers({"Content-type": "application/json"});
        let opts = new RequestOptions({headers: headers});
        return Observable.create((observer) => {
            this.http.post("/login", JSON.stringify({email: email, password: password}), opts)
                .map(res => res.json())
                .subscribe(
                    (res: any) => {
                        if (res.hasOwnProperty("jwt")) {
                            localStorage.setItem("jwt", res.jwt);
                            this._loginStateSource.next(true);
                            this._loggedIn = true;
                        } else {
                            this._loggedIn = false;
                        }
                        observer.next(this._loggedIn);
                    },
                    err => {
                        this._loggedIn = false;
                        observer.error(err);
                    },
                    () => observer.complete()
                );
        });
    }

    logout(): Observable<Boolean> {
        localStorage.removeItem("jwt");
        this._loginStateSource.next(false);
        this._loggedIn = false;
        return Observable.of(this._loggedIn);
    }

    check(): Observable<Boolean> {
        return Observable.of(this._loggedIn);
    }
}
