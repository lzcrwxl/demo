"use strict";
var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return function (src) {
        imgNode.src = src;
    };
})();
var proxyImage = (function () {
    var img = new Image;
    img.onload = function () {
        myImage(this.src);
    };
    return function (src) {
        myImage('demo.jpg');
        img.src = src;
    };
})();
proxyImage('').setSrc('http://www.xinhuanet.com/politics/2018lh/2018-03/17/1122551729_15212817485941n.jpg');
