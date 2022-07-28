/*
    回调函数
        1、函数本身，不是函数的返回值，作为参数传递到另一个函数使用
        2、函数的执行操作交给了另一个函数

        注意：回调函数本身即可以是普通函数也可以匿名函数
 */

function t1() {
    console.log("回调函数-t1");
}

let t2 = function() {
    console.log("回调函数-t2");
}

let t3 = () => console.log("回调函数-t3");

// callback为一个参数名，一般看到之后就要理解，它可能是一个回调函数
function t4(callback) {
    console.log(callback);
    callback();
}

function t5() {
    return function() {
        console.log("回调函数-t5")
    }
}

t4(1);// 1()
// t4(t1()); 不是回调函数的使用方式
t4(t1);
t4(t5());

t4(function() {
    console.log("回调函数，使用匿名函数")
})