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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var di_1 = require('@angular/core/src/di');
var api_1 = require('@angular/core/src/render/api');
var platform_providers_1 = require("./platform-providers");
var lang_1 = require('@angular/core/src/facade/lang');
var dom_renderer_1 = require('@angular/platform-browser/src/dom/dom_renderer');
var view_1 = require("ui/core/view");
var application = require("application");
var frame_1 = require('ui/frame');
var view_util_1 = require("./view-util");
var utils_1 = require("utils/utils");
var view_util_2 = require("./view-util");
exports.rendererTraceCategory = view_util_2.rendererTraceCategory;
var NativeScriptRootRenderer = (function () {
    function NativeScriptRootRenderer(rootView, device) {
        this._rootView = null;
        this._registeredComponents = new Map();
        this._rootView = rootView;
        this._viewUtil = new view_util_1.ViewUtil(device);
    }
    Object.defineProperty(NativeScriptRootRenderer.prototype, "rootView", {
        get: function () {
            if (!this._rootView) {
                this._rootView = frame_1.topmost().currentPage;
            }
            return this._rootView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeScriptRootRenderer.prototype, "page", {
        get: function () {
            return this.rootView.page;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NativeScriptRootRenderer.prototype, "viewUtil", {
        get: function () {
            return this._viewUtil;
        },
        enumerable: true,
        configurable: true
    });
    NativeScriptRootRenderer.prototype.renderComponent = function (componentProto) {
        var renderer = this._registeredComponents.get(componentProto.id);
        if (lang_1.isBlank(renderer)) {
            renderer = new NativeScriptRenderer(this, componentProto);
            this._registeredComponents.set(componentProto.id, renderer);
        }
        return renderer;
    };
    NativeScriptRootRenderer = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Optional()),
        __param(0, di_1.Inject(platform_providers_1.APP_ROOT_VIEW)),
        __param(1, di_1.Inject(platform_providers_1.DEVICE)), 
        __metadata('design:paramtypes', [view_1.View, Object])
    ], NativeScriptRootRenderer);
    return NativeScriptRootRenderer;
}());
exports.NativeScriptRootRenderer = NativeScriptRootRenderer;
var NativeScriptRenderer = (function (_super) {
    __extends(NativeScriptRenderer, _super);
    function NativeScriptRenderer(_rootRenderer, componentProto) {
        _super.call(this);
        this._rootRenderer = _rootRenderer;
        this.componentProto = componentProto;
        this.attrReplacer = new RegExp(utils_1.escapeRegexSymbols(dom_renderer_1.CONTENT_ATTR), "g");
        this.attrSanitizer = /-/g;
        this.rootRenderer = _rootRenderer;
        var page = this.rootRenderer.page;
        var stylesLength = componentProto.styles.length;
        this.componentProtoId = componentProto.id;
        for (var i = 0; i < stylesLength; i++) {
            this.hasComponentStyles = true;
            var cssString = componentProto.styles[i] + "";
            var realCSS = this.replaceNgAttribute(cssString, this.componentProtoId);
            application.addCss(realCSS);
        }
        view_util_1.traceLog('NativeScriptRenderer created');
    }
    Object.defineProperty(NativeScriptRenderer.prototype, "viewUtil", {
        get: function () {
            return this.rootRenderer.viewUtil;
        },
        enumerable: true,
        configurable: true
    });
    NativeScriptRenderer.prototype.replaceNgAttribute = function (input, componentId) {
        return input.replace(this.attrReplacer, "_ng_content_" + componentId.replace(this.attrSanitizer, "_"));
    };
    NativeScriptRenderer.prototype.renderComponent = function (componentProto) {
        return this._rootRenderer.renderComponent(componentProto);
    };
    NativeScriptRenderer.prototype.selectRootElement = function (selector) {
        view_util_1.traceLog('selectRootElement: ' + selector);
        var rootView = this.rootRenderer.rootView;
        rootView.nodeName = 'ROOT';
        return rootView;
    };
    NativeScriptRenderer.prototype.createViewRoot = function (hostElement) {
        view_util_1.traceLog('CREATE VIEW ROOT: ' + hostElement.nodeName);
        return hostElement;
    };
    NativeScriptRenderer.prototype.projectNodes = function (parentElement, nodes) {
        var _this = this;
        view_util_1.traceLog('NativeScriptRenderer.projectNodes');
        nodes.forEach(function (node) {
            _this.viewUtil.insertChild(parentElement, node);
        });
    };
    NativeScriptRenderer.prototype.attachViewAfter = function (anchorNode, viewRootNodes) {
        var _this = this;
        view_util_1.traceLog('NativeScriptRenderer.attachViewAfter: ' + anchorNode.nodeName + ' ' + anchorNode);
        //HACK: The anchor.templateParent precedence and child.templateParent
        //assignment are a workaround for RadSideDrawer.
        //Remove it once we ship the fix in the RadSideDrawer directives.
        var parent = (anchorNode.templateParent || anchorNode.parent);
        var insertPosition = this.viewUtil.getChildIndex(parent, anchorNode);
        viewRootNodes.forEach(function (node, index) {
            var childIndex = insertPosition + index + 1;
            //Remember the template parent in case someone moves the view element
            //before Angular attaches the next view.
            node.templateParent = parent;
            _this.viewUtil.insertChild(parent, node, childIndex);
            _this.animateNodeEnter(node);
        });
    };
    NativeScriptRenderer.prototype.detachView = function (viewRootNodes) {
        view_util_1.traceLog('NativeScriptRenderer.detachView');
        for (var i = 0; i < viewRootNodes.length; i++) {
            var node = viewRootNodes[i];
            this.viewUtil.removeChild(node.parent, node);
            this.animateNodeLeave(node);
        }
    };
    NativeScriptRenderer.prototype.animateNodeEnter = function (node) {
    };
    NativeScriptRenderer.prototype.animateNodeLeave = function (node) {
    };
    NativeScriptRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        view_util_1.traceLog("NativeScriptRenderer.destroyView");
        // Seems to be called on component dispose only (router outlet)
        //TODO: handle this when we resolve routing and navigation.
    };
    NativeScriptRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        view_util_1.traceLog("NativeScriptRenderer.setElementProperty " + renderElement + ': ' + propertyName + " = " + propertyValue);
        this.viewUtil.setProperty(renderElement, propertyName, propertyValue);
    };
    NativeScriptRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        view_util_1.traceLog("NativeScriptRenderer.setElementAttribute " + renderElement + ': ' + attributeName + " = " + attributeValue);
        return this.setElementProperty(renderElement, attributeName, attributeValue);
    };
    NativeScriptRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        view_util_1.traceLog("NativeScriptRenderer.setElementClass " + className + " - " + isAdd);
        if (isAdd) {
            this.viewUtil.addClass(renderElement, className);
        }
        else {
            this.viewUtil.removeClass(renderElement, className);
        }
    };
    NativeScriptRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        this.viewUtil.setStyleProperty(renderElement, styleName, styleValue);
    };
    /**
    * Used only in debug mode to serialize property changes to comment nodes,
    * such as <template> placeholders.
    */
    NativeScriptRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        view_util_1.traceLog('NativeScriptRenderer.setBindingDebugInfo: ' + renderElement + ', ' + propertyName + ' = ' + propertyValue);
    };
    NativeScriptRenderer.prototype.setElementDebugInfo = function (renderElement, info) {
        view_util_1.traceLog('NativeScriptRenderer.setElementDebugInfo: ' + renderElement);
    };
    /**
    * Calls a method on an element.
    */
    NativeScriptRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        view_util_1.traceLog("NativeScriptRenderer.invokeElementMethod " + methodName + " " + args);
    };
    NativeScriptRenderer.prototype.setText = function (renderNode, text) {
        view_util_1.traceLog("NativeScriptRenderer.setText");
    };
    NativeScriptRenderer.prototype.createTemplateAnchor = function (parentElement) {
        view_util_1.traceLog('NativeScriptRenderer.createTemplateAnchor');
        return this.viewUtil.createTemplateAnchor(parentElement);
    };
    NativeScriptRenderer.prototype.createElement = function (parentElement, name) {
        var _this = this;
        view_util_1.traceLog('NativeScriptRenderer.createElement: ' + name + ' parent: ' + parentElement + ', ' + (parentElement ? parentElement.nodeName : 'null'));
        return this.viewUtil.createView(name, parentElement, function (view) {
            // Set an attribute to the view to scope component-specific css.
            // The property name is pre-generated by Angular.
            if (_this.hasComponentStyles) {
                var cssAttribute = _this.replaceNgAttribute(dom_renderer_1.CONTENT_ATTR, _this.componentProtoId);
                view[cssAttribute] = true;
            }
        });
    };
    NativeScriptRenderer.prototype.createText = function (parentElement, value) {
        view_util_1.traceLog('NativeScriptRenderer.createText');
        return this.viewUtil.createText(value);
        ;
    };
    NativeScriptRenderer.prototype.listen = function (renderElement, eventName, callback) {
        view_util_1.traceLog('NativeScriptRenderer.listen: ' + eventName);
        var zonedCallback = global.Zone.current.wrap(callback);
        renderElement.on(eventName, zonedCallback);
        return function () { return renderElement.off(eventName, zonedCallback); };
    };
    NativeScriptRenderer.prototype.listenGlobal = function (target, eventName, callback) {
        throw new Error('Not implemented.');
    };
    NativeScriptRenderer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [NativeScriptRootRenderer, api_1.RenderComponentType])
    ], NativeScriptRenderer);
    return NativeScriptRenderer;
}(api_1.Renderer));
exports.NativeScriptRenderer = NativeScriptRenderer;
//# sourceMappingURL=renderer.js.map