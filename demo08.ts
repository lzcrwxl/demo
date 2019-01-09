const order500=function(orderType,pay,stock){
  if(orderType===1&&pay===true){
    console.log('500定金')
  }else {
    return 'nextSuccessor'
  }
}
const order200=function(orderType,pay,stock){
  if(orderType===1&&pay===true){
    console.log('200定金')
  }else {
    return 'nextSuccessor'
  }
}
const orderNormal=function(orderType,pay,stock){
  if(stock>0){
    console.log('普通购买')
  }else {
    console.log('库存不足')
  }
}


class Chain{
  constructor(fn){
    this.fn = fn
    this.successor = null
  }
  setNextSuccessor(successor){
    return this.successor = successor
  }
  passRequest(){
    let ret = this.fn.apply(this,arguments)
    if(ret==='nextSuccessor'){
      return this.successor && this.successor.passRequest.apply(this.successor,arguments)
    }
    return ret
  }
}

Function.prototype.after = function(fn){
  var self = this
  return function(){
    var ret = self.apply(this,arguments)
    if(ret==='nextSuccessor'){
      return fn.apply(this,arguments)
    }
    return ret
  }
}

var order = order500yuan.after(order200yan).after(orderNormal)
order(1,true,500)


var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1,true,500)
chainOrder500.passRequest(2,true,500)
chainOrder500.passRequest(1,false,0)