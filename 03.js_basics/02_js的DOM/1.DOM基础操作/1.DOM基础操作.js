/*
 $ @Author: lishuangling
 $ @Date: 2022-06-20 15:26:59
 $ @LastEditTime: 2022-06-20 15:31:04
 */
/* 
DOM（Document Object Model）文档对象模型，特点：将文档表示为节点
概念：访问元素节点：就是“得到”、“获取”页面上的元素节点，访问节点主要依靠document文档对象, 是DOM中最重要的东西。几乎所有的功能都封装在document对象，也是html文档，DOM节点的根。

一、获取元素的方式
    1.通过id名：document.getElementById('id名')

    let a = document.getElementById('root')
    注意：
        (1)如果页面有相同的id名元素，只能找到第一个，不管嵌套多深都可以找到
        (2)id名命名的元素，在js中可以不直接获取直接书写id名字拿元素

    2.通过标签名：document.getElementsByTagName('标签名')

    let b = document.getElementsByTagName('div')
    注意：
        (1)通过标签获取一个伪数组，如果只有一个复合条件的元素获取到的仍然是数组

    3.通过name属性：document.getElementsByName('name的属性')

    let c = document.getElementsByName('sex')
    注意：
        通过伪数组形式返回获取元素，只有一个元素也会返回数组，表单用的最多

    4.通过选择器获取元素：document.querySelector('选择器')

    let d = document.querySelector('.item')
    注意：
        如果有多个复合条件的元素只拿第一个

    5.通过选择器获取所有复合条件的元素：document.querySelectorAll('选择器')

    let a = document.querySelectorAll('div')
    注意：
        通过伪数组返回获取元素，如果只有一个元素同样用数组返回该元素

    6.通过选择器类名获取所有复合条件的元素：document.getElementsByClassName("类名")

    注意：
    通过伪数组返回获取元素，如果只有一个元素同样用数组返回该元素
    注意：
        (1)我们常用的方法中，必须用document开头的有：
            document.getElementById('id名')
            document.getElementsByName('name的属性')
        (2)利用父级元素获取(嵌套b属于a)
            let a = document.getElementById('root')
            let b = a.querySelectorAll('div')

二、特殊元素的获取：
    head、body、title、documentElement(获得的html)等
    用法：
    let a = document.head
    let a = document.body
    let a = document.title
    let a = document.documentElement //获得的html


三、延迟运行：js代码一般写在body结束标签之前 否则js可能根本无法获取到元素
    使用 window.onload = function () { } 事件，使页面加载完毕之后在执行指定的代码

四、DOM事件：什么是js事件？
    事件就是文档或浏览器窗口中发生一些特点的交互瞬间。
    eg：用户在一个网页上做出的某些特定操作

五、DOM的0级事件
    语法：ele.on事件名 = 执行脚本
    功能：在DOM中元素ele上绑定事件
    执行脚本可以使一个匿名函数，也可以是一个函数的调用：
    let root = document.getElementById('root')

    方法1：匿名函数
    root.onclick = function () {
        console.log('xxx');
    }

    方法2：函数调用
    root = fn;//注意：不能写括号，写了之后直接调用失效
    function fn() {
        console.log('xxx');
    }

六、注册事件：
            onclick         鼠标点击事件
            onmouseenter    鼠标移入事件(鼠标进入一次它只执行一次)
            onmouseleave    鼠标移出

七、操作标签的内容：
    1.元素.innerText 只能解析纯文本内容
    let root = document.getElementById('root')
    root.innerText = "你好啊！"

    2.元素.innerHTML 可以解析标签也可以放文本内容
        (1)新增标签及动态内容
            let root = document.getElementById('root')
            let str = '我是段落'
            root.innerHTML = `<p>${str}</p>`

        (2)在原本有的东西上追加新的标签及内容：
            原理：模板字符串进行拼接
                ①在后面添加新的标签及内容
                list.innerHTML += `<li>我是li 3</li>`
                ②在前面添加新的标签及内容
                list.innerHTML = `<li>我是li 3</li>` + list.innerHTML

八、操作元素css样式：
    1.js可以直接操作style标签(不用，不好控制选择器优先级)
        let myStyle = document.querySelector("style");
        myStyle.innerHTML = `* {
                                margin: 0;
                                padding: 0;
                                list-style: none;
                            }`;

    2.行内css样式控制
        (1)行内单个样式的添加：
            root.style.color = "red"
            root.style.backgroundColor = "black"
        (2)行内批量添加行内样式：
            root.style.cssText = "width: 300px;height: 300px;background-color: pink;"
            不推荐：
            root.style = "width: 300px;height: 300px;background-color: pink;"

九、操作元素的属性:
    1.操作合法属性时，直接元素打点属性名，进行调用及修改
        (1)元素.title = '修改的title值'
        (2)元素.className = '类名'
        追加新的类名：
            ①字符串拼接太过生硬
            one.className += ' two'

           ②重新赋值 多个类名用空格分开
            one.className = 'one two'

    注意：修改类名比较特殊, 重新赋值会覆盖之前的类名样式

    2.使用H5新增classList来代替className, 给元素追加类名
        (1)添加类名：
            元素.classList.add("类名")
        (2)删除类名：
            元素.classList.remove("类名")
        (3)类名切换：如果之前有就移出，如果没有就添加
            元素.classList.toggle("类型")

    注意：如果元素没有class会新增，如果class属性会新增不会覆盖

十、元素的不合法属性(自定义属性)操作：
    1.获取属性值：
    元素.getAttribute("属性名");
    2.设置 / 修改属性值：
    元素.setAttribute("属性名", "属性值");
    3.删除属性：
    元素.removeAttribute("属性名");
    注意：同样可以操作合法属性
 */

let a = document.getElementById('root')
let str = '我是段落'
// a.innerText=111
// a.innerHTML=`<p>${str}</p>`
let list = document.querySelector('.list')
let btn = document.querySelector('button')
btn.onclick = function () {
    // 放后面
    // list.innerHTML+=`<li>我是li 3</li><li>我是li 4</li>`
    // 放前面
    list.innerHTML = `<li>我是li 3</li><li>我是li 4</li>` + list.innerHTML
}
let box = document.querySelector('#box')
// 函数调用
/* function fn() {
    box.className = "box1"
}
box.onclick = fn; */
// 匿名函数
// this 指向打点调用的对象
box.onclick = function () {
    this.className = "box1"
}
/* box.onclick=function(){
    box.style.width="300px"
    box.style.height="300px"
    box.style.backgroundColor='pink'

} */
let one = document.querySelector('.one')
one.onclick = function () {
    // one.className += ' two'//字符串拼接太过生硬
    one.className = 'one two'//重新赋值 多个类名用空格分开

    //     one.style.color='yellow'
}
let f = document.getElementsByClassName
