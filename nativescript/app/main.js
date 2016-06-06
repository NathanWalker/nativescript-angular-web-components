"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require("nativescript-angular/application");
var router_1 = require("nativescript-angular/router");
var http_1 = require("@angular/http");
var nativescript_ng2_magic_1 = require("nativescript-ng2-magic");
nativescript_ng2_magic_1.MagicService.ROUTER_DIRECTIVES = router_1.NS_ROUTER_DIRECTIVES;
// import your root component here
var _1 = require("./app/");
application_1.nativeScriptBootstrap(_1.AppComponent, [router_1.NS_ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS], { startPageActionBarHidden: false });
//# sourceMappingURL=main.js.map