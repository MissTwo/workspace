#### DOM（Document Object Model）文档对象模型

###### 什么是DOM？

中立于平台和语言之间的接口，它允许程序和脚本动态的访问和更新文档的内容、结构、样式。

###### 获取元素的方法

使用DOM操作元素之前，要先获取到元素节点

```html
<div id="bigbox">
    <div class="smallbox">我是smallbox</div>
    <div class="smallbox">我是smallbox</div>
    <input type="radio" name="sex" id="">男
    <input type="radio" name="sex" id="">女
</div>
```

```js
//获取id名为"bigbox"的元素，返回一个元素对象
document.getElementById("bigbox"); 

//获取所有类名为"smallbox"的元素，返回元素对象数组
document.getElementsByClassName("smallbox"); 

//获取所有div标签元素，返回元素对象数组
document.getElementsByTagName("div"); 

//获取所有name名为"sex"的元素，返回元素对象数组 
document.getElementsByName("sex"); 

document.querySelector("#bigbox"); //获取id名为"bigbox"的元素

document.querySelector(".smallbox"); //获取第一个类名为"smallbox"的元素

document.querySelectorAll(".smallbox"); //获取所有类名为"smallbox"的元素
```

**获取特定元素**

```js
document.documentElement; //获取html元素
document.head; //获取head元素
document.body; //获取body元素
document.title; //获取title元素
```

###### `window.onload`

**window.onload()** 通常用于 在网页加载完毕后立刻执行的操作，在页面完全载入后(包括图片、css文件等等)执行脚本代码。

```js
window.onload = function () { //页面加载完毕之后 再加载函数体内的代码
    let myDiv = document.querySelectorAll("div");
    console.log(myDiv);
}
```

###### DOM事件

```js
onclick       //鼠标点击事件
onmouseenter  //鼠标移入事件
onmouseleave  //鼠标移出事件
```

```js
let myDiv = document.querySelector('body');
myDiv.onclick = function (){
    console.log("我被点击了");
}
myDiv.onmouseenter = function () {
    console.log("鼠标进入了");
}
myDiv.onmouseleave = function () {
    console.log("鼠标离开了");
}
```

###### 修改文本节点的内容

```js
let myDiv = document.getElementById("bigbox"); 
console.log(myDiv.innerText); //返回元素文本，不包括HTML代码
console.log(myDiv.innerHTML); //返回元素所有文本，包括HTML代码

myDiv.innerHTML = `<p>hello world</p>`;
console.log(myDiv.innerHTML); //<p>hello world</p>
myDiv.innerText = `你好 世界`;
console.log(myDiv.innerText); //你好 世界
```

###### 操作元素css样式

```js
let myDiv = document.getElementById("bigbox"); 

//批量添加行内样式
myDiv.style.cssText = "width:300px;height:300px;backgroundColor:pink;"

//针对样式单一设置
myDiv.style.width = "300px";
myDiv.style.width = "300px";

//新增类名，default是原有类名，myDiv是新增类名
myDiv.className = "default myDiv";

//H5中新增classList
myDiv.classList.add("myDiv");     //追加类名
myDiv.classList.remove("myDiv");  //移出类名
myDiv.classList.toggle("myDiv");  //如果之前有就移除类名，没有就添加，用于事件中
```

###### 获取/设置元素的属性

```html
<a id="href" name="baidu" target="_blank" href="http://baidu.com">baidu</a>
```

```js
let href = document.getElementById("href"); 

//获取js自带的属性 如：name、id、href、target等
console.log(href.id,href.name,href.target,href.href);

//自定义属性名和值，必须两个参数，可用来操作js自带属性
href.setAttribute("JiaJi","111")
href.setAttribute("name","href")

//获取属性的值
href.getAttribute("JiaJi");
href.getAttribute("id");

//多个参数只会返回第一个参数的属性值
href.getAttribute("JiaJi","id");
```