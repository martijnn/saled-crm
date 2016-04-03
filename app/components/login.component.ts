import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AuthService} from "../services/auth.service";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
@Component({
    template: `
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui huge white header">
          <div class="content">
            Inloggen
          </div>
        </h2>
        <form class="ui large form" [ngFormModel]="loginForm">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" ngControl="email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" ngControl="password">
              </div>
            </div>
            <div class="ui fluid large teal submit button" (click)="onSubmit()">Login</div>
            <div *ngIf="error">{{error}}</div>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          Nieuw? <a [routerLink]="['Signup']">Klik hier om je aan te melden.</a>
        </div>
      </div>
    </div>
    `,
    styles: [`
        .grid {
          height: 100%;
        }
        .column {
          max-width: 450px;
        }
        .content {
          color: white;
        }
    `
    ],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES]
})
export class LoginComponent {
    error: string;
    loginForm: ControlGroup;

    constructor(private _authService: AuthService, private _router: Router, _fb: FormBuilder) {
        this.loginForm = _fb.group({
            email: new Control("", Validators.compose([Validators.required])),
            password: new Control("", Validators.compose([Validators.required]))
        });
    }

    onSubmit() {
        // this._authService.login("john", "angualr2express")
        this._authService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                (loggedin: boolean) => {
                    if (loggedin) {
                        this._router.navigate(["Leads"]);
                    } else {
                        this.error = "Ongeldige login";
                    }
                },
                (err: any) => console.log(err),
                () => console.log("Submit completed")
            );
    }

}
