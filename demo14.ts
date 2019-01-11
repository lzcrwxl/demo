// 状态模式

window.external.upload = state => {
  console.log(state);
};

var plugin = (function() {
  var plugin = document.createElement("embed");
  plugin.style.display = "none";
  plugin.type = "application/txftn-webkit";
  plugin.sign = function() {
    console.log("开始扫描");
  };
  plugin.pause = function() {
    console.log("暂停扫描");
  };
  plugin.uploading = function() {
    console.log("开始上传文件");
  };
  plugin.del = function() {
    console.log("删除文件上传");
  };
  plugin.done = function() {
    console.log("文件上传完成");
  };
  document.body.appendChild(plugin);
  return plugin;
})();

class Upload {
  constructor(fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.signState = new SignState(this)
    this.uploadingState = new UploadingState(this)
    this.pauseState = new PauseState(this)
    this.doneState = new DoneState(this)
    this.errorState = new DoneState(this)
    this.currState = this.signState;
  }
  init() {
    this.dom = document.createElement("div");
    this.dom.innerHTML = `
    <span>文件名称：${this.fileName}</span>
    <button data-action="button1">扫描中</button>
    <button data-action="button2">删除</button>
    `;
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1"]');
    this.button2 = this.dom.querySelector('[data-action="button2"]');
    this.bindEvent();
  }
  bindEvent() {
    this.button1.onclick = () => {
      this.currState.clickHandleer1()
    };
    this.button2.onclick = () => {
      this.currState.clickHandleer2()
    };
  }
  sign(){
    this.plugin.sign();
    this.currState = this.signState
  }
  uploading(){
    this.button1.innerHTML = "正在上传，点击暂停";
    this.plugin.uploading()
    this.currState = this.uploadingState
  }
  pause(){
    this.button1.innerHTML = "已暂停，点击继续上传";
    this.plugin.pause()
    this.currState = this.pauseState
  }
  done(){
    this.button1.innerHTML = "上传完成"
    this.plugin.done()
    this.currState = this.doneState
  }
  error(){
    this.button1.innerHTML = "上传失败"
    this.currState = this.errorState
  }
  del(){
    this.plugin.del()
    this.dom.parentNode.removeChild(this.dom)
  }
}


var StateFactory =(function(){
   abstract class State{
    abstract clickHandler2():void;
    abstract clickHandler1():void
  }
  return function(param){
    class F extends State{
      constructor(uploadObj){
        super()
        this.uploadObj = uploadObj
      }
    }
    for(var i in param){
      F.prototype[i] = param[i]
    }
    return F
  }
})()

var SignState = StateFactory({
  clickHandleer1(){
    console.log('扫描中，点击无效。。。。')
  },
  clickHandleer2(){
    console.log('文件正在上传，不能删除')
  }
})




let uploadObj = new Upload('javaScript设计和开发模式')
uploadObj.init()

window.external.upload = (state)=>{
  uploadObj.changeState(state)
}

setTimeout(()=>{
  window.external.upload('uploading')
},1000)

setTimeout(()=>{
  window.external.upload('done')
},5000)