import {Component} from "angular2/core";
import {HeaderComponent} from "./header.component";
import {HomeComponent} from "./home.component";
import {FooterComponent} from "./footer.component";
import {RouteConfig} from "angular2/router";
import {LoginComponent} from "./login.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {SidebarComponent} from "./sidebar.component";
import {SignupComponent} from "./signup.component";
import {LeadsComponent} from "./leads.component";

@Component({
    selector: "app",
    template: `
    <body class="wrapper">
        <sl-sidebar></sl-sidebar>

        <sl-header></sl-header>
        <router-outlet></router-outlet>
        <sl-footer></sl-footer>

    </body>
    `,
    directives: [FooterComponent, HeaderComponent, HomeComponent, LoginComponent, ROUTER_DIRECTIVES, SidebarComponent],
    styles: [`
    .wrapper {
        background: #348F50; /* fallback for old browsers */
        background: -webkit-linear-gradient(to left, #348F50 , #56B4D3); /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to left, #348F50 , #56B4D3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    `]
})
@RouteConfig([
    {path: "/", name: "Home", component: HomeComponent},
    {path: "/login", name: "Login", component: LoginComponent},
    {path: "/sign-up", name: "Signup", component: SignupComponent},
    {path: "/leads/...", name: "Leads", component: LeadsComponent}
])
export class AppComponent { }
