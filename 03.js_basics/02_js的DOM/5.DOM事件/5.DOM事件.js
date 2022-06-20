/*
 $ @Author: lishuangling
 $ @Date: 2022-06-20 09:34:53
 $ @LastEditTime: 2022-06-20 15:02:04
 $ @Description: 
 */
/* 
一、BOM是什么？
    1.window对象是当前js脚本运行所处的窗口，而这个窗口中包含DOM结构，window.document属性是一个document对象
    2.在有标签功能的浏览器中，每个标签都拥有总结的window对象，也就是说，每一个窗口的标签页之间不会共享一个window对象
    3.全局变量，会成为window对象的属性
    4.内置函数普遍是window的方法，比如setTimeout(),alert()
    innerHeight     浏览器窗口的内容区域的高度，包含水平滚动条(如果有的话)
    innerWidth      浏览器窗口的内容区域的宽度，包含水平滚动条(如果有的话)
    outHeight       浏览器窗口外部高度
    outWidth        浏览器窗口外部宽度

    clientHeight    浏览器窗口的内容区域的高度，不包含水平滚动条
    clientWidth     浏览器窗口的内容区域的宽度，不包含水平滚动条
    注意：document.documentElement.clientHight

    onresize        监听浏览器窗口尺寸变化
    onfocus/onblur  进入当前页面时触发/离开当前页面时触发(配合title修改内容)  
    onscroll        当窗口被卷动之后触发
        用法：
        1.window.scrollY 表示页面卷上去的内容(是只读的)
        2.document.documentElement.scrollTop 表示页面卷上去的内容(不是只读的)
        可以兼容写法 :
            let scroll=window.scrollY||document.documentElement.scrollTop
    navigator       对象
        用法：
        window.navigator.方法
        userAgent   浏览器的用户代理(内含有内核消息和封装壳信息)
        appName     浏览器的官方名称
        appVersion  浏览器版本
        platform    用户操作系统
    
    window.history 对象
    提供了操作浏览器会话历史的接口，可以模拟浏览器前进后退
        back        返回上一个页面
        forward     跳转下一个页面
        go(n)       跳转到那个页面，需要n为整数作为参数，
        参数：
            1       跳转下一个页面相当于forward
            2       跳转下两个页面
            -1      返回上一个页面
            0       刷新当前页面
    window.location对象
    标识当前所在的网址，可以通过赋值进行页面跳转
     用法：
        window.location.方法
    href
    reload()        刷新页面
    reload(true)    强制刷新页面

二、元素宽高获取
    元素.clientWidth    元素的宽(包含左右padding)
    元素.clientHeight   元素的高(包含上下padding)

    元素.offsetWith     元素的宽(包含左右padding及border)
    元素.offsetHeight   元素的高(包含左右padding及border)
    

    元素.scrollHeight   元素的高度，内容超出也进入高度计算，给了超出隐藏也不会减少高度获取 

三、元素之间的各种距离
    元素.offsetTop      获取元素顶部距离最近带有有效定位属性的元素的距离
    元素.offsetLeft     获取元素左边距离最近带有有效定位属性的元素的距离
    注意：
        (1)有效定位属性：relative/absolute/fixed/sticky,如果没有会找到body身上
        (2)寻找具有定位属性的父元素：元素.offsetParent,如果自身有fixed属性则为null
    元素.scrollTop      可以获取元素内部的内容被卷去的高度
    元素.scrollLeft     可以获取元素内部的内容被卷去的宽度


*/





let box = document.querySelector('.box')
let x = box.offsetLeft

// 定时器实现动画
/* box.addEventListener('click', () => {
    let timer = setInterval(() => {
        x += 10
        if (x > 400) {
            clearInterval(timer)
        }
        box.style.left = x + 'px'
    }, 20);

}) */
let flag = 1
// 函数的节流
let lock = 1

box.addEventListener('click', () => {
    if (!lock) return;
    // 函数核心代码
    box.classList[flag ? "add" : "remove"]("move")
    flag = !flag
    // 关锁
    lock = 0
    // 两秒之后开锁
    setTimeout(() => {
        lock = 1
    }, 2000);

})
let goto = document.getElementById('goto')
// goto.href='https://taobao.com'
goto.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'https://taobao.com'

})
// 放回顶部
let goTop = document.querySelector('#top')
// document.documentElement.scrollTop==1000

let timer
window.onscroll = function () {
    if (document.documentElement.scrollTop >= 1000) {
        // goTop.style.opacity = 1
        goTop.style.display = "block";

        goTop.onclick = function () {
            timer = setInterval(function () {
                console.log(1);
                document.documentElement.scrollTop -= 100
                console.log(document.documentElement.scrollTop);
                // goTop.style.opacity = 0
                goTop.style.display = "none";

            }, 20)

        }
    } else if (document.documentElement.scrollTop == 0) {
        clearInterval(timer)
        // goTop.style.opacity = 0
        goTop.style.display = "none";


    }

}