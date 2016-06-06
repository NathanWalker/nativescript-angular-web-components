"use strict";
var SharedService = (function () {
    function SharedService() {
    }
    SharedService.IS_NATIVESCRIPT = function () {
        return ((typeof NSObject !== 'undefined' && typeof NSString !== 'undefined') || (typeof android !== 'undefined' && typeof java !== 'undefined'));
    };
    return SharedService;
}());
exports.SharedService = SharedService;
//# sourceMappingURL=index.js.map