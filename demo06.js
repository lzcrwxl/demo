"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Beverage = /** @class */ (function () {
    function Beverage() {
    }
    Beverage.prototype.boilWater = function () {
        console.log('煮沸');
    };
    Beverage.prototype.init = function () {
        this.boilWater();
        this.brew();
        this.pourInCup();
        if (this.customerWantsCondiments()) {
            this.addCondiments();
        }
    };
    Beverage.prototype.customerWantsCondiments = function () {
        return true;
    };
    return Beverage;
}());
var Coffee = /** @class */ (function (_super) {
    __extends(Coffee, _super);
    function Coffee() {
        return _super.call(this) || this;
    }
    Coffee.prototype.brew = function () {
        console.log('沸水冲泡咖啡');
    };
    Coffee.prototype.pourInCup = function () {
        console.log('把咖啡倒进杯子');
    };
    Coffee.prototype.addCondiments = function () {
        console.log('加糖和牛奶');
    };
    Coffee.prototype.customerWantsCondiments = function () {
        return window.confirm('请问需要调料么');
    };
    return Coffee;
}(Beverage));
var coffee = new Coffee();
coffee.init();
