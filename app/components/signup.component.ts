import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder, Validators, ControlGroup, FORM_DIRECTIVES, Control} from "angular2/common";
@Component({
    template: `
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui huge white header">
          <div class="content">
            Aanmelden
          </div>
        </h2>
        <form class="ui large form" [ngFormModel]="signupForm">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="email" name="email" placeholder="E-mailadres" ngControl="email"> 
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Wachtwoord" ngControl="password"> 
              </div>
            </div>
            <div class="ui fluid large teal submit button" type="submit" (click)="onSubmit()">Aanmelden</div>
          </div>

          <div class="ui error message"></div>
          <div *ngIf="error">{{error}}</div>
        </form>

        <div class="ui message">
          Heb je al een account? <a [routerLink]="['Login']">Klik hier om in te loggen</a>
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
export class SignupComponent {
    error: string;
    signupForm: ControlGroup;

    constructor(private _authService: AuthService, private _router: Router, private _fb: FormBuilder) {

        this.signupForm = _fb.group({
            email: new Control("", Validators.compose([Validators.required])),
            password: new Control("", Validators.compose([Validators.required]))
        });
    }

    onSubmit() {
        this._authService.signup(this.signupForm.value.email, this.signupForm.value.password)
            .subscribe(
                (loggedin: boolean) => {
                    if (loggedin) {
                        this._router.navigate(["Leads"]);
                    } else {
                        this.error = "Er is iets mis gegaan bij het aanmelden.";
                    }
                },
                err => console.log(err),
                () => console.log("Submit completed")
            );
        event.preventDefault();
    }

}
