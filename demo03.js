"use strict";
var tween = {
    linear: function (t, b, c, d) {
        return (c * t) / d + b;
    },
    easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    strongEaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    strongEaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    sineaseIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    sineaseOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
};
var Animate = /** @class */ (function () {
    function Animate(dom) {
        this.dom = dom;
        this.startTime = 0;
        this.startPos = 0;
        this.endPos = 0;
        this.propertyName = 'left';
        this.easing = null;
        this.duration = 0;
    }
    Animate.prototype.start = function (propertyName, endPos, duration, easing) {
        var _this = this;
        this.startTime = +new Date();
        this.startPos = this.dom.getBoundingClientRect()[propertyName];
        this.propertyName = propertyName;
        this.endPos = endPos;
        this.duration = duration;
        this.easing = tween[easing];
        var timeId = setInterval(function () {
            if (_this.step() === false) {
                clearInterval(timeId);
            }
        }, 19);
    };
    Animate.prototype.step = function () {
        var t = +new Date;
        if (t >= this.startTime + this.duration) {
            this.update(this.endPos);
            return false;
        }
        var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
        this.update(pos);
    };
    Animate.prototype.update = function (pos) {
        this.dom.style[this.propertyName] = pos + 'px';
    };
    return Animate;
}());
var ball = document.getElementById('ball');
var pos = document.getElementById('pos');
var cancelBtn = document.getElementById('cancelBtn');
var moveBtn = document.getElementById('moveBtn');
console.log(moveBtn);
var MoveCommand = /** @class */ (function () {
    function MoveCommand(receiver, pos) {
        this.receiver = receiver;
        this.pos = pos;
        this.oldPos = null;
    }
    MoveCommand.prototype.execute = function () {
        this.receiver.start('top', this.pos, 1000, 'strongEaseOut');
        this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName];
    };
    MoveCommand.prototype.undo = function () {
        this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
    };
    return MoveCommand;
}());
var moveCommand;
moveBtn.onclick = function () {
    var animate = new Animate(ball);
    moveCommand = new MoveCommand(animate, pos.value);
    moveCommand.execute();
};
cancelBtn.onclick = function () {
    moveCommand.undo();
};
