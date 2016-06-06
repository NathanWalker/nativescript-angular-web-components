"use strict";
var ns_router_link_1 = require('./ns-router-link');
var page_router_outlet_1 = require('./page-router-outlet');
var ns_location_strategy_1 = require('./ns-location-strategy');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var common_2 = require("./common");
exports.NS_ROUTER_PROVIDERS = [
    router_deprecated_1.ROUTER_PROVIDERS,
    ns_location_strategy_1.NSLocationStrategy,
    core_1.provide(common_1.LocationStrategy, { useExisting: ns_location_strategy_1.NSLocationStrategy }),
];
exports.NS_ROUTER_DIRECTIVES = [
    ns_router_link_1.NSRouterLink,
    page_router_outlet_1.PageRouterOutlet
];
exports.routerTraceCategory = common_2.CATEGORY;
//# sourceMappingURL=ns-router.js.map