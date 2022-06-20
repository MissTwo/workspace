//   let list = document.querySelectorAll("li");
//   for (let i = 0; i < list.length; i++) {
//     list[i].onclick = function () {
//       for (let j = 0; j < list.length; j++) {
//         list[j].classList.remove("red");
//       }
//       if (this.classList.contains("red")) {
//         this.classList.remove("red");
//       } else {
//         this.classList.add("red");
//       }
//     };
//   }
//   let list = [];
//   for (let i = 0; i < 20; i++) {
//     list[i] = document.createElement("li");
//     list[i].innerHTML = "我是li标签";
//     ul.appendChild(list[i]);
//     list[i].onclick = function () {
//       for (let j = 0; j < list.length; j++) {
//         list[j].classList.remove("red");
//       }
//       if (this.classList.contains("red")) {
//         this.classList.remove("red");
//       } else {
//         this.classList.add("red");
//       }
//     };
//   }
let ul = document.querySelector("ul");
ul.addEventListener("click", function (e) {
    let list = this.children;
    for (let i of list) {
        i.classList.remove("red");
    }
    console.log(e.target);
    e.target.classList.add("red");
});
