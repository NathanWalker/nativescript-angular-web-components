"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var common_2 = require("./common");
/**
 * The NSRouterLink directive lets you link to specific parts of your app.
 *
 * Consider the following route configuration:
 * ```
 * @RouteConfig([
 *   { path: '/user', component: UserCmp, as: 'User' }
 * ]);
 * class MyComp {}
 * ```
 *
 * When linking to this `User` route, you can write:
 *
 * ```
 * <a [nsRouterLink]="['./User']">link to user component</a>
 * ```
 *
 * RouterLink expects the value to be an array of route names, followed by the params
 * for that level of routing. For instance `['/Team', {teamId: 1}, 'User', {userId: 2}]`
 * means that we want to generate a link for the `Team` route with params `{teamId: 1}`,
 * and with a child route `User` with params `{userId: 2}`.
 *
 * The first route name should be prepended with `/`, `./`, or `../`.
 * If the route begins with `/`, the router will look up the route from the root of the app.
 * If the route begins with `./`, the router will instead look in the current component's
 * children for the route. And if the route begins with `../`, the router will look at the
 * current component's parent.
 */
var NSRouterLink = (function () {
    function NSRouterLink(_router, _location) {
        this._router = _router;
        this._location = _location;
    }
    Object.defineProperty(NSRouterLink.prototype, "isRouteActive", {
        get: function () { return this._router.isRouteActive(this._navigationInstruction); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSRouterLink.prototype, "params", {
        set: function (changes) {
            this._routeParams = changes;
            this._navigationInstruction = this._router.generate(this._routeParams);
        },
        enumerable: true,
        configurable: true
    });
    NSRouterLink.prototype.onTap = function () {
        common_2.log("NSRouterLink onTap() instruction: " + JSON.stringify(this._navigationInstruction));
        this._router.navigateByInstruction(this._navigationInstruction);
    };
    NSRouterLink = __decorate([
        core_1.Directive({
            selector: '[nsRouterLink]',
            inputs: ['params: nsRouterLink'],
            host: {
                '(tap)': 'onTap()',
                '[class.router-link-active]': 'isRouteActive'
            }
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, common_1.Location])
    ], NSRouterLink);
    return NSRouterLink;
}());
exports.NSRouterLink = NSRouterLink;
//# sourceMappingURL=ns-router-link.js.map