### `HTML5`新增标签

###### `<header></header>`头部标签

###### `<footer></footer>`尾部标签

在使用上相当于div块级元素，`HTML5`系列元素更加注重语义化（提高代码的可读性、可维护性、可重用性。）

###### `<main></main>`主体标签

网页主体内容，一个网页最好只有一个。

###### `<section></section>`区块标签

一般用于网页主体内容中的区块划分，内部可以嵌套其他任何标签。

###### `<nav></nav>`导航标签

###### `<article></article>`段落文字标签

类似于用法与P标签一样，但是没有P标签的默认属性。

###### `<details><summary>标题</summary></details>`可以理解为详情标签

用于元素内容的展示与隐藏，与 `summary`标签配合使用可以为 details 定义标题。标题是可见的，用户点击标题时，会显示出 details中详情内容。比如：

```html
<details>
    <summary>标题</summary>
    <ul>
        <li>内容内容内容内容内容内容</li>
    </ul>
    <a href="">lianjie</a>
    内容内容内容内容内容内容
</details>
```

默认展示效果：![image-20220517233825567](https://jjimg-1309015283.cos.ap-chengdu.myqcloud.com/image-20220517233825567.png)

当用户点击标题时展示效果：![image-20220517233908936](https://jjimg-1309015283.cos.ap-chengdu.myqcloud.com/image-20220517233908936.png)

###### `<aside></aside>`侧边栏标签

###### `<figure></figure>`可以理解为图片装载标签

`figure`标签用于装载图片一类的资源，语义化非常强，利于`seo`优化。

使用时与 `<figcaption></figcaption>`配合使用，内部放一些对图片的描述。

比如：

```html
<figure>
    <img src="./smallimg.jpg" alt="img21"/>
    <figcaption>
        <h2>图片标题 <span>图片标题</span></h2>
        <div>
            <p>描述文字</p>
            <p>描述文字</p>
            <p>描述文字</p>
        </div>
        <a href="#">链接</a>
    </figcaption> 
</figure>
```

显示效果：![image-20220517234657785](https://jjimg-1309015283.cos.ap-chengdu.myqcloud.com/image-20220517234657785.png)



```html
<!-- progress进度条 行内块特性 min最小值 max最大值 -->
项目进度：<progress value="20" min="1" max="100"></progress><br>

<!-- meter度量条，行内块，value值<low时绿色，low<value值<high时黄色，value值>high时红色 
low和high不设置的话 全部绿色-->
<meter value="70" min="1" max="100" low="60" high="80"></meter>

<!-- time标签 span标签差不多的行内标签  用于标识时间 -->
<p>
    我在<time datetime="2022-05-20">情人节</time>有个约会。
</p>

<!-- mark标签  行内  默认背景色黄色 其他和span一样 -->
<time datetime="2022-5-20 00:00:00">今天</time>我在<mark>上课</mark>
```

显示效果：![image-20220517235136068](https://jjimg-1309015283.cos.ap-chengdu.myqcloud.com/image-20220517235136068.png)

### `input`新增标签

```html
<input type="hidden" name="" id="">
<!-- 隐藏域，用于携带参数，比如数据库中的id值 一个数组的key值等-->

<input type="file" name="" id="" multiple>
<!-- 上传文件，默认一次只能上传一个文件，当添加了multiple属性后可以同时上传多个文件 -->

<h3>常见输入类型</h3>
<p>text password radio checkbox button file hidden submit reset image</p>

<h3>新的输入类型</h3>
<p>email-邮箱（会提示输入是否符合格式） search-搜索 tel-电话</p>

<pre>
    <strong>日期等</strong>   
    date
    time
    datetime
    datetime-local
    month
    week 
</pre>
<input type="number">
<input type="range">
<!-- number-数字和range-滑块的属性基本一致 min最小值 max最大值 step步长 -->
<pre>
    <strong>color 颜色</strong> 
    标签的value属性中只能写颜色的十进制值，如：#000000
</pre>


 <!-- form属性，可以将input标签放在表单的外面，还受到表单的管理 -->
    <!-- 指定了id为ff -->
    <form action="" id="ff" >
      <input type="submit" value="提交">
    </form> 
    <!-- 设置属性form=”ff“，指定id="ff"的表单 -->
    <input type="text" required form="ff" pattern="^1[358]\d{9}}">
    <!-- 必须以1开头，第二位是3、5、8的，后面在跟随便9位数字 -->
    required: 必填验证
    novalidate: 关闭验证
    在表单上添加该属性，提交的时候就不会再执行required验证
    pattern：自定义验证-通过编写正则表达式自定义验证规则 一般和required同时使用。
```

```html
<strong>datalist 可输入下拉列表</strong><br>

<input type="text" list="my_list">

<datalist id="my_list">
    <option value="广州">广州</option>
    <option value="深圳">深圳</option>
</datalist>
```

显示效果图：![image-20220518001359080](https://jjimg-1309015283.cos.ap-chengdu.myqcloud.com/image-20220518001359080.png)

### 多媒体标签

###### `video视频标签和audio音频标签`

video：大小默认由内容撑开，如果给video容器设置了宽高，video不能铺满时会默认宽/高继承100%，但是会导致容器留白，不会改变视频的原有比例。

```css
object-fit: contain;默认值效果
object-fit: fill;内容铺满整个容器 内容不会裁剪 会使内容变形
object-fit: cover;不会使内容变形  但是铺满后超出的会裁剪
```

video基本语法格式

```html
<video src="" controls autoplay muted loop preload="auto"></video>
注意：autoplay自动播放（现在大部分浏览器需要配合muted静音播放才生效），preloa资源预加载，不与autoplay一起使用

<!-- 兼容写法 -->
<video controls>
    <source src="" type="video/mp4"></source>
您的浏览器不支持视频播放
</video>
<!--
type可取值：
格式     mime-type
mp4      video/mp4
webm     video/webm
ogg      video/ogg
-->
```

audio：不设置控制控件属性不会展示。基本语法格式

```html
<audio src="" controls loop preload="auto"></audio>

<!-- 兼容写法 -->
<audio controls>
    <source src="" type="audio/mpeg"></source>
您的浏览器不支持音频播放
</audio>
<!--
type可取值：
格式     mime-type
mp3      audio/mpeg
wav      audio/wav
ogg      audio/ogg
-->
```

### 过渡动画

过渡：元素的`css`属性在一定的时间内平滑变化，可以提升用户体验，也叫做触发式动画。

```css
/* 
复合型样式  只有时间不能省略 其他都可以省略
如果写两个时间 第一个代表持续时间
*/
transition: all 1s 1s linear; 
/*复合写法,逗号分隔*/
transition: width 1s linear,
			height 3s 1s linear;
/* 持续时间transition-duration 单位s-秒  ms-毫秒  1s=1000ms 默认0 */
/* transition-duration: 3s; */

/* 动画延迟时间transition-delay 默认0*/
/* transition-delay: 1s; */

/* 过渡属性指定对哪个样式生效transition-property  默认all  多个属性逗号分隔*/
/* transition-property: width; */

/* 动画速率transition-timing-function  
默认ease 慢-快-慢
ease-in-out 快-慢-快
ease-in 慢-快
ease-out 快-慢
linear 匀速
steps(n) 步数 分几段去闪现完成这一段动画 1s内达到60步的时候 就是与linear匀速差不多的动画效果了
x1,x2取值0-1之间  运动曲线越陡 速率越快
cubic-bezier(x1,y1,x2,y2) 贝塞尔曲线
https://cubic-bezier.com/
*/
```

### `2d`变化属性

```css
transform: ;
/*变换属性，默认变换原点是元素的中心点*/
transform-origin: 50% 50%;/*修改元素的变换原点，接收两个值，分别是x轴和y轴，单位可以是像素*/
transform: translate(0px,0px); 
/*平移属性
第一个值: x轴平移距离 正值往右  负值往左
第二个值: y轴平移距离 正值往下  负值往上
很像我们的相对定位  根据自己原来的位置来移动  不影响文档流布局
百分比单位是根据元素自身的宽高计算
*/
transform: rotate(45deg);
/*旋转属性  角度单位deg 度
正值顺时针方向   负值逆时针方向
*/
transform: scale(2); 
/*缩放属性
取值[0,1]缩小   [1,+∞)放大
负值[-1,0]倒置缩小  [-∞,-1]倒置放大
网页字体安全字体大小是最小12px  比这个还小的数值不生效 通过
transform: scale();属性可以实现在12px的基础上再缩小字体
transform: scaleX(-1); 左右翻转
transform: scaleY(-1); 上下翻转
*/
transform: skew(30deg);
/*倾斜属性  
包含两个参数值，分别表示X轴和Y轴倾斜的角度，如果第二个参数为空，则默认为0，参数为负表示向相反方向倾斜。
skewX(<angle>);表示只在X轴(水平方向)倾斜。
skewY(<angle>);表示只在Y轴(垂直方向)倾斜。
*/

/* 有形状才有变化 transform对行内元素不生效 */
```

块级元素在父元素体内垂直水平居中

```css
/* 块级元素在父元素体内垂直水平居中的方案：*/
/*父元素*/ 
position: relative;
/*子元素*/ 
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);

/*父子元素确定宽高*/
/*父元素*/ 
position: relative;
/*子元素*/ 
position: absolute;
top: 0;
left: 0;
right:0;
bottom:0;
margin:auto;
```

