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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_1 = require("platform");
var platform_providers_1 = require("../platform-providers");
var AndroidFilterComponent = (function () {
    function AndroidFilterComponent(device) {
        this.show = (device.os === platform_1.platformNames.android);
    }
    AndroidFilterComponent = __decorate([
        core_1.Component({
            selector: "android",
            template: "<ng-content *ngIf=\"show\"></ng-content>",
        }),
        __param(0, core_1.Inject(platform_providers_1.DEVICE)), 
        __metadata('design:paramtypes', [Object])
    ], AndroidFilterComponent);
    return AndroidFilterComponent;
}());
exports.AndroidFilterComponent = AndroidFilterComponent;
var IosFilterComponent = (function () {
    function IosFilterComponent(device) {
        this.show = (device.os === platform_1.platformNames.ios);
    }
    IosFilterComponent = __decorate([
        core_1.Component({
            selector: "ios",
            template: "<ng-content *ngIf=\"show\"></ng-content>",
        }),
        __param(0, core_1.Inject(platform_providers_1.DEVICE)), 
        __metadata('design:paramtypes', [Object])
    ], IosFilterComponent);
    return IosFilterComponent;
}());
exports.IosFilterComponent = IosFilterComponent;
//# sourceMappingURL=platform-filters.js.map