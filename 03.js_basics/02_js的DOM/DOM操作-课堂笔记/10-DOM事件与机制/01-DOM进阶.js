/* 
    节点补充：

    替换子元素  
    父元素.replaceChild(新子元素孤儿节点,需要被替换的子元素)
    */

// let btn = document.getElementById("btn");
// document.getElementById("btn").onclick = function () {
//     let item = document.getElementById("myList"); //拿取父元素ul
//     let textnode = document.createElement("li"); //创建孤儿节点
//     textnode.innerHTML = "我是新的li";
//     item.replaceChild(textnode, item.children[1]);
//     //父元素.replaceChild(新元素,需要被替换的元素)
// };

// let a=2;
// // ++a;
// // a++;
// // console.log(a); // 4

// // let b=a++;
// // console.log(a++); // 2  打印a++这个表达式的值 并不是打印a  相当于下面的b变量的打印
// // console.log(b);
// //          2      3     5
// console.log(a++ + a++ + ++a); // 10

/* 
    createDocumentFragment() 文档碎片
    let frag = document.createDocumentFragment();
    创建一个文档碎片，先将多个"孤儿"节点 整合到这里面再统一添加。
    解决使用 appendChild 多次添加节点时，页面多次进行渲染的问题。
    使用 DocumentFragment 处理节点，速度和性能远远优于直接操作 DOM。
    */
// let box = document.getElementById("box");
// //    console.log(box);
// // 往box中动态添加100个 <p>我是p标签</p>
// // for(let i=0;i<10000;i++){
// //     let o = document.createElement("p");
// //     o.innerHTML = "我是p标签";
// //     box.appendChild(o);  //重新渲染10000次
// // }

// let frag = document.createDocumentFragment();
// for (let i = 0; i < 10000; i++) {
//   let p = document.createElement("p");
//   p.innerHTML = "我是p标签";
//   frag.appendChild(p);
// }
// box.appendChild(frag); // frag使用过之后 它自己消失
// flag = null;

// 练习1： 封装第:一个函数，这个函数可以返回元素的所有元素兄弟节点(兼容到ie6)
/* 
        <div id="box">
          <p>1111</p>
          <p>2222</p>
          <p>3333</p>
          <p id="para">para</p>
          <p>5555</p>
          <p id="last-p">6666</p>
        </div>
    */

// let para = document.getElementById("para");
// let lastP = document.getElementById("last-p");
// function getAllElementSibling(node) {
// // 前面的元素兄弟节点
// let prevs = [];
// 后面的元素兄弟节点
// let nexts = [];
// let o = node;
// //遍历node的前面的节点
// while (o.previousSibling != null) {
//     if (o.previousSibling.nodeType == 1) {
//       prevs.unshift(o.previousSibling);
//     }
//         o = o.previousSibling; //类似递归
//     }
//     o = node;  //赋值回来原来的元素
//     //遍历node的后面的节点
//     while (o.nextSibling != null) {
//         if (o.nextSibling.nodeType == 1) {
//         nexts.push(o.nextSibling);
//         }
//         o = o.nextSibling;
//     }
//     // 将两个数组合并返回
//     return prevs.concat(nexts);
// }

//乘法口诀表

// let myTable = document.querySelector("#my-table"); //父元素
// for (let i = 1; i <= 9; i++) { //外层for循环控制行数
//     //创建新的tr标签
//     let tr = document.createElement("tr"); //创建tr标签孤儿节点
//     for (let j = 1; j <= i; j++) {//内层for循环控制列数
//         //创建新的td标签
//         let td = document.createElement("td");//创建td标签孤儿节点
//         td.innerText = `${i} 乘 ${j} = ${i*j}`;
//         //tr里面追加td标签
//         tr.appendChild(td);
//     }
//     //myTable追加tr标签
//     myTable.appendChild(tr); // 挂载上树
// }

/* 
DOM事件   
   dom允许我们书写js代码以让HTML元素对事件做出反应

什么是事件  
   用户与网页的交互动作  当用户点击元素时/当鼠标移动到元素上时/当文本框的内容被改变时/当键盘在文本框中被按下时/当网页已加载完毕时........

什么是监听/侦听
   就是让计算机随时能够发现这个事件发生了，从而对这个事件做出反应（由程序员事先写好代码）

DOM有0级事件

常见的鼠标事件
onclick           鼠标单击事件
ondblclick        鼠标双击事件
onmouseenter      鼠标移入事件（只触发一次）
onmouseleave      鼠标移出事件
onmouseover(不常用) 鼠标移入事件(进入触发，进入子元素继续触发，从子元素出来到父元素还是触发) 
onmouseout(不常用)  鼠标移出事件(移出触发，移出子元素继续触发，从子元素出来到父元素还是触发)
onmousedown       鼠标一旦按下去就执行
onmouseup         鼠标抬起/松开就执行
onmousemove       鼠标在区域内移动（多次频繁触发）
onwheel           滚轮在区域内滚动
oncontextmenu     鼠标右键点击触发（一般需要结合阻止默认事件e.preventDefault();来使用）



*/

//  document.body.onclick=function (){
//     console.log("body被点击了");
//  }
//  let box=document.getElementById("box");
//  box.onclick=function (){
//     console.log("box被onclick了");
//  }
//  box.ondblclick=function (){
//     console.log("box被ondblclick了");
//  }
// box.onmouseenter=function (){
//     console.log("box被onmouseenter了");
//  }
//  box.onmouseleave=function (){
//     console.log("box被onmouseleave了");
//  }
//  box.onmouseover=function (){
//     console.log("box被onmouseover了");
//  }
//  box.onmouseout=function (){
//     console.log("box被onmouseout了");
//  }
//  box.onmousedown=function (){
//     console.log("box被onmousedown了");
//  }
//  box.onmouseup=function (){
//     console.log("box被onmouseup了");
//  }
//  box.onmousemove=function (){
//     console.log("box被onmousemove了");
//  }
//  box.onwheel=function (){
//     console.log("box被onwheel了");
//  }
//  box.oncontextmenu=function (e){
//     e.preventDefault();
//     console.log("box被oncontextmenu了");
//  }


//  let box=document.getElementById("box");
//  box.onclick = function(){
//     console.log("我是onclick事件");
//  }
//  box.ondblclick = function(){
//     console.log("我是ondblclick事件");
//  }
//  box.onmouseup = function(){
//     console.log("我是onmouseup事件");
//  }
//  box.onmousedown = function(){
//     console.log("我是onmousedown事件");
//  }
 // onmousedown --> onmouseup --> onclick --> ondblclick

//  box.onmouseenter = function(){
//     console.log("我是onmouseenter事件");
//  }
//  box.onmouseleave = function(){
//     console.log("我是onmouseleave事件");
//  }
//  box.onmouseover = function(){
//     console.log("我是onmouseover事件");
//  }
//  box.onmouseout = function(){
//     console.log("我是onmouseout事件");
//  }
//  box.onmousemove = function(){
//     console.log("我是onmousemove事件");
//  }
 // onmouseover --> onmouseenter --> onmousemove --> onmouseout --> onmouseleave

/* 
常见的键盘事件
onkeypress     当某个按键被按下时执行（系统按钮如箭头和功能键无法识别并监听）
onkeydown      某个按钮被按下执行，优先于onkeypress执行
onkeyup        某个按钮被松开时执行，优先于onkeypress执行

*/
// let myinput = document.getElementById("myinput");
// console.log(myinput);

// myinput.onkeypress = function(){
//     console.log("onkeypress事件被调用");
// }
// myinput.onkeydown = function(){
//     console.log("onkeydown事件被调用");
// }
// myinput.onkeyup = function(){
//     console.log("onkeyup事件被调用");
// }


/* 
常见的表单监听事件
onchange     当用户改变域的内容
onfocus      聚焦事件，当某元素获得焦点时触发
onblur       失焦事件，当某元素失去焦点时触发
onsubmit     当表单被提交时触发
onreset      当表单被重置时触发
*/

let myForm = document.getElementById("myform");//表单
let myField = document.getElementById("name-field");//姓名输入框
let ageField = document.getElementById("age-field");//age输入框
// console.log(myField,ageField);
// myField.onchange = function (){
//     console.log("onchange-事件被触发了");
// }
// myField.onfocus = function (){
//     console.log("onfocus-事件被触发了");
// }
// myField.onblur = function (){
//     console.log("onblur-事件被触发了");
// }
//注意是表单
// myForm.onsubmit = function (){
//     console.log("onsubmit-事件被触发了");
// }
// myForm.onreset = function (){
//     console.log("onreset-事件被触发了");
// }

/* 
常见的页面监听事件
onload     当页面或图像加载完成时触发
onunload   当页面卸载的时候执行（退出/关闭页面）

浏览器在加载一个页面的时候，是按照从上往下加载的，读取到一行就运行一行
如果将script标签写在页面上面会存在dom元素还没有生成就进行获取，会获取不到，onload就可以在整个页面加载完成之后再去执行里面的代码
*/
// window.onload = function(){
//     console.log("页面加载完成");
// }
// window.onunload = function(){
//     document.title = "haha"
//     console.log("页面onunload事件");
// }

// let box = document.getElementById("box");
// let arrbox = document.querySelectorAll(".box1");
// console.log(arrbox);
// box.onclick = function(){
//     // for(let i=0;i<arrbox.length;i++){
//     //     arrbox[i].classList.add("show")
//     // }
// }

// // 方法2.给祖先元素添加类名
// box.onclick = function(){
//     this.classList.add("show");
// }

/* 
事件冒泡  （从内部往外部冒泡）
   只会在同类型事件中触发
   event 事件对象，在事件函数中传进来，流程中可以直接使用
   event.stopPropagation(); 可以阻止事件冒泡（捕获）
   event.preventDefault(); // 阻止默认事件

   小练习：三层嵌套的盒子，点击哪一个哪一个的背景颜色进行变化，不能影响其他元素
*/
// let box = document.getElementById("box");
// let box1 = document.querySelector(".box1");
// let box2 = document.querySelector(".box2");

/* box.onclick = function(){
    console.log("box被点击了");
}
box2.onclick = function(){
    console.log("box2被点击了");
}
box1.onclick = function(){
    console.log("box1被点击了");
} */

/* box2.onclick = function(){
    console.log("box2被点击了");
}
box1.onmouseenter = function(){
    console.log("鼠标进入box1了");
}
box.onmouseleave = function(){
    console.log("鼠标移出box了");
} */

// box.onclick = function(){
//     // console.log("box被点击了");
//     this.style.backgroundColor="red";
// }
// box1.onclick = function(e){
//     e.stopPropagation(); // 阻止事件冒泡（捕获）阻止冒泡到box
//     // console.log("box1被点击了");
//     this.style.backgroundColor="blue";
// }
// box2.onclick = function(event){
//     event.stopPropagation(); // 阻止事件冒泡（捕获）阻止冒泡到box1和box
//     // console.log("box2被点击了");
//     this.style.backgroundColor="yellow";
// }

/*  
  多个点击事件(多个同类型事件)  onxxx不支持 后写会覆盖先写的
  onxxx 0级事件只会触发冒泡模式 
 */
// box2.onclick = function(event){
//     console.log("我是box2的第一个点击事件");
// };
// box2.onclick = function(event){
//     console.log("我是box2的第二个点击事件");
// };
// box2.onclick = function(event){
//     console.log("我是box2的第三个点击事件");
// };
// box2.onmouseenter = function(event){
//     console.log("我是box2的onmouseenter事件");
// };

// let boxa=document.getElementById("boxa");
// boxa.onclick = function(e){
//     e.preventDefault(); // 阻止默认事件 阻止了a标签的跳转
//     console.log("a标签被点击了");
// }

/* 
DOM 2级事件 
 事件的高级处理方式，一个事件可以绑定多个监听函数
 语法：
 元素.addEventListener(事件类型(注意不要加on),function(){
    执行流程代码
 },false)
 第一个参数：事件类型 如：click...
 第二个参数：是建函数
 第三个参数：可省略不填默认是false 设置为true那么就是捕获模式 

 注意： 改成true进行捕获模式之后 再使用e.stopPropagation()阻断捕获的话，就拿不到内层元素的事件了

 一般会使用二级事件较多
*/
let box = document.getElementById("box");
let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
/* box2.addEventListener("click",function(){
    console.log("我是box2的第一个点击事件");
})
box2.addEventListener("click",function(){
    console.log("我是box2的第二个点击事件");
})
box2.addEventListener("click",function(){
    console.log("我是box2的第三个点击事件");
}) */

/* box.addEventListener("click",function(e){
    e.stopPropagation();
    console.log("我是box的点击事件");
},false)
box1.addEventListener("click",function(e){
    e.stopPropagation();
    console.log("我是box1的点击事件");
},false)
box2.addEventListener("click",function(e){
    e.stopPropagation();
    console.log("我是box2的点击事件");
},false) */


// 杂着用同样支持
/* box2.onclick = function(){
    console.log("我是box2的onclick点击事件");
};
box2.addEventListener("click",function(){
    console.log("我是box2的addEventListener点击事件");
}); */


/* 
事件对象event

事件处理对象提供一个形式参数，他是一个对象，封装了本次事件的细节
这个参数通常我们使用单词event或字母e/ev来标识

获取event 所有浏览器都支持event对象 但是支持的方式不同 
普通浏览器：event 
ie678 window.event 作为window的对象来保存的
event = event || window.event //兼容写法

鼠标位置的一些属性
event.clientX       鼠标指针相对于浏览器的水平坐标
event.clientY       鼠标指针相对于浏览器的垂直坐标
event.pageX         鼠标距离整个网页的水平坐标
event.pageY         鼠标距离整个网页的垂直坐标
event.offsetX       鼠标相对于事件源元素的水平距离
event.offsetY       鼠标相对于事件源元素的垂直距离

*/
// box2.addEventListener("click",function(event){
//     event = event || window.event ;
//     // console.log(event);
//     console.log("event.clientX--",event.clientX);
//     console.log("event.clientY--",event.clientY);
//     console.log("event.pageX--",event.pageX);
//     console.log("event.pageY--",event.pageY);
//     console.log("event.offsetX--",event.offsetX);
//     console.log("event.offsetY--",event.offsetY);
// });


/* 
键盘敲击 onkeydown onkeyup 事件

event.charCode 一般配合onkeypress使用，表示用户输入的字符的"字符码"
字符                字符码
数字0 ~ 9           48~57
大写字母A~Z         65~90
小写字母a~z         97~122

event.keyCode  一般配合onkeydown和onkeyup事件，表示用户按下按键的"键码"
按键               键码    
数字0 ~ 9          48~57
字母不区分大小写    65~90
四个方向键(左，上，右，下)  37,38,39,40
回车键              13
空格                32
*/

// let oField1 = document.getElementById("field1");
// let oField2 = document.getElementById("field2");
// let oInfo1 = document.getElementById("info1");
// let oInfo2 = document.getElementById("info2");
// // console.log(oField1,oField2,oInfo1,oInfo2);

// oField1.onkeypress = function(e){
//     oInfo1.innerHTML=`您输入的字符码是${e.charCode}`;
// }

// oField2.onkeydown = function(e){
//     oInfo2.innerHTML=`您输入的键码是${e.keyCode}`;
// }


