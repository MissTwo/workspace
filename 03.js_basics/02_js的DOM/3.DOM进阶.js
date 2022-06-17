/*
 $ @Author: lishuangling
 $ @Date: 2022-06-16 09:58:48
 $ @LastEditTime: 2022-06-17 11:10:06
 */
/* 
一、什么是事件
    用户与网页的交互动作 点击、鼠标移动、文本修改、键盘按下等

二、什么是监听/侦听
    就是让计算机随时能够发现这个事件发生了，从而对这个事情作出反应(由我们事先写好了代码)

三、DOM的0级事件：
    1.鼠标事件
        onclick             单击
        ondblclick          双击
        onmouseenter        鼠标移入(只触发一次)
        onmouseleave        鼠标移入
        onmouseover(较少用)  鼠标移入事件(进入触发，进入子元素持续触发，从子元素出来到父元素还是触发)
        onmouseout          鼠标移出事件(移出触发，移出子元素持续触发，从子元素出来到父元素还是触发)
        onmousedown         鼠标一旦按下
        onmouseup           鼠标抬起/松开就执行
        onmousemove         鼠标区域内移动
        onmousewheel/onwheel滚轮再区域内滚动
        oncontextmenu       鼠标右键点击触发(一般结合阻止默认事件使用)

    鼠标点击触发顺序：
        onmousedown->onmouseup->onclick->ondblclick
    鼠标移过触发顺序：
        onmouseover->onmouseenter->onmousemove->onmouseout->onmouseleave

    2.键盘事件
        onkeypress(弃用)    当某个按键被按下时执行(功能按键无法识别监听，如：系统、方向)
        onkeydown           某个按键被按下执行，优先于onkeypress
        onkeyup             某给按键被松开执行，优先于onkeypress

    3.表单监听事件
        onchange            当用户改变域的内容就会触发
        onfocus             聚焦事件,当元素获取焦点时触发
        onfocusin           聚焦事件，区别支持冒泡
        onblur              失焦事件,当元素失去焦点时触发
        onfocusout          失焦事件，区别支持冒泡
        onsubmit            当表单提交时触发(绑定给表单)
        onreset             当表单被重置时触发(绑定给表单)
        oninput             当表单内正在输入的时候
        onselect            下拉框选择后触发

    4.页面监听事件
        onload              当页面或图像加载完成时触发
        onunload            当页面卸载的时候执行(退出/关闭页面)
        onresize            浏览器窗口发生变化的时候触发
        onscroll            页面滚动条滚动时
        
注意：浏览器在加载一个页面的时候，按照从上至下读一行运行一行，如果将script放在页面上会存在dom元素还没有生成就进行获取，会获取不到，需要用onload在页面加载完成后再执行代码

四、事件冒泡(从内往外)
    只会再同类型事件中触发(Propagation：传播)
    阻止冒泡/捕获
        event.stopPropagation();
    
    阻止默认事件
        event.preventDefault();

注意：
    (1)多个点击事件(同类型的情况),后覆盖前
    (2)onxxx 0级事件只会触发冒泡模式

五、DOM的2级事件
    事件的高级处理方式，一个事件可以绑定多个监听函数
    语法：
        元素.addEventListener("事件类型不加on",function(){
            执行流程代码
        },false)
        
        第一个参数：事件类型(eg:click)
        第二个参数：函数
        第三个参数：可省略不填默认是false,设置为true就是捕获模式
    注意：
        (1)改成true进行捕获模式之后，在使用e.Propagation()拿不到内层元素的事件了
        (2)2级与0级事件混用可以，但是不推荐，后期均用2级事件

六、事件对象event
        1.事件处理对象提供一个形式参数，他是一个对象，封装了本次事件的细节，这个参数通常我们使用event或者e来标识

        2.获取event一般所有浏览器都支持event对象，但是支持的方式是不同的
            普通浏览器：event
            ie678 window.event 作为window的对象来保存的
            兼容写法：event=event||window.event

        3.鼠标位置的一些属性
            event.clientX   鼠标指针相对于浏览器的水平坐标
            event.clientY   鼠标指针相对于浏览器的垂直坐标
            event.pageX     鼠标距离整个网页的水平坐标
            event.pageY     鼠标距离整个网页的垂直坐标
            event.offsetX   鼠标相对于事件源的水平距离
            event.offsetY   鼠标相对于事件源的垂直距离

        4.一般配合onkeypress使用
            event.charCode  表示用户输入字符的Unicode码

            字符        字符码
            数0-9       48-57
            大写A-Z     65-90
            小写a-z     97-122
            
        5.键盘敲击 onkeydown onkeyup 事件
            event.keyCode   表示用户按下的键码

            按键        键码
            数组0-9     48-57
            字母        65-90
            四个方向键   37、38、39、40(左上右下)
            回车        13
            空格        32
*/
let box=document.querySelector('.box')
let one=document.querySelector('.one')
let flag=1
box.onclick=function(){
    if(flag){
        this.classList.add('change')
        flag=0
    }else{
        this.classList.remove('change')
        flag=1
    }
    
}
let first=document.querySelector('.first')
let second=document.querySelector('.second')
let third=document.querySelector('.third')

first.onclick=function(event){
    this.style.backgroundColor='red';
}
second.onclick=function(event){
    // 阻止事件冒泡(或者捕获)
    event.stopPropagation();
    this.style.backgroundColor='blue';
}
third.onclick=function(event){
    event.stopPropagation();
    this.style.backgroundColor='yellow';
}
