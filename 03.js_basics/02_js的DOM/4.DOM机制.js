/*
 $ @Author: lishuangling
 $ @Date: 2022-06-17 09:48:21
 $ @LastEditTime: 2022-06-17 17:34:58
 */
/* 
一、事件委托：可以利用事件冒泡机制将后代元素的事件委托给祖先
    e.target            触发此事件的最早的元素，即"事件源元素"
    e.currentTarget     事件处理程序附加到的元素(事件是给谁绑定的就是谁)
    e.bubbles           检验事件冒泡是否有冒泡机制，返回布尔值

    1.使用场景：当有大量的元素需要添加事件监听的时候，使用事件委托可以减少内容消耗

    2.注意事项：
        (1)只有支持冒泡机制(捕获机制)的事件能够使用
            不冒泡事件：
            blur    focus   load    unload  onmouseenter    onmouseleave


二、事件解绑
    事件元素.removeEventListener("事件",方法)
三、BOM
    1.定时器
    语法：setInterval(函数执行体,时间)
    时间单位是ms,循环调用，每隔一段时间调用一次函数体
    2.延时器
    语法：setTimeout(函数执行体,时间)
    等待时间后，只执行一次，延迟执行函数体内的代码
    
    传参：第二个时间参数后面的参数会按顺序传入到函数体中
    setInterval(function(a,b){
        a+=b
    }1000,10,20)

    清除定时器
    定时器、延时器的返回值可以使用一个变量保存起来，这个变量就可以当作这个定时器、延时器的名字，我们使用clearInterval(名字),clearTimeout(名字)就可以进行清除
四、初步认识，异步语句
js是单线程语言，代码必须按照顺序执行，setInterval与setTimeouts 是异步语句
异步语句:不会阻塞cpu继续执行其他语句，但异步完成时，会执行回调函数
异步不会阻断代码执行，同步会阻断代码执行
*/


let box = document.querySelector('.box')
box.innerHTML = 1
box.addEventListener('mousewheel', (e) => {
    if (e.deltaY >= 0) {
        box.innerHTML = parseInt(box.innerHTML) + 1
    } else {
        box.innerHTML -= 1
    }
})
let list = document.querySelector('#list')
// 文档碎片
let frag = document.createDocumentFragment()
// 每一个监听注册会消耗一定的内存，批量循环会导致监听太多，内存消耗大
for (let i = 0; i < 5; i++) {
    let item = document.createElement('li')
    item.innerHTML = 111
    /* item.addEventListener('click', () => {
        item.style.color = 'red'
    }) */
    frag.appendChild(item)
}
list.appendChild(frag)
// 将每一个li的事件委托给祖先元素
list.addEventListener('click', (e) => {
    e.target.style.color = 'red'
})
let nav = document.querySelectorAll('#list li')
nav[0].classList.add('change')

for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener('click', () => {
        for (let j = 0; j < nav.length; j++) {
            nav[j].classList.remove('change')
        }
        nav[i].classList.add('change')
    })
}


// 写具名函数，处理封装好函数

// 1.不要参数
/* list.addEventListener('click',fn,false)
function fn(){
    console.log(1);
} */

// 要传参
/* list.addEventListener('click',function(){
    add(2,3)
})
function add(a,b){
    console.log(a+b);
} */
/* let region=document.querySelector(".region") 
let move=document.querySelector('.move')
window.addEventListener('mousemove',(e) => {
    console.log(e.clientY);
    // move.offsetLeft=e.clientX
    // move.offsetTop=e.clientY 
    move.style.left= e.clientX+"px"  
    move.style.top= e.clientY+"px" 

}) */

// 轮播图
let content = document.querySelector('.content')
let contentList = document.querySelectorAll('.content li')
let color = ["palegreen", "tomato", "yellow", "aquamarine", "peru"]
for (let i = 0; i < contentList.length; i++) {
    contentList[i].style.backgroundColor = color[i]

}
let left = document.querySelector('.direction-left')
let right = document.querySelector('.direction-right')
let r = content.offsetLeft

right.addEventListener('click', () => {
    if (r > -2000) {
        r += -500
    }
    content.style.left = r + "px"
})
left.addEventListener('click', () => {
    if (r >= -2000 && r < 0) {
        r += 500
    }
    content.style.left = r + "px"
})
// 定时器
let n = 0
/* let timer=setInterval(() => {
n++
console.log(n);
if(n===5){
    clearInterval(timer)
}
},1000) */
let start = document.getElementById('start')
let stops = document.getElementById('stop')

let num = document.querySelector('.num')
let timer
let m=0;
num.innerHTML=m
// 开启定时器容易造成一个事件堆积，当事件太短执行不过来，设置定时器的时候，注意要先关
start.addEventListener("click",() => {
    clearTimeout(timer)
    timer = setInterval(() => {
        num.innerHTML = ++m;
    }, 1000)
})
stops.addEventListener("click",() => {
    clearTimeout(timer)

})
