abstract class Beverage{
  private boilWater(){
    console.log('煮沸')
  }
  abstract brew():void
  abstract pourInCup():void
  abstract addCondiments():void
  init(){
    this.boilWater()
    this.brew()
    this.pourInCup()
    if(this.customerWantsCondiments()){
      this.addCondiments()
    }
  }
  customerWantsCondiments(){
    return true
  }

}

class Coffee extends Beverage{
  constructor(){
    super()
  }
  brew(){
    console.log('沸水冲泡咖啡')
  }
  pourInCup(){
    console.log('把咖啡倒进杯子')
  }
  addCondiments(){
    console.log('加糖和牛奶')
  }
  customerWantsCondiments(){
    return window.confirm('请问需要调料么')
  }
}


let coffee = new Coffee()

coffee.init()