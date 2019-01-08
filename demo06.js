"use strict";
var Beverage = /** @class */ (function () {
    function Beverage() {
    }
    Beverage.prototype.boilWater = function () {
        console.log('煮沸');
    };
    Beverage.prototype.brew = function () {
    };
    Beverage.prototype.pourInCup = function () {
    };
    Beverage.prototype.addCondiments = function () {
    };
    Beverage.prototype.init = function () {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    };
    return Beverage;
}());
