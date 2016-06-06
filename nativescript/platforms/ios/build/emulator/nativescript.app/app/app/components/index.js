"use strict";
var _1 = require('./action-bar/');
var _2 = require('./action-item/');
var _3 = require('./button/');
var _4 = require('./label/');
var _5 = require('./image/');
var _6 = require('./list-view/');
var stack_layout_component_1 = require('./layout-containers/stack-layout/stack-layout.component');
var _7 = require('../shared/');
var components = [];
if (!_7.SharedService.IS_NATIVESCRIPT()) {
    // only setup on the web
    components = [
        _1.ActionBarComponent,
        _2.ActionItemComponent,
        _3.ButtonComponent,
        _4.LabelComponent,
        _5.ImageComponent,
        _6.ListViewComponent,
        stack_layout_component_1.StackLayoutComponent
    ];
}
exports.NATIVESCRIPT_WEB_COMPONENTS = components;
//# sourceMappingURL=index.js.map