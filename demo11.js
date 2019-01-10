"use strict";
Function.prototype.after = function (afterfn) {
    var _self = this; // 这里的this 指代showLogin这个方法
    return function () {
        var ret = _self.apply(this, arguments); // 这里的this指代button这个元素，apply 把button替换为showLogin方法并执行
        afterfn.apply(this, arguments); // 同理 button替换为log方法并执行
        return ret;
    };
};
var showLogin = function () {
    console.log('打开登录浮层');
};
var log = function () {
    console.log('上报标签为：' + this.getAttribute('tag'));
};
showLogin = showLogin.after(log); // 
/* 这里的showLogin 已经变成 function(){
    let ret = _self.apply(this,arguments)
    afterfn.apply(this,arguments)
    return ret
  } */
document.getElementById('button').onclick = showLogin;
