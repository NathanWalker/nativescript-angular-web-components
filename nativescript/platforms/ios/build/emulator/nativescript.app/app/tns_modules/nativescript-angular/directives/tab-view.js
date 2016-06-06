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
var core_1 = require("@angular/core");
var tab_view_1 = require("ui/tab-view");
var TabViewDirective = (function () {
    function TabViewDirective(element) {
        this.element = element;
        this.tabView = element.nativeElement;
    }
    Object.defineProperty(TabViewDirective.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._selectedIndex = value;
            if (this.viewInitialized) {
                this.tabView.selectedIndex = this._selectedIndex;
            }
        },
        enumerable: true,
        configurable: true
    });
    TabViewDirective.prototype.ngAfterViewInit = function () {
        this.viewInitialized = true;
        this.tabView.selectedIndex = this._selectedIndex;
    };
    TabViewDirective = __decorate([
        core_1.Directive({
            selector: 'TabView',
            inputs: ['selectedIndex']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TabViewDirective);
    return TabViewDirective;
}());
exports.TabViewDirective = TabViewDirective;
var TabViewItemDirective = (function () {
    function TabViewItemDirective(owner, templateRef, viewContainer) {
        this.owner = owner;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    TabViewItemDirective.prototype.ngOnInit = function () {
        this.item = new tab_view_1.TabViewItem();
        this.item.title = this.config.title;
        var viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        //Filter out text nodes, etc
        var realViews = viewRef.rootNodes.filter(function (node) {
            return node.nodeName && node.nodeName !== '#text';
        });
        if (realViews.length > 0) {
            this.item.view = realViews[0];
            var newItems = (this.owner.tabView.items || []).concat([this.item]);
            this.owner.tabView.items = newItems;
        }
    };
    __decorate([
        core_1.Input('tabItem'), 
        __metadata('design:type', Object)
    ], TabViewItemDirective.prototype, "config", void 0);
    TabViewItemDirective = __decorate([
        core_1.Directive({
            selector: '[tabItem]'
        }), 
        __metadata('design:paramtypes', [TabViewDirective, core_1.TemplateRef, core_1.ViewContainerRef])
    ], TabViewItemDirective);
    return TabViewItemDirective;
}());
exports.TabViewItemDirective = TabViewItemDirective;
//# sourceMappingURL=tab-view.js.map