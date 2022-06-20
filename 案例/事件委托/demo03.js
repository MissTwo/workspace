let box = document.querySelector(".box");
let lists = document.querySelector("#lists");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let one = document.querySelector(".one");
let loop = document.querySelector(".loop");

let colorArr = ["red", "green", "blue", "yellow", "orange"];

let listsChild = document.createDocumentFragment();

for (let i = 0; i < colorArr.length; i++) {
  let li = document.createElement("li");
  li.innerHTML = i+1;
  li.style.backgroundColor = colorArr[i];
  listsChild.appendChild(li);
}
lists.appendChild(listsChild);

let x = 0;
let n = lists.children.length;

//单向
one.onclick = function (e) {
  if (loop.classList.contains("enter")) {
    loop.classList.remove("enter");
  }
  this.classList.add("enter");

  prev.onclick = function (e) {
    if (x < 0) {
      x += 500;
      lists.style.transform = `translate(${x}px, 0)`;
    }
  }
  next.onclick = function (e) {
    if (x > -500 * (n - 1)) {
      x -= 500;
      lists.style.transform = `translate(${x}px, 0)`;
    }
  }
}

//循环
loop.onclick = function (e) {
  if (one.classList.contains("enter")) {
    one.classList.remove("enter");
  }
  this.classList.add("enter");

  prev.onclick = function (e) {
    if (x < 0) {
      x += 500;
    } else {
      x = -500 * (n - 1);
    }
    lists.style.transform = `translate(${x}px, 0)`;
  }
  next.onclick = function (e) {
    if (x > -500 * (n - 1)) {
      x -= 500;
    } else {
      x = 0;
    }
    lists.style.transform = `translate(${x}px, 0)`;
  }
}
