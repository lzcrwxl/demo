
class Folder{
  readonly name:string
  files:MyFile[]
  parent:any
  constructor(name:string){
    this.name = name
    this.files = []
    this.parent=null
  }
  add(file:MyFile){
    file.parent = this
    this.files.push(file)
  }
  scan(){
    console.log('scan文件夹：'+this.name)
    for(let i =0,file:MyFile,files = this.files;file=files[i++];){
      file.scan()
    }
  }
  remove(){
    if(!this.parent){
      return
    }
    for(let files = this.parent.files,l=files.length-1;l>=0;l--){
      let file = files[l]
      if(file ===this){
        files.splice(l,1)
      }
    }
  }
}

interface FileInterface{
  scan:object
  [propName:string]:any;
}
class MyFile implements FileInterface{
  readonly name:string
  parent:any
  constructor(name:string){
    this.name = name
    this.parent = null
  }
  add(){
    throw new Error('文件下面不能再添加文件')
  }
  scan(){
    console.log('开始扫描文件：'+this.name)
  }
  remove(){
    if(!this.parent){
      return
    }
    for(let files = this.parent.files,l = files.length-1;l>=0;l--){
      let file = files[l]
      if(file ===this){
        files.splice(l,1)
      }
    }
  }
}


let folder = new Folder('学习资料')
let folder1 = new Folder('Javascript')
let folder2 = new Folder('Jquery')

let file1 = new MyFile('javascript参数')
let file2 = new MyFile('精通jquery')
let file3 = new MyFile('重构与模式')

folder1.add(file1)
folder2.add(file2)

folder.add(folder1)
folder.add(folder2)
folder.add(file3)
folder1.remove()

folder.scan()
