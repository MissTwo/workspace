let green = document.getElementById("green");
let red = document.getElementById("red");
let blue = document.getElementById("blue");
let ele = document.getElementById("element");
green.onmousedown = function () {
  element.style.backgroundColor = "green";
  this.classList.add("border");
};
green.onmouseup = function () {
  element.style.backgroundColor = "yellow";
  this.classList.remove("border");
};
red.onmousedown = function () {
  element.style.backgroundColor = "red";
  this.classList.add("border");
};
red.onmouseup = function () {
  element.style.backgroundColor = "yellow";
  this.classList.remove("border");
};
blue.onmousedown = function () {
  element.style.backgroundColor = "blue";
  this.classList.add("border");
};
blue.onmouseup = function () {
  element.style.backgroundColor = "yellow";
  this.classList.remove("border");
};

//小球滚动
let body = document.body;
let m = body.scrollWidth;
let n = body.scrollHeight;
console.log(m, n);
let move = document.getElementById("move");
function getElementOffset(element) {
  let offset = { left: 0, top: 0 };
  let current = element.offsetParent;

  offset.left += element.offsetLeft;
  offset.top += element.offsetTop;

  while (current !== null) {
    offset.left += current.offsetLeft;
    offset.top += current.offsetTop;
    current = current.offsetParent;
  }
  return offset;
}
let offset = getElementOffset(move);
console.log(offset);
window.onkeydown = function (event) {
  if (event.keyCode == 37) {
    if (offset.left < -170) {
      offset.left = m + 30;
    } else {
      offset.left -= 30;
    }
    // move.style.transform = `translate(-30px,0)`;
  } else if (event.keyCode == 38) {
    if (offset.top < -170) {
      offset.top = n + 30;
    } else {
      offset.top -= 30;
    }
    // move.style.transform += `translate(0,-30px)`;
  } else if (event.keyCode == 39) {
    if (offset.left > m + 30) {
      offset.left = -170;
    } else {
      offset.left += 30;
    }
    // move.style.transform = `translate(30px,0)`;
  } else if (event.keyCode == 40) {
    if (offset.top > n + 30) {
      offset.top = -170;
    } else {
      offset.top += 30;
    }
    // move.style.transform = `translate(0,30px)`;
  }
  move.style.transform = `rotate(${offset.left}deg)`;
  move.style.left = offset.left + "px";

  move.style.transform += `rotate(${offset.top}deg)`;
  move.style.top = offset.top + "px";
};

//input
let text = document.getElementById("text");
text.onkeypress = function (event) {
  console.log(event);
  let x = event.charCode;
  console.log(x);
  if (!((x >= 48 && x <= 57) || (x >= 97 && x <= 122))) {
    event.preventDefault();
  }
};
