"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var file_system_1 = require("file-system");
var xhr_1 = require("@angular/compiler/src/xhr");
var FileSystemXHR = (function (_super) {
    __extends(FileSystemXHR, _super);
    function FileSystemXHR() {
        _super.apply(this, arguments);
    }
    FileSystemXHR.prototype.get = function (url) {
        var appDir = file_system_1.knownFolders.currentApp().path;
        var templatePath = file_system_1.path.join(appDir, url);
        if (!file_system_1.File.exists(templatePath)) {
            throw new Error("File " + url + " does not exist.");
        }
        var templateFile = file_system_1.File.fromPath(templatePath);
        return templateFile.readText();
    };
    return FileSystemXHR;
}(xhr_1.XHR));
exports.FileSystemXHR = FileSystemXHR;
//# sourceMappingURL=xhr.js.map