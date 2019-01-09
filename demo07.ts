let id = 0;
window.startUpload = function(uploadType, files) {
  for (let i = 0, file; file = files[i++]; ) {
    uploadManger.add(++id,uploadType, file.fileName, file.fileSize);
  }
};

class Upload {
  uploadType: any;
  constructor(uploadType) {
    this.uploadType = uploadType;
  }
  delFile(id) {
    uploadManger.setExternalState(id, this);
    if (this.fileSize < 3000) {
      return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm("确定要删除该文件么？" + this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  }
}

let UploadFactory = (function() {
  var createdFlyWeightObjs = {};
  return {
    create(uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType];
      }
      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType));
    }
  };
})();

let uploadManger = (function() {
  let uploadDatabase = {};
  return {
    add(id, uploadType, fileName, fileSize) {
      let flyWeightObj = UploadFactory.create(uploadType);
      let dom = document.createElement("div");
      dom.innerHTML = `  <span>文件名称:${fileName},文件大小：${fileSize}</span>
    <button class="delFile">删除</button> `;
      dom.querySelector(".delFile").onclick = function() {
        flyWeightObj.delFile(id);
      };
      document.body.appendChild(dom)
      uploadDatabase[id]={
        fileName,
        fileSize,
        dom
      }
      console.log(uploadDatabase)
    },
    setExternalState(id,flyWeightObj){
      let uploadData = uploadDatabase[id]
      for(let i in uploadData){
        flyWeightObj[i] = uploadData[i]  
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
