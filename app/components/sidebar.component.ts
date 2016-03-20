import {Component} from "angular2/core";
@Component({
    selector: 'sl-sidebar',
    template: `
    <div class="ui left vertical menu sidebar">
        <a class="item">
          Item 1
        </a>
        <a class="item">
          Item 2
        </a>
        <a class="item">
          Item 3
        </a>
    </div>
    `
})
export class SidebarComponent { }
