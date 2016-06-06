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
var _1 = require('../action-item/');
var ActionBarComponent = (function () {
    function ActionBarComponent() {
    }
    ActionBarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ActionBarComponent.prototype, "title", void 0);
    ActionBarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ActionBar',
            templateUrl: 'action-bar.component.html',
            styleUrls: ['action-bar.component.css'],
            directives: [_1.ActionItemComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], ActionBarComponent);
    return ActionBarComponent;
}());
exports.ActionBarComponent = ActionBarComponent;
//# sourceMappingURL=action-bar.component.js.map