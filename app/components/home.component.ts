import {Component} from "angular2/core";
@Component({
    template: `
    <div class="ui container">
        <h1 class="ui center aligned icon header">
          <i class="circular users icon"></i>
          SALED CRM
        </h1>
    </div>
    `,
    styles: [`
    h1 {
        text-align: center;
        color: white;
    }
    .ui.header {
        color: white;
    }
    `]
})
export class HomeComponent { }
