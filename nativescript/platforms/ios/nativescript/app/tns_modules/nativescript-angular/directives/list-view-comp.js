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
var collection_1 = require('@angular/core/src/facade/collection');
var observable_array_1 = require('data/observable-array');
var layout_base_1 = require('ui/layouts/layout-base');
var NG_VIEW = "_ngViewRef";
var ListItemContext = (function () {
    function ListItemContext($implicit, item, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return ListItemContext;
}());
exports.ListItemContext = ListItemContext;
var ListViewComponent = (function () {
    function ListViewComponent(_elementRef, _iterableDiffers, _cdr) {
        this._elementRef = _elementRef;
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
        this.setupItemView = new core_1.EventEmitter();
        this.doCheckDelay = 5;
        this.listView = _elementRef.nativeElement;
    }
    Object.defineProperty(ListViewComponent.prototype, "items", {
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && collection_1.isListLikeIterable(value)) {
                this._differ = this._iterableDiffers.find(this._items).create(this._cdr, function (index, item) { return item; });
            }
            this.listView.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    ListViewComponent.prototype.onItemLoading = function (args) {
        if (!this.itemTemplate) {
            return;
        }
        var index = args.index;
        var items = args.object.items;
        var currentItem = typeof (items.getItem) === "function" ? items.getItem(index) : items[index];
        var viewRef;
        if (args.view) {
            console.log("ListView.onItemLoading: " + index + " - Reusing exisiting view");
            viewRef = args.view[NG_VIEW];
        }
        else {
            console.log("ListView.onItemLoading: " + index + " - Creating view from template");
            viewRef = this.loader.createEmbeddedView(this.itemTemplate, new ListItemContext(), 0);
            args.view = getSingleViewFromViewRef(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
    };
    ListViewComponent.prototype.setupViewRef = function (viewRef, data, index) {
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = index;
        context.even = (index % 2 == 0);
        context.odd = !context.even;
        this.setupItemView.next({ view: viewRef, data: data, index: index, context: context });
    };
    ListViewComponent.prototype.ngDoCheck = function () {
        var _this = this;
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(function () {
            clearTimeout(_this.timerId);
            if (_this._differ) {
                var changes = _this._differ.diff(_this._items);
                if (changes) {
                    _this.listView.refresh();
                }
            }
        }, this.doCheckDelay);
    };
    __decorate([
        core_1.ViewChild('loader', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], ListViewComponent.prototype, "loader", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ListViewComponent.prototype, "setupItemView", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef), 
        __metadata('design:type', core_1.TemplateRef)
    ], ListViewComponent.prototype, "itemTemplate", void 0);
    __decorate([
        core_1.HostListener("itemLoading", ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], ListViewComponent.prototype, "onItemLoading", null);
    ListViewComponent = __decorate([
        core_1.Component({
            selector: 'ListView',
            template: "\n        <DetachedContainer>\n            <Placeholder #loader></Placeholder>\n        </DetachedContainer>",
            inputs: ['items']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.IterableDiffers, core_1.ChangeDetectorRef])
    ], ListViewComponent);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;
function getSingleViewFromViewRef(viewRef) {
    var getSingleViewRecursive = function (nodes, nestLevel) {
        var actualNodes = nodes.filter(function (n) { return !!n && n.nodeName !== "#text"; });
        if (actualNodes.length === 0) {
            throw new Error("No suitable views found in list template! Nesting level: " + nestLevel);
        }
        else if (actualNodes.length > 1) {
            throw new Error("More than one view found in list template! Nesting level: " + nestLevel);
        }
        else {
            if (actualNodes[0]) {
                var parentLayout = actualNodes[0].parent;
                if (parentLayout instanceof layout_base_1.LayoutBase) {
                    parentLayout.removeChild(actualNodes[0]);
                }
                return actualNodes[0];
            }
            else {
                return getSingleViewRecursive(actualNodes[0].children, nestLevel + 1);
            }
        }
    };
    return getSingleViewRecursive(viewRef.rootNodes, 0);
}
//# sourceMappingURL=list-view-comp.js.map