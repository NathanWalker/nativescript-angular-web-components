// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";
import {NS_ROUTER_PROVIDERS, NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {HTTP_PROVIDERS} from "@angular/http";
import {MagicService} from "nativescript-ng2-magic";
MagicService.ROUTER_DIRECTIVES = NS_ROUTER_DIRECTIVES;

// import your root component here
import {AppComponent} from "./app/";

nativeScriptBootstrap(AppComponent, [NS_ROUTER_PROVIDERS, HTTP_PROVIDERS], { startPageActionBarHidden: false });
