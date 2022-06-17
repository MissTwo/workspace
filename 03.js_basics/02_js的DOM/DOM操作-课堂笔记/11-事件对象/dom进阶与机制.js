// 练习1： 制作一个宽高200px的盒子  按下方向键上下左右可以往对应的方向每次移动 3px的距离

/* let oBox = document.getElementById("box");
//全局变量t , l 分贝表示盒子的top和let属性默认值
let t = 200;
let l = 200;
document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 37:
      l -= 3;
      break;
    case 38:
      t -= 3;
      break;
    case 39:
      l += 3;
      break;
    case 40:
      t += 3;
      break;
  }
  //更改样式
  oBox.style.left = l + "px";
  oBox.style.top = t + "px";
}; */

/* 
练习2：制作一个文本框，只能让用户在其中输入小写字母和数字，其他字符输入没有效果 <input type="text"/>
 */

/* let oField = document.getElementById("field");
oField.onkeypress = function (e) {
  //根据用户输入的字符的字符码(e.charCode)
  //数字0~9  字符码48~57
  //小写字母a~z 字符码是97~122
  if (
    !(
      (e.charCode >= 48 && e.charCode <= 57) ||
      (e.charCode >= 97 && e.charCode <= 122)
    )
  ) {
    //阻止默认行为
    e.preventDefault();
  }
  console.log(e.charCode);
};
window.onkeypress=function(e){
  console.log(e.charCode);
} */

// let box = document.getElementById("box");
// let box1 = document.querySelector(".box1");
// let box2 = document.querySelector(".box2");
// box.addEventListener("click",function(){
//     console.log("我是box的点击事件");
// },false)
// box1.addEventListener("click",function(){
//     console.log("我是box1的点击事件");
// },true)
// box2.addEventListener("click",function(){
//     console.log("我是box2的点击事件");
// },false)

/* 
小案例 ：
 制作鼠标滚轮事件: 当鼠标在盒子中向下滚动时，数字加1,反之，数字减1.
 onwheel  onmousewheel   时间对象e提供的一个参数 deltaY 属性滚轮滚动的方向 ，向下滚动时返回正值   向上滚动的时候返回负值
*/
// let box=document.getElementById("box");
// box.onwheel = function(e){
//   if(e.deltaY>0){
//     box.innerHTML = parseInt(box.innerHTML)+1;//注意进行一下转数字
//   }else{
//     box.innerHTML-=1
//   }
// }
// box.onmousewheel = function(e){
//   console.log(e.deltaY);
// }

/* 
事件委托   
  请批量给20 li 添加点击事件  我点击谁 谁的文字变色
*/

// 请给ul动态添加20个li  添加li点击事件  我点击谁 谁的文字变色
// let myul = document.getElementById("list");
// let myLi = document.createDocumentFragment(); //创建文档碎片
// for(let i = 0;i<20;i++){
//   let li=document.createElement("li");
//   li.innerHTML="我是li标签";
//   li.onclick = function(){
//     this.style.color="red";
//   }
//   myLi.appendChild(li); //推入文档碎片
// }
// myul.appendChild(myLi); //将整理好的文档上树
//每一个监听注册侧都会消耗一定的内存，批量循环的操作会导致监听数量太多，内存消耗非常大
// let myul = document.querySelectorAll("#list");
// let list = document.querySelectorAll("#list li");
// //使用for循环批量添加
// for(let i = 0;i<list.length;i++){
//   list[i].onclick=function(){
//     this.style.color="red";
//   }
// }

/* 
事件委托：
可以利用事件冒泡机制将后代元素的事件 委托给祖先元素
e.target          触发此事件的最早的元素，即"事件源元素"
e.currentTarget   事件处理程序附加到的元素(事件是给谁绑定的就是谁)

事件委托的使用场景：当有大量的元素需要添加事件监听的时候，使用事件委托可以减少内存消耗
*/
// let myul = document.getElementById("list"); // ul标签
// myul.onclick = function(e){
// //  console.log(e.target);
//  e.target.style.color="red";
// //  console.log(e.currentTarget);
// }

/* 
事件委托注意事项：
只有支持冒泡机制的事件能够使用，**不能委托不冒泡的事件给祖先元素**
*/
// let myul = document.getElementById("list"); // ul标签
// myul.onmouseenter = function(e){ //onmouseover没有冒泡机制
// //  console.log(e.target);
//  e.target.style.color="red";
// }
// myul.onmouseover = function(e){ //onmouseover有冒泡机制
//   //  console.log(e.target);
//    e.target.style.color="red";
//   }

// myul.onclick = function(e){ //onmouseover没有冒泡机制
// //  console.log(e.target);
//  e.target.style.color="red"; //点击span只有span变红
// }

/* 
以下事件不冒泡：
blur、focus、load、unload、onmouseenter、onmouseleave,也就是说他们的事件触发不会传播到父元素那里
evevt.bubbles 这个参数返回true和false 可以检测该事件是否有冒泡机制
*/
// myul.onclick = function(e){ //onmouseover没有冒泡机制
//  console.log(e.bubbles);
// }

// 写具名函数 处理函数实现封装好
// myul.addEventListener("click",function(){
//   console.log(3+4);
// },false)

/* 
事件函数传参
*/
// myul.addEventListener("click",function(e){
//   // add2(3,4);
//   add3(3,4);
// },false)
// function add1(){
//   console.log(7);
// }
// function add2(a,b){
//   console.log(a+b);
// }
// function add3(a,b,c){
//   console.log(a+b);
//   console.log(c);
// }

/* 
oninput     当表单内正在输入的时候
onselect    下拉框选择后触发

onresize    浏览器窗口大小改变的时候触发
onscroll    页面滚动条滚动时
*/
// window.onresize = function(){
//   console.log("窗口大小被改变了");
// }
// window.onscroll = function(){
//   console.log("onscroll执行了");
// }
/* 
onfocusin   同 onfocus 但是支持冒泡
onfocuout   同 onblur  但是支持冒泡
*/

//小练习： 当鼠标进入大盒子，小盒子跟着鼠标移动
// let box = document.querySelector("#box");
// let box2 = document.querySelector(".box2");
// box.onmousemove = function(e){ //会抖动
//   e.stopPropagation();
//   box2.style.left = e.offsetX-25 +"px";
//   box2.style.top = e.offsetY-25 +"px";
// }
// box.addEventListener("mousemove",function(e){
//   // e.stopPropagation();
//   box2.style.left = e.offsetX-25 +"px";
//   box2.style.top = e.offsetY-25 +"px";
// })
//方案2
// box2.addEventListener("mousemove",function(e){
//   e.stopPropagation();
// })

// document.body.addEventListener("mousemove",function(e){
//   box2.style.left = e.clientX-25 +"px";
//   box2.style.top = e.clientY-25 +"px";
// })

/* 
document的DOMNodeRemoved事件  dom中一旦有元素被删除就可以获取到这个事件
*/

// 封装兼容性事件处理函数
// let eventUtil = {
//   addHandler: function (element, type, handler) {
//     //元素，事件类型，事件处理函数
//     //绑定事件
//     // chrome、firefox、 IE9等addEventListener
//     // IE8及IE8以下的浏览器attachEvent
//     if (element.addEventListener) {
//       element.addEventListener(type, handler, false);
//     } else if (element.attachEvent) {
//       element.attachEvent("on" + type, handler);
//     } else {
//       element["on" + type] = handler;
//     }
//   },
//   getTarget: function (event) {
//     return event.target || event.srcElement;
//   },
//   preventDefault: function (event) {
//     if (event.preventDefault) {
//       event.preventDefault();
//     } else {
//       event.returnValue = false;
//     }
//   },
//   stopPropagation: function (event) {
//     if (event.stopPropagation) {
//       event.stopPropagation();
//     } else {
//       event.cancelBubble = true;
//     }
//   },
//   removeHander: function (element, type, handler) {
//     //移除事件
//     //chrome、firefox、 IE9等removeEventListener
//     //E8及IE8以下的浏览器detachEvent
//     if (element.addeventListener) {
//       element.removeEventListener(type, handler, false);
//     } else if (element.attachEvent) {
//       element.detachEvent("on" + type, handler);
//     } else {
//       element["on" + type] = null;
//     }
//   },
// };

// let box = document.querySelector("#box");
// let box2 = document.querySelector(".box2");
// eventUtil.addHandler(document, "DOMNodeRemoved", function (event) {
//   console.log(1111);
// })
// box.onclick = function () {
//   box.removeChild(box2);
// };

// 排它操作
// let myul = document.getElementById("myul");
// let ulList = document.querySelectorAll("#myul li");
// // console.log(myul,ulList);
// for(let i = 0;i<ulList.length;i++){
//   ulList[i].onclick=function(){
//     for(let j=0; j<ulList.length;j++){
//       ulList[j].classList.remove("active")
//     }
//     this.classList.add("active");
//   }
// }

//方法2 使用事件委托少写一轮批量添加事件的循环
// let myul = document.getElementById("myul");
// let ulList = document.querySelectorAll("#myul li");
// myul.onclick=function(e){
//   for(let j=0; j<ulList.length;j++){
//     ulList[j].classList.remove("active")
//   }
//   e.target.classList.add("active");
// }

/* 
事件解绑 
事件元素.removeEventListener("click",fn)
*/
// let box=document.getElementById("box");
// box.addEventListener("click",fn)
// function fn(){
//   console.log("点击事件");
// }
// box.removeEventListener("click",fn)



/* 
BOM  
定时器
语法： setInterval(函数执行体,时间); 时间单位 ms 毫秒
循环调用，每隔一段时间调用一次函数体代码

延时器 
语法： setTimeout(函数执行体,时间); 时间单位 ms 毫秒
在等待时间后 只执行一次  延迟执行函数体内的代码
 */

// setInterval(function(){
//   console.log(1);
// },1000)
// setTimeout(function(){
//   console.log(1);
// },2000)
// let num=1;
// function fn(){
//   console.log(num);
//   num++;
// }
// setInterval(fn,1000)

/* 
定时器与延时器参数
第二个时间参数后面的参数会按顺序传入 函数体中
*/

// setInterval(function(a,b){
//   console.log(a+b);
// },1000,10,20)

/* 
清除定时器
  定时器，延时器的返回值可以使用一个变量保存起来，这个变量就可以当做作这个定时器，延时器的名字，我们使用clearInterval(名字);clearTimeout(名字)就可以进行清除

  clearInterval(timer);clearTimeout(timer);
*/
// let box = document.getElementById("box");
// let timer;  // 用于接收定时器返回值的
// let n = 0;
// timer = setInterval(function(){
//   console.log(1);
// },200)
// timer = setTimeout(function(){
//   console.log(1);
// },2000)

// box.onclick = function(){
//   // clearInterval(timer);
//   clearTimeout(timer); //清除延时器
// }

// n = 0；每隔一秒加一并打印  n到5的时候不在增长和打印
// timer = setInterval(function(){
//   n++;
//   console.log(n);
//   if(n === 5){
//     console.log("定时器清除了");
//     clearInterval(timer);
//   }
// },1000)

// 按开始 开始计数， 每隔一秒增加1, 按暂停清除定时器
// let oInfo = document.getElementById("info");//文本展示
// let oStart = document.getElementById("start"); //开始按钮
// let oEnd = document.getElementById("end"); //结束按钮
// let timer;
// let a=0;

/* 
开启定时器容易造成一个事件堆积，当事件太短执行不过来
设置定时器的时候 注意"设表先关"
*/
// oStart.onclick = function(){
//   clearInterval(timer); //"设表先关"
//   timer = setInterval(function(){
//     oInfo.innerText = ++a;
//   },1000)
// }
// oEnd.onclick = function(){
//   clearInterval(timer);
// }

/* 
有些时候  我们的定时器和延时器 可以使用一些方式互换（互相实现对方的功能）
*/

// 定时器转延时器
// timer = setInterval(function(){
//     oInfo.innerText = ++a;
//     if(a==1){
//       clearInterval(timer);
//     }
// },1000)

// 延时器转定时器
// let num = 0;
// let max = 10;
// function add(){
//   num++;
//   console.log(num);
//   if(num < max){
//     setTimeout(add,1000);
//   }else{
//     clearTimeout(add)
//   }
// }
// setTimeout(add,1000);

/* 
初步认识 异步语句
javascript是"单线程语言"，就是代码必须按照顺序一行一行的，setTimeout(),
和setInterval();是异步语句

异步语句（asynchronous）：不会阻塞cpu继续执行其他语句，当异步完成时，会执行"回调函数(callback)"
 异步不会阻断代码执行
 同步会阻断代码执行
*/

// console.log(1);
// console.log(2);
// alert(3);  // 阻断代码执行
// console.log(4);
// console.log(5);


// console.log(1);
// console.log(2);
// setTimeout(function(){ //让子弹飞一会  异步语句不会阻断代码运行
//   console.log(3);
// },3000);
// console.log(4);
// console.log(5);

// console.log(1)
// setTimeout(function(){
//     console.log(2)
// } ,1000)
// console.log(3)
// setTimeout(function () {
//     console.log(4)
// },0)
// console.log(5)
// 1 3 5 4 2



























