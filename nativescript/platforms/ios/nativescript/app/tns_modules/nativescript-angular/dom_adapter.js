"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compiler_1 = require('@angular/compiler');
var security_1 = require('@angular/core/src/security');
var platform_server_1 = require('@angular/platform-server');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
(function (SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
})(exports.SecurityContext || (exports.SecurityContext = {}));
var SecurityContext = exports.SecurityContext;
var NativeScriptElementSchemaRegistry = (function (_super) {
    __extends(NativeScriptElementSchemaRegistry, _super);
    function NativeScriptElementSchemaRegistry() {
        _super.apply(this, arguments);
    }
    NativeScriptElementSchemaRegistry.prototype.hasProperty = function (tagName, propName) {
        return true;
    };
    NativeScriptElementSchemaRegistry.prototype.getMappedPropName = function (propName) {
        return propName;
    };
    NativeScriptElementSchemaRegistry.prototype.securityContext = function (tagName, propName) {
        return SecurityContext.NONE;
    };
    return NativeScriptElementSchemaRegistry;
}(compiler_1.ElementSchemaRegistry));
exports.NativeScriptElementSchemaRegistry = NativeScriptElementSchemaRegistry;
var NativeScriptSanitizationService = (function (_super) {
    __extends(NativeScriptSanitizationService, _super);
    function NativeScriptSanitizationService() {
        _super.apply(this, arguments);
    }
    NativeScriptSanitizationService.prototype.sanitize = function (context, value) {
        return value;
    };
    return NativeScriptSanitizationService;
}(security_1.SanitizationService));
exports.NativeScriptSanitizationService = NativeScriptSanitizationService;
var NativeScriptDomAdapter = (function (_super) {
    __extends(NativeScriptDomAdapter, _super);
    function NativeScriptDomAdapter() {
        _super.apply(this, arguments);
    }
    NativeScriptDomAdapter.makeCurrent = function () {
        console.log("Setting DOM");
        dom_adapter_1.setRootDomAdapter(new NativeScriptDomAdapter());
    };
    NativeScriptDomAdapter.prototype.getXHR = function () {
        return null;
    };
    NativeScriptDomAdapter.prototype.hasProperty = function (element, name) {
        //TODO: actually check if the property exists.
        return true;
    };
    return NativeScriptDomAdapter;
}(platform_server_1.Parse5DomAdapter));
exports.NativeScriptDomAdapter = NativeScriptDomAdapter;
//# sourceMappingURL=dom_adapter.js.map