"use strict";
Function.prototype.before = function (beforefn) {
    var _self = this;
    return function () {
        beforefn.apply(this, arguments);
        return _self.apply(this, arguments);
    };
};
var func = function () {
    alert(1);
};
func.a = "a";
func = func.before(function () {
    alert(2);
});
alert(func.a); // 输出：undefined
console.log(func.c);
var ajax = function (type, url, param) {
    if (param === void 0) { param = {}; }
    console.dir(param);
};
var getToken = function () {
    return 'Token';
};
ajax = ajax.before(function (type, url, param) {
    param.Token = getToken();
});
ajax('get', 'http://xxx.com', { name: 'seven' });
