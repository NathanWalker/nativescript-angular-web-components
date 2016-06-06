"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var index_1 = require('./components/index');
require('rxjs/add/operator/map');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.actionTxt = 'Right';
        this.imgSrc = '~/jamiroquai1.jpg';
        this.origTitle = 'NativeScript Angular Web Components';
        this.origToggleText = 'What is this?';
        this.origUserHeading = 'Jury of reasonable minded folk';
        this.title = this.origTitle;
        this.toggleText = this.origToggleText;
        this.userHeading = this.origUserHeading + ' (Loading...):';
        this.loadUsers();
    }
    AppComponent.prototype.leftAction = function () {
        alert('Left ActionItem clicked!');
    };
    AppComponent.prototype.rightAction = function () {
        alert('Right ActionItem clicked!');
    };
    AppComponent.prototype.changeText = function () {
        if (this.title.indexOf('Native') > -1) {
            this.title = "Using {N} View Components to render Web Components is surely \"Futures made of virtual insanity ...\" isn't it?";
            this.toggleText = 'Take me back to reality';
            this.imgSrc = "~/jamiroquai2.jpg";
            this.userHeading = 'Jury of virtually insane folk (Loading...):';
            this.loadUsers();
        }
        else {
            this.title = this.origTitle;
            this.toggleText = this.origToggleText;
            this.imgSrc = "~/jamiroquai1.jpg";
            this.userHeading = this.origUserHeading + ' (Loading...):';
            this.loadUsers();
        }
    };
    AppComponent.prototype.onLoaded = function (e) {
        console.log("onLoaded");
        console.log(e);
    };
    AppComponent.prototype.onItemLoading = function (e) {
        console.log("onItemLoading");
        console.log(e);
    };
    AppComponent.prototype.onItemTap = function (e) {
        console.log("onItemTap");
        console.log(e);
    };
    AppComponent.prototype.loadUsers = function () {
        var _this = this;
        this.http.get("https://randomuser.me/api/?results=100&nat=us&seed=" + Math.floor(Math.random() * 100000000)).map(function (res) { return res.json(); }).subscribe(function (response) {
            _this.users = response.results;
            _this.userHeading = _this.userHeading.replace(' (Loading...)', '');
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app/app.component.html',
            styleUrls: ['./app/app.component.css'],
            directives: [index_1.NATIVESCRIPT_WEB_COMPONENTS]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map