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
var ButtonComponent = (function () {
    function ButtonComponent(el) {
        this.el = el;
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.el.nativeElement.setAttribute('type', 'submit');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ButtonComponent.prototype, "text", void 0);
    ButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Button',
            templateUrl: 'button.component.html',
            styleUrls: ['button.component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ButtonComponent);
    return ButtonComponent;
}());
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.component.js.map