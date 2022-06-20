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
}, 10);
let x = 0;
function move() {
    x -= 1
    if (x == -720) {
        x = 0
    }
    container.style.transform = `translateX(${x}px)`
}
container.addEventListener('mouseenter', (e) => {
    clearInterval(timer)
})
container.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
        move()
    }, 10);
})
// 第二题
let substance = document.querySelector('.substance')
let right = document.querySelector('.right')
let left = document.querySelector('.left')
let images = document.querySelector('.images')
let h = 0, time, lock = 0;


left.addEventListener('click', function () {
    if (lock) return
    lock = 1
    // time = setInterval(() => {
        transformLeft()
        // clearInterval(time)
    // }, 100);

    setTimeout(() => {
        lock = 0
    }, 1000);

})
right.addEventListener('click', function () {
    if (lock) return
    lock = 1
    // time = setInterval(() => {
        transformRight()
        // clearInterval(time)
    // }, 100);
    setTimeout(() => {
        lock = 0
    }, 1000);
})
function transformRight() {
    h -= 400
    images.style.transition = `1s`
    images.style.transform = `translateX(${h}px)`
    if (h == -2000) {
        setTimeout(() => {
            h = 0
            images.style.transition = `0s`
            images.style.transform = `translateX(${h}px)`
        }, 1000);
    }
}
function transformLeft() {
    if (h == 0) {
        h = -2000
        images.style.transition = `0s`
        images.style.transform = `translateX(${h}px)`
        setTimeout(() => {
            h += 400
            images.style.transition = `1s`
            images.style.transform = `translateX(${h}px)`
        }, 1);
        return
    }
    h += 400
    images.style.transition = `1s`
    images.style.transform = `translateX(${h}px)`
}

let minute=document.querySelector('.minute')
let second=document.querySelector('.second')
let hour=document.querySelector('.hour')
let s=0,ho=0,m=0;
setInterval(() => {
    s+=6
    second.style.transform= `rotate(${s}deg)`;
}, 1000);
setInterval(() => {
    m+=6
    minute.style.transform= `rotate(${m}deg)`;
}, 1000*60);
setInterval(() => {
    ho+=1
    hour.style.transform= `rotate(${ho}deg)`;
}, 1000*60*10);


