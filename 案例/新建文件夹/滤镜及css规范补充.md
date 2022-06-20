### 遮罩效果

遮住一部分,只露出一部分表现效果

`css3`的属性,兼容性不好,IE浏览器不支持,`webkit`内核的浏览器(包括`chrome`、`safari`、`IOS`、`android`)需要添加`-webkit-`前缀。要特别注意的是，`firefox`浏览器也支持`-webkit-mask`属性。

各种游览器对我们写出来的效果不一样.各种标准更新迭代也很快,对新标准的支持程度也不一.所以我你们要写出兼容性前缀要它更好的识别。

```css
-webkit-mask-image:linear-gradient(red,transparent); 
-webkit-mask-image:radial-gradient(red 50%,transparent 50%); 
```

### 过滤

```css
/* 
对比度 filter:contrast(百分比); 默认是100%/1  负值无效
所谓对比度，简单理解的话就是一个区域里面每个颜色都会变得格外显眼，黑的更黑，白的更白

模糊 filter：blur（模糊半径）像素  默认0 负值无效
给图像设置高斯模糊。模糊半径的值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起， 所以值越大越模糊；

灰色色阶 filter：grayscale(百分比)默认是0% 最大100% 负值无效
该属性的作用较为简单，就是将一个颜色复杂的区域改造成一个只有黑白二色的区域。圆括号里面的值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0；

褐色色阶 filter：sepia(百分比)默认是0% 
该属性的作用同上，都是将某个区域的颜色进行简化，该属性会将一个颜色丰富的区域变成一种老黑白照片效果，让图片有一种轻微泛黄的样子

饱和度filter：saturate(100%)；默认100%  可以超过100% 负值无效  转换图像饱和度。圆括号里面的值定义转换的比例。值为0%则是完全不饱和，值为100%则图像无变化。其他值，则是效果的线性乘子。超过100%的值是允许的，则有更高的饱和度。 若值未设置，值默认是1。随着饱和度的增加，颜色就会更“清楚”。饱和度越小，颜色就会越“淡”；

亮度 filter: brightness(1.5);
当倍数值大于1的时候元素会变亮，小于1的时候元素会变暗
该属性的作用为调整元素当前的亮度，一般来说可以适用于鼠标悬浮到某元素时的提醒作用
*/
filter: blur(0px) contrast(1) grayscale(0%) sepia(0%) saturate(0%); 
```

### 浏览器解析网页的步骤

```
1.解析html构建dom树，解析css构建css树：将html解析成树形的数据结构，将css解析成树形的数据结构
2.构建render树：DOM树和CSS树合并之后形成的render树。
3.布局render树：有了render树，浏览器已经知道那些网页中有哪些节点，各个节点的css定义和以及它们的从属关系，从 而计算出每个节点在屏幕中的位置。
4.绘制render树：按照计算出来的规则，通过显卡把内容画在屏幕上。
```

###### 正确书写`css`样式的作用

减少浏览器`reflow`（重排），提升浏览器渲染`dom`树的性能，增强代码清晰度，可维护性……

```css
.box{  
    display: ;  
    visibility: ;  
    float: ;  
    clear: ;  

    position: ;  
    top: ;  
    right: ;  
    bottom: ;  
    left: ;  
    z-index: ;  

    width: ;  
    min-width: ;  
    max-width: ;  
    height: ;  
    min-height: ;  
    max-height: ;  
    overflow: ;  

    margin: ;  
    margin-top: ;  
    margin-right: ;  
    margin-bottom: ;  
    margin-left: ;  

    padding: ;  
    padding-top: ;  
    padding-right: ;  
    padding-bottom: ;  
    padding-left: ;  

    border-width: ;  
    border-top-width: ;  
    border-right-width: ;  
    border-bottom-width: ;  
    border-left-width: ;  

    border-style: ;  
    border-top-style: ;  
    border-right-style: ;  
    border-bottom-style: ;  
    border-left-style: ;  

    border-color: ;  
    border-top-color: ;  
    border-right-color: ;  
    border-bottom-color: ;  
    border-left-color: ;  

    outline: ;  

    list-style: ;  

    table-layout: ;  
    caption-side: ;  
    border-collapse: ;  
    border-spacing: ;  
    empty-cells: ;  

    font: ;  
    font-family: ;  
    font-size: ;  
    line-height: ;  
    font-weight: ;  
    text-align: ;  
    text-indent: ;  
    text-transform: ;  
    text-decoration: ;  
    letter-spacing: ;  
    word-spacing: ;  
    white-space: ;  
    vertical-align: ;  
    color: ;  

    background: ;  
    background-color: ;  
    background-image: ;  
    background-repeat: ;  
    background-position: ;  

    opacity: ;  

    cursor: ;  

    content: ; 
}
```



### `CSS`代码的行为规范

1. 类名要做到见名思意，不要以完全没有语义的标签作为类名。
2. `CSS`属性值为0的不要带单位。如：`margin: 0;`
3. 删除无用的`CSS`样式。可以减少整个网页文档的体积，提升网页的加载速度；所有的样式规则都会被浏览器检索解析，去除后可以减少浏览器的索引项，加快浏览器的检索速度。

######  `html`命名示范

######   https://www.cnblogs.com/LifeiBoke/p/6791528.html
