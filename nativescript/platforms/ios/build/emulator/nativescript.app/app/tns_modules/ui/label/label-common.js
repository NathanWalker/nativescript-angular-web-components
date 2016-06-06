var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
var textBase = require("ui/text-base");
var enums;
function ensureEnums() {
    if (!enums) {
        enums = require("ui/enums");
    }
}
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(Label.prototype, "textWrap", {
        get: function () {
            return this._getValue(Label.textWrapProperty);
        },
        set: function (value) {
            this._setValue(Label.textWrapProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Label.textWrapProperty = new dependencyObservable.Property("textWrap", "Label", new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.AffectsLayout));
    return Label;
}(textBase.TextBase));
exports.Label = Label;
function onTextWrapPropertyChanged(data) {
    var v = data.object;
    ensureEnums();
    v.style.whiteSpace = data.newValue ? enums.WhiteSpace.normal : enums.WhiteSpace.nowrap;
}
Label.textWrapProperty.metadata.onSetNativeValue = onTextWrapPropertyChanged;
