var expressionSymbolsRegex = /[\+\-\*\/%\?:<>=!\|&\(\)^~]/;
var bindingConstants;
(function (bindingConstants) {
    bindingConstants.sourceProperty = "sourceProperty";
    bindingConstants.targetProperty = "targetProperty";
    bindingConstants.expression = "expression";
    bindingConstants.twoWay = "twoWay";
    bindingConstants.source = "source";
    bindingConstants.bindingValueKey = "$value";
    bindingConstants.parentValueKey = "$parent";
    bindingConstants.parentsValueKey = "$parents";
    bindingConstants.newPropertyValueKey = "$newPropertyValue";
})(bindingConstants = exports.bindingConstants || (exports.bindingConstants = {}));
;
var hasEqualSignRegex = /=+/;
var equalSignComparisionOperatorsRegex = /(==|===|>=|<=|!=|!==)/;
exports.parentsRegex = /\$parents\s*\[\s*(['"]*)\w*\1\s*\]/g;
function isNamedParam(value) {
    var equalSignIndex = value.search(hasEqualSignRegex);
    if (equalSignIndex > -1) {
        var equalSignSurround = value.substr(equalSignIndex > 0 ? equalSignIndex - 1 : 0, 3);
        if (equalSignSurround.search(equalSignComparisionOperatorsRegex) === -1) {
            return true;
        }
    }
    return false;
}
function areNamedParams(params) {
    var i;
    for (i = 0; i < params.length; i++) {
        if (isNamedParam(params[i])) {
            return true;
        }
    }
    return false;
}
var namedParamConstants = {
    propName: "propName",
    propValue: "propValue"
};
function getPropertyNameValuePair(param, knownOptions, callback) {
    var nameValuePair = {};
    var propertyName = param.substr(0, param.indexOf("=")).trim();
    var propertyValue = param.substr(param.indexOf("=") + 1).trim();
    if (knownOptions) {
        if (!propertyName) {
            propertyName = knownOptions.defaultProperty;
        }
        else {
            propertyName = propertyName in knownOptions ? propertyName : null;
        }
    }
    if (propertyName) {
        if (callback) {
            nameValuePair = callback(propertyName, propertyValue);
        }
        else {
            nameValuePair[namedParamConstants.propName] = propertyName;
            nameValuePair[namedParamConstants.propValue] = propertyValue;
        }
        return nameValuePair;
    }
    return null;
}
function parseNamedProperties(parameterList, knownOptions, callback) {
    var result = {};
    var i;
    for (i = 0; i < parameterList.length; i++) {
        var nameValuePair = getPropertyNameValuePair(parameterList[i], knownOptions, callback);
        if (nameValuePair) {
            result[nameValuePair[namedParamConstants.propName]] = nameValuePair[namedParamConstants.propValue];
        }
    }
    return result;
}
function getParamsArray(value) {
    var result = [];
    var i;
    var skipComma = 0;
    var indexReached = 0;
    var singleQuoteBlock, doubleQuoteBlock = false;
    for (i = 0; i < value.length; i++) {
        if (value[i] === '"') {
            doubleQuoteBlock = !doubleQuoteBlock;
        }
        if (value[i] === "'") {
            singleQuoteBlock = !singleQuoteBlock;
        }
        if (value[i] === '(' || value[i] === '[') {
            skipComma++;
        }
        if (value[i] === ')' || value[i] === ']') {
            skipComma--;
        }
        if (value[i] === ',' && skipComma === 0 && !(singleQuoteBlock || doubleQuoteBlock)) {
            result.push(value.substr(indexReached, i - indexReached));
            indexReached = i + 1;
        }
    }
    result.push(value.substr(indexReached));
    return result;
}
function isExpression(expression) {
    if (expression.search(expressionSymbolsRegex) > -1) {
        var parentsMatches = expression.match(exports.parentsRegex);
        if (parentsMatches) {
            var restOfExpression = expression.substr(expression.indexOf(parentsMatches[0]) + parentsMatches[0].length);
            if (!(restOfExpression.search(expressionSymbolsRegex) > -1)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
function getBindingOptions(name, value) {
    var namedParams = [];
    var params = getParamsArray(value);
    if (!areNamedParams(params)) {
        if (params.length === 1) {
            var trimmedValue = params[0].trim();
            var sourceProp;
            if (isExpression(trimmedValue)) {
                sourceProp = bindingConstants.bindingValueKey;
                namedParams.push(bindingConstants.expression + " = " + trimmedValue);
            }
            else {
                sourceProp = trimmedValue;
            }
            namedParams.push(bindingConstants.sourceProperty + " = " + sourceProp);
            namedParams.push(bindingConstants.twoWay + " = true");
        }
        else {
            namedParams.push(bindingConstants.sourceProperty + " = " + params[0].trim());
            namedParams.push(bindingConstants.expression + " = " + params[1].trim());
            var twoWay = params[2] ? params[2].toLowerCase().trim() === "true" : true;
            namedParams.push(bindingConstants.twoWay + " = " + twoWay);
        }
    }
    else {
        namedParams = params;
    }
    var bindingPropertyHandler = function (prop, value) {
        var result = {};
        result[namedParamConstants.propName] = prop;
        if (prop === bindingConstants.twoWay) {
            if (value === "true") {
                result[namedParamConstants.propValue] = true;
            }
            else {
                result[namedParamConstants.propValue] = false;
            }
        }
        else {
            result[namedParamConstants.propValue] = value;
        }
        return result;
    };
    var bindingOptionsParameters = parseNamedProperties(namedParams, xmlBindingProperties, bindingPropertyHandler);
    var bindOptions = {
        targetProperty: name
    };
    for (var prop in bindingOptionsParameters) {
        if (bindingOptionsParameters.hasOwnProperty(prop)) {
            bindOptions[prop] = bindingOptionsParameters[prop];
        }
    }
    if (bindOptions[bindingConstants.twoWay] === undefined) {
        bindOptions[bindingConstants.twoWay] = true;
    }
    return bindOptions;
}
exports.getBindingOptions = getBindingOptions;
var xmlBindingProperties = {
    sourceProperty: true,
    expression: true,
    twoWay: true,
    source: true,
    defaultProperty: bindingConstants.sourceProperty
};
