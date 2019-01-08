"use strict";
var Folder = /** @class */ (function () {
    function Folder(name) {
        this.name = name;
        this.files = [];
        this.parent = null;
    }
    Folder.prototype.add = function (file) {
        file.parent = this;
        this.files.push(file);
    };
    Folder.prototype.scan = function () {
        console.log('scan文件夹：' + this.name);
        for (var i = 0, file = void 0, files = this.files; file = files[i++];) {
            file.scan();
        }
    };
    Folder.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1);
            }
        }
    };
    return Folder;
}());
var MyFile = /** @class */ (function () {
    function MyFile(name) {
        this.name = name;
        this.parent = null;
    }
    MyFile.prototype.add = function () {
        throw new Error('文件下面不能再添加文件');
    };
    MyFile.prototype.scan = function () {
        console.log('开始扫描文件：' + this.name);
    };
    MyFile.prototype.remove = function () {
        if (!this.parent) {
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1);
            }
        }
    };
    return MyFile;
}());
var folder = new Folder('学习资料');
var folder1 = new Folder('Javascript');
var folder2 = new Folder('Jquery');
var file1 = new MyFile('javascript参数');
var file2 = new MyFile('精通jquery');
var file3 = new MyFile('重构与模式');
folder1.add(file1);
folder2.add(file2);
folder.add(folder1);
folder.add(folder2);
folder.add(file3);
folder1.remove();
folder.scan();
