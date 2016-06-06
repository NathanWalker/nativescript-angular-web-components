"use strict";
var trace = require("trace");
exports.CATEGORY = "ns-router";
function log(message) {
    trace.write(message, exports.CATEGORY);
}
exports.log = log;
//# sourceMappingURL=common.js.map