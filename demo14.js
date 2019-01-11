"use strict";
// 状态模式
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
window.external.upload = function (state) {
    console.log(state);
};
var plugin = (function () {
    var plugin = document.createElement("embed");
    plugin.style.display = "none";
    plugin.type = "application/txftn-webkit";
    plugin.sign = function () {
        console.log("开始扫描");
    };
    plugin.pause = function () {
        console.log("暂停扫描");
    };
    plugin.uploading = function () {
        console.log("开始上传文件");
    };
    plugin.del = function () {
        console.log("删除文件上传");
    };
    plugin.done = function () {
        console.log("文件上传完成");
    };
    document.body.appendChild(plugin);
    return plugin;
})();
var Upload = /** @class */ (function () {
    function Upload(fileName) {
        this.plugin = plugin;
        this.fileName = fileName;
        this.button1 = null;
        this.button2 = null;
        this.signState = new SignState(this);
        this.uploadingState = new UploadingState(this);
        this.pauseState = new PauseState(this);
        this.doneState = new DoneState(this);
        this.errorState = new DoneState(this);
        this.currState = this.signState;
    }
    Upload.prototype.init = function () {
        this.dom = document.createElement("div");
        this.dom.innerHTML = "\n    <span>\u6587\u4EF6\u540D\u79F0\uFF1A" + this.fileName + "</span>\n    <button data-action=\"button1\">\u626B\u63CF\u4E2D</button>\n    <button data-action=\"button2\">\u5220\u9664</button>\n    ";
        document.body.appendChild(this.dom);
        this.button1 = this.dom.querySelector('[data-action="button1"]');
        this.button2 = this.dom.querySelector('[data-action="button2"]');
        this.bindEvent();
    };
    Upload.prototype.bindEvent = function () {
        var _this = this;
        this.button1.onclick = function () {
            _this.currState.clickHandleer1();
        };
        this.button2.onclick = function () {
            _this.currState.clickHandleer2();
        };
    };
    Upload.prototype.sign = function () {
        this.plugin.sign();
        this.currState = this.signState;
    };
    Upload.prototype.uploading = function () {
        this.button1.innerHTML = "正在上传，点击暂停";
        this.plugin.uploading();
        this.currState = this.uploadingState;
    };
    Upload.prototype.pause = function () {
        this.button1.innerHTML = "已暂停，点击继续上传";
        this.plugin.pause();
        this.currState = this.pauseState;
    };
    Upload.prototype.done = function () {
        this.button1.innerHTML = "上传完成";
        this.plugin.done();
        this.currState = this.doneState;
    };
    Upload.prototype.error = function () {
        this.button1.innerHTML = "上传失败";
        this.currState = this.errorState;
    };
    Upload.prototype.del = function () {
        this.plugin.del();
        this.dom.parentNode.removeChild(this.dom);
    };
    return Upload;
}());
var StateFactory = (function () {
    var State = /** @class */ (function () {
        function State() {
        }
        return State;
    }());
    return function (param) {
        var F = /** @class */ (function (_super) {
            __extends(F, _super);
            function F(uploadObj) {
                var _this = _super.call(this) || this;
                _this.uploadObj = uploadObj;
                return _this;
            }
            return F;
        }(State));
        for (var i in param) {
            F.prototype[i] = param[i];
        }
        return F;
    };
})();
var SignState = StateFactory({
    clickHandleer1: function () {
        console.log('扫描中，点击无效。。。。');
    },
    clickHandleer2: function () {
        console.log('文件正在上传，不能删除');
    }
});
var uploadObj = new Upload('javaScript设计和开发模式');
uploadObj.init();
window.external.upload = function (state) {
    uploadObj.changeState(state);
};
setTimeout(function () {
    window.external.upload('uploading');
}, 1000);
setTimeout(function () {
    window.external.upload('done');
}, 5000);
