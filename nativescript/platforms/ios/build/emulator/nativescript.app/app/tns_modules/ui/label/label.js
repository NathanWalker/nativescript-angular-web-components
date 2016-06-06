var common = require("./label-common");
var enums = require("ui/enums");
var utils = require("utils/utils");
var view = require("ui/core/view");
var style = require("ui/styling/style");
global.moduleMerge(common, exports);
var background;
function ensureBackground() {
    if (!background) {
        background = require("ui/styling/background");
    }
}
var UILabelImpl = (function (_super) {
    __extends(UILabelImpl, _super);
    function UILabelImpl() {
        _super.apply(this, arguments);
    }
    UILabelImpl.initWithOwner = function (owner) {
        var labelImpl = UILabelImpl.new();
        labelImpl._owner = owner;
        return labelImpl;
    };
    UILabelImpl.prototype.textRectForBoundsLimitedToNumberOfLines = function (bounds, numberOfLines) {
        var rect = _super.prototype.textRectForBoundsLimitedToNumberOfLines.call(this, bounds, numberOfLines);
        var owner = this._owner.get();
        if (owner) {
            var size = rect.size;
            rect = CGRectMake(-(owner.borderWidth + owner.style.paddingLeft), -(owner.borderWidth + owner.style.paddingTop), size.width + (owner.borderWidth + owner.style.paddingLeft + owner.style.paddingRight + owner.borderWidth), size.height + (owner.borderWidth + owner.style.paddingTop + owner.style.paddingBottom + owner.borderWidth));
        }
        return rect;
    };
    UILabelImpl.prototype.drawTextInRect = function (rect) {
        var owner = this._owner.get();
        var textRect;
        var size = rect.size;
        if (owner) {
            textRect = CGRectMake((owner.borderWidth + owner.style.paddingLeft), (owner.borderWidth + owner.style.paddingTop), size.width - (owner.borderWidth + owner.style.paddingLeft + owner.style.paddingRight + owner.borderWidth), size.height - (owner.borderWidth + owner.style.paddingTop + owner.style.paddingBottom + owner.borderWidth));
        }
        else {
            textRect = CGRectMake(0, 0, size.width, size.height);
        }
        _super.prototype.drawTextInRect.call(this, textRect);
    };
    return UILabelImpl;
}(UILabel));
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        _super.call(this);
        this._ios = UILabelImpl.initWithOwner(new WeakRef(this));
        this._ios.userInteractionEnabled = true;
    }
    Object.defineProperty(Label.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Label.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this.style._updateTextDecoration();
        this.style._updateTextTransform();
    };
    Label.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var nativeView = this._nativeView;
        if (nativeView) {
            var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
            var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
            var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
            var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
            if (widthMode === utils.layout.UNSPECIFIED) {
                width = Number.POSITIVE_INFINITY;
            }
            if (heightMode === utils.layout.UNSPECIFIED) {
                height = Number.POSITIVE_INFINITY;
            }
            var nativeSize = nativeView.sizeThatFits(CGSizeMake(width, height));
            var labelWidth = nativeSize.width;
            if (!this.textWrap && this.style.whiteSpace !== enums.WhiteSpace.nowrap) {
                labelWidth = Math.min(labelWidth, width);
            }
            var measureWidth = Math.max(labelWidth, this.minWidth);
            var measureHeight = Math.max(nativeSize.height, this.minHeight);
            var widthAndState = view.View.resolveSizeAndState(measureWidth, width, widthMode, 0);
            var heightAndState = view.View.resolveSizeAndState(measureHeight, height, heightMode, 0);
            this.setMeasuredDimension(widthAndState, heightAndState);
        }
    };
    return Label;
}(common.Label));
exports.Label = Label;
var LabelStyler = (function () {
    function LabelStyler() {
    }
    LabelStyler.setBackgroundInternalProperty = function (view, newValue) {
        var uiLabel = view._nativeView;
        if (uiLabel && uiLabel.layer) {
            var flipImage = true;
            ensureBackground();
            var uiColor = background.ios.createBackgroundUIColor(view, flipImage);
            var cgColor = uiColor ? uiColor.CGColor : null;
            uiLabel.layer.backgroundColor = cgColor;
        }
    };
    LabelStyler.resetBackgroundInternalProperty = function (view, nativeValue) {
        var uiLabel = view._nativeView;
        if (uiLabel && uiLabel.layer) {
            var uiColor = nativeValue;
            var cgColor = uiColor ? uiColor.CGColor : null;
            uiLabel.layer.backgroundColor = cgColor;
        }
    };
    LabelStyler.getNativeBackgroundInternalValue = function (view) {
        var uiLabel = view._nativeView;
        if (uiLabel && uiLabel.layer && uiLabel.layer.backgroundColor) {
            return UIColor.colorWithCGColor(uiLabel.layer.backgroundColor);
        }
        return undefined;
    };
    LabelStyler.registerHandlers = function () {
        style.registerHandler(style.backgroundInternalProperty, new style.StylePropertyChangedHandler(LabelStyler.setBackgroundInternalProperty, LabelStyler.resetBackgroundInternalProperty, LabelStyler.getNativeBackgroundInternalValue), "Label");
    };
    return LabelStyler;
}());
exports.LabelStyler = LabelStyler;
LabelStyler.registerHandlers();
