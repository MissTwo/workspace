/*
 $ @Author: lishuangling
 $ @Date: 2022-06-16 16:32:49
 $ @LastEditTime: 2022-06-17 09:32:37
 */

let one = document.querySelector(".one")
let two = document.querySelector(".two")
let three = document.querySelector(".three")
let square = document.querySelector(".square")
one.addEventListener('click', () => {
    square.classList.remove("change3")
    square.classList.remove("change2")
    square.classList.toggle("change1")
})
two.addEventListener('click', () => {
    square.classList.remove("change1")
    square.classList.remove("change3")
    square.classList.toggle("change2")
})
three.addEventListener('click', () => {
    square.classList.remove("change1")
    square.classList.remove("change2")
    square.classList.toggle("change3")
})
let move = document.querySelector('.move')
window.onkeydown = function (e) {
    let level = move.offsetLeft
    let vertical = move.offsetTop
    if (e.keyCode === 37) {
        level -= 3
    } else if (e.keyCode === 38) {
        vertical -= 3
    } else if (e.keyCode === 39) {
        level += 3
    } else if (e.keyCode === 40) {
        vertical += 3
    }
    move.style.left = level + `px`
    move.style.top = vertical + `px`
}
let user = document.getElementById('user')
user.addEventListener('keypress', function (e) {
    if (e.charCode >= 48 && e.charCode <= 57 || e.charCode >= 97 && e.charCode <= 122) {

    } else {
        e.preventDefault();
    }
})