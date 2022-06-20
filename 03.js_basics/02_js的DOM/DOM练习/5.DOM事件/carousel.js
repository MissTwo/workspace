/*
 $ @Author: lishuangling
 $ @Date: 2022-06-20 16:57:14
 $ @LastEditTime: 2022-06-20 19:48:55
 */
let container = document.querySelector('.container')
let content = document.querySelector('.content')
let clone = content.cloneNode(true)
container.appendChild(clone)

let timer = setInterval(() => {
    move()
}, 60);
let x = 0;
function move() {
    x -= 5
    console.log(x);
    if (x == -720) {
        x=0
    }
    container.style.transform =`translateX(${x}px)` 
}
container.addEventListener('mouseenter',(e) => {
    clearInterval(timer)
})
container.addEventListener('mouseleave',() => {
    timer = setInterval(() => {
        move()
    }, 60);
})
// 第二题
let substance=document.querySelector('.substance')



