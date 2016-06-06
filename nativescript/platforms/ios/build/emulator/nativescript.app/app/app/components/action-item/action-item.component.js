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
var _1 = require('../button/');
var ActionItemComponent = (function () {
    function ActionItemComponent(el) {
        this.el = el;
    }
    ActionItemComponent.prototype.ngOnInit = function () {
        if (this.position === 'right') {
            var cls = 'btn-right';
            var currentClassName = this.el.nativeElement.className;
            this.el.nativeElement.className = currentClassName ? [currentClassName, cls].join(' ') : cls;
        }
    };
    __decorate([
        core_1.Input('ios.position'), 
        __metadata('design:type', String)
    ], ActionItemComponent.prototype, "position", void 0);
    ActionItemComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ActionItem',
            templateUrl: 'action-item.component.html',
            styleUrls: ['action-item.component.css'],
            directives: [_1.ButtonComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ActionItemComponent);
    return ActionItemComponent;
}());
exports.ActionItemComponent = ActionItemComponent;
//# sourceMappingURL=action-item.component.js.map