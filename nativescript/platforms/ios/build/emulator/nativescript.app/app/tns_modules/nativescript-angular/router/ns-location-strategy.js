"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('@angular/common');
var common_2 = require("./common");
var frame_1 = require("ui/frame");
var NSLocationStrategy = (function (_super) {
    __extends(NSLocationStrategy, _super);
    function NSLocationStrategy() {
        _super.apply(this, arguments);
        this.states = new Array();
        this.popStateCallbacks = new Array();
        this._isPageNavigationgBack = false;
        this._isPageNavigatingForward = false;
    }
    NSLocationStrategy.prototype.path = function () {
        common_2.log("NSLocationStrategy.path()");
        var state = this.peekState();
        return state ? state.url : "/";
    };
    NSLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        common_2.log("NSLocationStrategy.prepareExternalUrl() internal: " + internal);
        return internal;
    };
    NSLocationStrategy.prototype.pushState = function (state, title, url, queryParams) {
        common_2.log("NSLocationStrategy.pushState state: " + state + ", title: " + title + ", url: " + url + ", queryParams: " + queryParams);
        var isNewPage = this._isPageNavigatingForward;
        this._isPageNavigatingForward = false;
        this.states.push({
            state: state,
            title: title,
            url: url,
            queryParams: queryParams,
            isPageNavigation: isNewPage
        });
    };
    NSLocationStrategy.prototype.replaceState = function (state, title, url, queryParams) {
        common_2.log("NSLocationStrategy.replaceState state: " + state + ", title: " + title + ", url: " + url + ", queryParams: " + queryParams);
        throw new Error("Not implemented");
    };
    NSLocationStrategy.prototype.forward = function () {
        common_2.log("NSLocationStrategy.forward");
        throw new Error("Not implemented");
    };
    NSLocationStrategy.prototype.back = function () {
        if (this._isPageNavigationgBack) {
            // We are navigating to the previous page 
            // clear the stack until we get to a page navigation state
            var state = this.states.pop();
            var count = 1;
            while (!state.isPageNavigation) {
                state = this.states.pop();
                count++;
            }
            common_2.log("NSLocationStrategy.back() while navigating back. States popped: " + count);
            this.callPopState(state, true);
        }
        else {
            var state = this.peekState();
            if (state.isPageNavigation) {
                // This was a page navigation - so navigate through frame.
                common_2.log("NSLocationStrategy.back() while not navigating back but top state is page - will call frame.goback()");
                frame_1.topmost().goBack();
            }
            else {
                // Nested navigation - just pop the state
                common_2.log("NSLocationStrategy.back() while not navigating back but top state is not page - just pop");
                this.callPopState(this.states.pop(), true);
            }
        }
    };
    NSLocationStrategy.prototype.onPopState = function (fn) {
        common_2.log("NSLocationStrategy.onPopState");
        this.popStateCallbacks.push(fn);
    };
    NSLocationStrategy.prototype.getBaseHref = function () {
        common_2.log("NSLocationStrategy.getBaseHref()");
        return "";
    };
    NSLocationStrategy.prototype.callPopState = function (state, pop) {
        if (pop === void 0) { pop = true; }
        var change = { url: state.url, pop: pop };
        for (var _i = 0, _a = this.popStateCallbacks; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn(change);
        }
    };
    NSLocationStrategy.prototype.peekState = function () {
        if (this.states.length > 0) {
            return this.states[this.states.length - 1];
        }
        return null;
    };
    // Methods for syncing with page navigation in PageRouterOutlet
    NSLocationStrategy.prototype.beginBackPageNavigation = function () {
        common_2.log("NSLocationStrategy.startGoBack()");
        if (this._isPageNavigationgBack) {
            throw new Error("Calling startGoBack while going back.");
        }
        this._isPageNavigationgBack = true;
    };
    NSLocationStrategy.prototype.finishBackPageNavigation = function () {
        common_2.log("NSLocationStrategy.finishBackPageNavigation()");
        if (!this._isPageNavigationgBack) {
            throw new Error("Calling endGoBack while not going back.");
        }
        this._isPageNavigationgBack = false;
    };
    NSLocationStrategy.prototype.isPageNavigatingBack = function () {
        return this._isPageNavigationgBack;
    };
    NSLocationStrategy.prototype.navigateToNewPage = function () {
        common_2.log("NSLocationStrategy.navigateToNewPage()");
        if (this._isPageNavigatingForward) {
            throw new Error("Calling navigateToNewPage while already navigating to new page.");
        }
        this._isPageNavigatingForward = true;
    };
    return NSLocationStrategy;
}(common_1.LocationStrategy));
exports.NSLocationStrategy = NSLocationStrategy;
//# sourceMappingURL=ns-location-strategy.js.map