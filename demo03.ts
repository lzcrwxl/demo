const tween= {
  linear(t:number, b:number, c:number, d:number):number {
    return (c * t) / d + b;
  },
  easeIn(t:number, b:number, c:number, d:number):number{
    return c * (t /= d) * t + b;
  },
  strongEaseIn(t:number, b:number, c:number, d:number):number{
    return c*(t/=d)*t*t*t*t+b
  },
  strongEaseOut(t:number, b:number, c:number, d:number):number{
    return c*((t=t/d-1)*t*t*t*t+1)+b
  },
  sineaseIn(t:number, b:number, c:number, d:number):number{
    return c*(t/=d)*t*t+b
  },
  sineaseOut(t:number, b:number, c:number, d:number):number{
    return c*((t=t/d-1)*t*t+1)+b
  }
};

class Animate {
  dom:HTMLElement;
  startTime:number
  startPos:number
  endPos:number
  propertyName:string
  easing:number|null
  duration:number
  [propName: string]: any;   
  constructor(dom:HTMLElement) {
    this.dom = dom;
    this.startTime = 0;
    this.startPos = 0;
    this.endPos = 0;
    this.propertyName = 'left';
    this.easing = null;
    this.duration = 0;
  }

  start(propertyName:string, endPos:number, duration:number, easing:string){
    this.startTime = +new Date();
    this.startPos = this.dom.getBoundingClientRect()[propertyName];
    this.propertyName = propertyName;
    this.endPos = endPos;
    this.duration = duration;
    this.easing = tween[easing];
    
    let timeId = setInterval(()=>{
      if(this.step()===false){
        clearInterval(timeId)
      }
    },19)
  }
  step(){
    const t = + new Date
    if(t>=this.startTime+this.duration){
      this.update(this.endPos)
      return false
    }
    const pos = this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration)
    this.update(pos)
  }
  update(pos:number){
    this.dom.style[this.propertyName] = pos +'px'
  }
}




  var ball = document.getElementById('ball')
  var pos = document.getElementById('pos')
  var cancelBtn = document.getElementById('cancelBtn')
  var moveBtn = document.getElementById('moveBtn')
  console.log(moveBtn)




  class MoveCommand {
    oldPos:any;
    constructor(receiver,pos){
      this.receiver = receiver
      this.pos = pos
      this.oldPos = null
    }
    execute(){
      this.receiver.start('top',this.pos,1000,'strongEaseOut')
      this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]
    }
    undo(){
      this.receiver.start('left',this.oldPos,1000,'strongEaseOut')
    }
  }

  var moveCommand;

  moveBtn.onclick = function(){
    var animate = new Animate(ball)
    moveCommand = new MoveCommand(animate,pos.value)
    moveCommand.execute()
  }

  cancelBtn.onclick = function(){
    moveCommand.undo()
  }