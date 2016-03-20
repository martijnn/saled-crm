import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    template: `
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui huge white header">
          <div class="content">
            Aanmelden
          </div>
        </h2>
        <form class="ui large form">
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mailadres">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Wachtwoord">
              </div>
            </div>
            <div class="ui fluid large teal submit button">Aanmelden</div>
          </div>

          <div class="ui error message"></div>

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
    directives: [ROUTER_DIRECTIVES]
})
export class SignupComponent { }
