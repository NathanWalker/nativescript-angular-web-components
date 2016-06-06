var colorModule = require("color");
var enums = require("ui/enums");
var cssValue = require("css-value");
var utils = require("utils/utils");
var types;
function ensureTypes() {
    if (!types) {
        types = require("utils/types");
    }
}
var Background = (function () {
    function Background(color, image, repeat, position, size) {
        this.color = color;
        this.image = image;
        this.repeat = repeat;
        this.position = position;
        this.size = size;
    }
    Background.prototype.withColor = function (value) {
        return new Background(value, this.image, this.repeat, this.position, this.size);
    };
    Background.prototype.withImage = function (value) {
        return new Background(this.color, value, this.repeat, this.position, this.size);
    };
    Background.prototype.withRepeat = function (value) {
        return new Background(this.color, this.image, value, this.position, this.size);
    };
    Background.prototype.withPosition = function (value) {
        return new Background(this.color, this.image, this.repeat, value, this.size);
    };
    Background.prototype.withSize = function (value) {
        return new Background(this.color, this.image, this.repeat, this.position, value);
    };
    Background.prototype.getDrawParams = function (width, height) {
        if (!this.image) {
            return null;
        }
        var res = {
            repeatX: true,
            repeatY: true,
            posX: 0,
            posY: 0,
        };
        if (this.repeat) {
            switch (this.repeat.toLowerCase()) {
                case enums.BackgroundRepeat.noRepeat:
                    res.repeatX = false;
                    res.repeatY = false;
                    break;
                case enums.BackgroundRepeat.repeatX:
                    res.repeatY = false;
                    break;
                case enums.BackgroundRepeat.repeatY:
                    res.repeatX = false;
                    break;
            }
        }
        var imageWidth = this.image.width;
        var imageHeight = this.image.height;
        if (this.size) {
            var values = cssValue(this.size);
            if (values.length === 2) {
                var vx = values[0];
                var vy = values[1];
                if (vx.unit === "%" && vy.unit === "%") {
                    imageWidth = width * vx.value / 100;
                    imageHeight = height * vy.value / 100;
                    res.sizeX = imageWidth;
                    res.sizeY = imageHeight;
                }
                else if (vx.type === "number" && vy.type === "number" &&
                    ((vx.unit === "px" && vy.unit === "px") || (vx.unit === "" && vy.unit === ""))) {
                    imageWidth = vx.value;
                    imageHeight = vy.value;
                    res.sizeX = imageWidth;
                    res.sizeY = imageHeight;
                }
            }
            else if (values.length === 1 && values[0].type === "ident") {
                var scale = 0;
                if (values[0].string === "cover") {
                    scale = Math.max(width / imageWidth, height / imageHeight);
                }
                else if (values[0].string === "contain") {
                    scale = Math.min(width / imageWidth, height / imageHeight);
                }
                if (scale > 0) {
                    imageWidth *= scale;
                    imageHeight *= scale;
                    res.sizeX = imageWidth;
                    res.sizeY = imageHeight;
                }
            }
        }
        if (this.position) {
            var v = Background.parsePosition(this.position);
            if (v) {
                var spaceX = width - imageWidth;
                var spaceY = height - imageHeight;
                if (v.x.unit === "%" && v.y.unit === "%") {
                    res.posX = spaceX * v.x.value / 100;
                    res.posY = spaceY * v.y.value / 100;
                }
                else if (v.x.type === "number" && v.y.type === "number" &&
                    ((v.x.unit === "px" && v.y.unit === "px") || (v.x.unit === "" && v.y.unit === ""))) {
                    res.posX = v.x.value;
                    res.posY = v.y.value;
                }
                else if (v.x.type === "ident" && v.y.type === "ident") {
                    if (v.x.string.toLowerCase() === "center") {
                        res.posX = spaceX / 2;
                    }
                    else if (v.x.string.toLowerCase() === "right") {
                        res.posX = spaceX;
                    }
                    if (v.y.string.toLowerCase() === "center") {
                        res.posY = spaceY / 2;
                    }
                    else if (v.y.string.toLowerCase() === "bottom") {
                        res.posY = spaceY;
                    }
                }
            }
        }
        return res;
    };
    Background.parsePosition = function (pos) {
        var values = cssValue(pos);
        if (values.length === 2) {
            return {
                x: values[0],
                y: values[1]
            };
        }
        if (values.length === 1 && values[0].type === "ident") {
            var val = values[0].string.toLocaleLowerCase();
            var center = {
                type: "ident",
                string: "center"
            };
            if (val === "left" || val === "right") {
                return {
                    x: values[0],
                    y: center
                };
            }
            else if (val === "top" || val === "bottom") {
                return {
                    x: center,
                    y: values[0]
                };
            }
            else if (val === "center") {
                return {
                    x: center,
                    y: center
                };
            }
        }
        return null;
    };
    ;
    Background.prototype.isEmpty = function () {
        ensureTypes();
        return types.isNullOrUndefined(this.image) && types.isNullOrUndefined(this.color);
    };
    Background.equals = function (value1, value2) {
        if (!value1 && !value2) {
            return true;
        }
        if (!value1 || !value2) {
            return false;
        }
        return value1.image === value2.image &&
            value1.position === value2.position &&
            value1.repeat === value2.repeat &&
            value1.size === value2.size &&
            colorModule.Color.equals(value1.color, value2.color);
    };
    Background.default = new Background(undefined, undefined, undefined, undefined, undefined);
    return Background;
}());
exports.Background = Background;
function cssValueToDevicePixels(source, total) {
    var result;
    source = source.trim();
    if (source.indexOf("px") !== -1) {
        result = parseFloat(source.replace("px", ""));
    }
    else if (source.indexOf("%") !== -1 && total > 0) {
        result = (parseFloat(source.replace("%", "")) / 100) * utils.layout.toDeviceIndependentPixels(total);
    }
    else {
        result = parseFloat(source);
    }
    return utils.layout.toDevicePixels(result);
}
exports.cssValueToDevicePixels = cssValueToDevicePixels;
