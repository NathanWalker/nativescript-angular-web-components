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
var label_1 = require('../../label');
var image_1 = require('../../image');
var StackLayoutComponent = (function () {
    function StackLayoutComponent() {
    }
    StackLayoutComponent.prototype.ngOnInit = function () {
    };
    StackLayoutComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'StackLayout',
            templateUrl: 'stack-layout.component.html',
            styleUrls: ['stack-layout.component.css'],
            directives: [label_1.LabelComponent, image_1.ImageComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], StackLayoutComponent);
    return StackLayoutComponent;
}());
exports.StackLayoutComponent = StackLayoutComponent;
//# sourceMappingURL=stack-layout.component.js.map