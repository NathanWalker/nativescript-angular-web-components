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
/**
 * Wrapper component used for loading components when navigating
 * It uses DetachedContainer as selector so that it is containerRef is not attached to the visual tree.
 */
var DetachedLoader = (function () {
    function DetachedLoader(loader) {
        this.loader = loader;
        this.viewLoaded = false;
        this.pendingLoads = [];
    }
    DetachedLoader.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.viewLoaded = true;
        this.pendingLoads.forEach(function (loadEntry) {
            _this.loadInLocation(loadEntry.componentType).then(function (loadedRef) {
                loadEntry.resolveCallback(loadedRef);
            });
        });
    };
    DetachedLoader.prototype.loadInLocation = function (componentType) {
        return this.loader.loadNextToLocation(componentType, this.containerRef);
    };
    DetachedLoader.prototype.loadComponent = function (componentType) {
        var _this = this;
        // Check if called before placeholder is initialized.
        // Delay load if so.
        if (this.viewLoaded) {
            return this.loadInLocation(componentType);
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.pendingLoads.push({
                    componentType: componentType,
                    resolveCallback: resolve
                });
            });
        }
    };
    __decorate([
        core_1.ViewChild('loader', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], DetachedLoader.prototype, "containerRef", void 0);
    DetachedLoader = __decorate([
        core_1.Component({
            selector: 'DetachedContainer',
            template: "<Placeholder #loader></Placeholder>"
        }), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader])
    ], DetachedLoader);
    return DetachedLoader;
}());
exports.DetachedLoader = DetachedLoader;
//# sourceMappingURL=detached-loader.js.map