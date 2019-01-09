"use strict";
var id = 0;
window.startUpload = function (uploadType, files) {
    for (var i = 0, file = void 0; file = files[i++];) {
        uploadManger.add(++id, uploadType, file.fileName, file.fileSize);
    }
};
var Upload = /** @class */ (function () {
    function Upload(uploadType) {
        this.uploadType = uploadType;
    }
    Upload.prototype.delFile = function (id) {
        uploadManger.setExternalState(id, this);
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom);
        }
        if (window.confirm("确定要删除该文件么？" + this.fileName)) {
            return this.dom.parentNode.removeChild(this.dom);
        }
    };
    return Upload;
}());
var UploadFactory = (function () {
    var createdFlyWeightObjs = {};
    return {
        create: function (uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFlyWeightObjs[uploadType];
            }
            return (createdFlyWeightObjs[uploadType] = new Upload(uploadType));
        }
    };
})();
var uploadManger = (function () {
    var uploadDatabase = {};
    return {
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement("div");
            dom.innerHTML = "  <span>\u6587\u4EF6\u540D\u79F0:" + fileName + ",\u6587\u4EF6\u5927\u5C0F\uFF1A" + fileSize + "</span>\n    <button class=\"delFile\">\u5220\u9664</button> ";
            dom.querySelector(".delFile").onclick = function () {
                flyWeightObj.delFile(id);
            };
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };
            console.log(uploadDatabase);
        },
        setExternalState: function (id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (var i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    };
})();
startUpload("plugin", [
    { fileName: "1.txt", fileSize: 1000 },
    { fileName: "2.txt", fileSize: 3000 },
    { fileName: "3.txt", fileSize: 4000 },
    { fileName: "4.txt", fileSize: 5000 }
]);
