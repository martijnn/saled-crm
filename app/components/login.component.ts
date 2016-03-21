import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {AuthService} from "../services/auth.service";
@Component({
    template: `
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui huge white header">
          <div class="content">
            Inloggen
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" #email>
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" #password>
              </div>
            </div>
            <div class="ui fluid large teal submit button" (click)="onSubmit(email, password)">Login</div>
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
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent {

    constructor(private authService: AuthService, private router: Router) {
    }

    onSubmit(email, password) {
        this.authService.login(email, password)
            .subscribe((loggedin: boolean) => {
                if (loggedin)
                    this.router.navigate(['Leads'])
            });
    }

}
