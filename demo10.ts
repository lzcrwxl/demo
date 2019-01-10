// 中介者模式 购物车

let goods = {
  "red|32G": 3,
  "red|16G": 1,
  "blue|32G": 0,
  "blue|16G": 6
};

let mediator = (function() {
  let i =0;
  let colorSelect = document.getElementById("colorSelect"),
    numberInput = document.getElementById("numberInput"),
    memorySelect = document.getElementById("memorySelect"),
    memoryInfo = document.getElementById("memoryInfo"),
    colorInfo = document.getElementById("colorInfo"),
    numberInfo = document.getElementById("numberInfo"),
    nextBtn = document.getElementById("nextBtn");
  return {
    changed(obj) {
      let color = colorSelect.value,
        memory = memorySelect.value,
        number = numberInput.value,
        stock = goods[color + "|" + memory];
      if (obj === colorSelect) {
        colorInfo.innerHTML = color;
      } else if (obj === memorySelect) {
        memoryInfo.innerHTML = memory;
      } else if (obj === numberInput) {
        numberInfo.innerHTML = number;
      }
      if (!color) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "请选择手机颜色";
        return;
      }
      if (!memory) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "请选择库存大小";
        return;
      }
      if (!Number.isInteger(number - 0) && number > 0) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "请输入正确的购买数量";
        return;
      }
      if (number > stock) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = "库存不足";
        return;
      }
      nextBtn.disabled = false;
      nextBtn.innerHTML = "放入购物车";
    }
  };
})();

console.log(i)
colorSelect.onchange = function() {
  mediator.changed(this);
};
memorySelect.onchange = function() {
  mediator.changed(this);
};
numberInput.oninput = function() {
  mediator.changed(this);
};
