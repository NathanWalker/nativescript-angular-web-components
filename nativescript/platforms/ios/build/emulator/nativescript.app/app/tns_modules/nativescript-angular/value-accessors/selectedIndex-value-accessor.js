"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var control_value_accessor_1 = require('@angular/common/src/forms/directives/control_value_accessor');
var lang_1 = require('@angular/core/src/facade/lang');
var base_value_accessor_1 = require('./base-value-accessor');
var SELECTED_INDEX_VALUE_ACCESSOR = core_1.provide(control_value_accessor_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return SelectedIndexValueAccessor; }), multi: true });
/**
 * The accessor for setting a selectedIndex and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <SegmentedBar [(ngModel)]='model.test'>
 *  ```
 */
var SelectedIndexValueAccessor = (function (_super) {
    __extends(SelectedIndexValueAccessor, _super);
    function SelectedIndexValueAccessor(elementRef) {
        _super.call(this, elementRef.nativeElement);
        this.onTouched = function () { };
    }
    SelectedIndexValueAccessor.prototype.writeValue = function (value) {
        var normalizedValue;
        if (lang_1.isBlank(value)) {
            normalizedValue = 0;
        }
        else {
            if (lang_1.isNumber(value)) {
                normalizedValue = value;
            }
            else {
                var parsedValue = parseInt(value);
                normalizedValue = isNaN(parsedValue) ? 0 : parsedValue;
            }
        }
        this._normalizedValue = Math.round(normalizedValue);
        if (this.viewInitialized) {
            this.view.selectedIndex = this._normalizedValue;
        }
    };
    SelectedIndexValueAccessor.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        this.view.selectedIndex = this._normalizedValue;
    };
    SelectedIndexValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    SelectedIndexValueAccessor = __decorate([
        core_1.Directive({
            selector: 'SegmentedBar[ngModel], ListPicker[ngModel], TabView[ngModel]',
            host: { '(selectedIndexChange)': 'onChange($event.value)' },
            bindings: [SELECTED_INDEX_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SelectedIndexValueAccessor);
    return SelectedIndexValueAccessor;
}(base_value_accessor_1.BaseValueAccessor));
exports.SelectedIndexValueAccessor = SelectedIndexValueAccessor;
//# sourceMappingURL=selectedIndex-value-accessor.js.map