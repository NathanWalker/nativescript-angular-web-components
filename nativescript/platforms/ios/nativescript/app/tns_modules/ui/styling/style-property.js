var types = require("utils/types");
var observable = require("ui/core/dependency-observable");
var propertiesByName = {};
var propertiesByCssName = {};
var callbackByShorthandName = new Map();
var inheritableProperties = [];
function registerProperty(property) {
    if (propertiesByCssName[property.cssName]) {
        throw new Error("Property with name " + property.cssName + " is already registered!");
    }
    propertiesByCssName[property.cssName] = property;
    propertiesByName[property.name] = property;
    if (property.metadata.inheritable) {
        inheritableProperties.push(property);
    }
}
function withStyleProperty(name, value, resolvedCallback) {
    var property = getPropertyByCssName(name);
    if (property) {
        resolvedCallback(property, value);
    }
    else {
        var pairs = getShorthandPairs(name, value);
        if (pairs) {
            for (var j = 0; j < pairs.length; j++) {
                var pair = pairs[j];
                resolvedCallback(pair.property, pair.value);
            }
        }
        else {
            resolvedCallback(name, value);
        }
    }
}
exports.withStyleProperty = withStyleProperty;
function getShorthandPairs(name, value) {
    var callback = callbackByShorthandName.get(name);
    if (callback) {
        return callback(value);
    }
    return undefined;
}
exports.getShorthandPairs = getShorthandPairs;
function registerShorthandCallback(name, callback) {
    if (callbackByShorthandName.has(name)) {
        throw new Error("Shorthand callback already registered for property: " + name);
    }
    callbackByShorthandName.set(name, callback);
}
exports.registerShorthandCallback = registerShorthandCallback;
function getPropertyByName(name) {
    return propertiesByName[name];
}
exports.getPropertyByName = getPropertyByName;
function getPropertyByCssName(name) {
    return propertiesByCssName[name];
}
exports.getPropertyByCssName = getPropertyByCssName;
function eachProperty(callback) {
    types.verifyCallback(callback);
    var i;
    var key;
    var keys = Object.keys(propertiesByName);
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        callback(propertiesByName[key]);
    }
}
exports.eachProperty = eachProperty;
function eachInheritableProperty(callback) {
    types.verifyCallback(callback);
    var i;
    for (i = 0; i < inheritableProperties.length; i++) {
        callback(inheritableProperties[i]);
    }
}
exports.eachInheritableProperty = eachInheritableProperty;
var Property = (function (_super) {
    __extends(Property, _super);
    function Property(name, cssName, metadata, valueConverter) {
        _super.call(this, name, "Style", metadata, valueConverter);
        this._cssName = cssName;
        registerProperty(this);
    }
    Object.defineProperty(Property.prototype, "cssName", {
        get: function () {
            return this._cssName;
        },
        enumerable: true,
        configurable: true
    });
    Property.prototype._getEffectiveValue = function (entry) {
        if (types.isDefined(entry.visualStateValue)) {
            entry.valueSource = observable.ValueSource.VisualState;
            return entry.visualStateValue;
        }
        if (types.isDefined(entry.localValue)) {
            entry.valueSource = observable.ValueSource.Local;
            return entry.localValue;
        }
        if (types.isDefined(entry.cssValue)) {
            entry.valueSource = observable.ValueSource.Css;
            return entry.cssValue;
        }
        if (types.isDefined(entry.inheritedValue)) {
            entry.valueSource = observable.ValueSource.Inherited;
            return entry.inheritedValue;
        }
        entry.valueSource = observable.ValueSource.Default;
        return this.metadata.defaultValue;
    };
    return Property;
}(observable.Property));
exports.Property = Property;
