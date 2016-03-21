import {bootstrap}    from 'angular2/platform/browser'
import {APP_BASE_HREF} from "angular2/router";
import {provide, ComponentRef} from "angular2/core";
import {ROUTER_PROVIDERS} from "angular2/router";
import {AppComponent} from './components/app.component'
import {HTTP_PROVIDERS} from "angular2/http";
import {AuthService} from "./services/auth.service";
import {appInjector} from "./constants/app-injector";
import 'rxjs/Rx';

bootstrap(AppComponent, [
    AuthService,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, {useValue : '/' })
]).then((appRef: ComponentRef) => {
    appInjector(appRef.injector);
});
