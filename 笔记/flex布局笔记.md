### flex弹性布局

```html
<div class="bigbox">
    <div class="smallbox">1</div>
    <div class="smallbox">2</div>
    <div class="smallbox">3</div>
    <div class="smallbox">4</div>
    <div class="smallbox">5</div>
</div>
```

```css
.bigbox{
    width:400px;
    height:400px;
    display:flex;
}
```

###### 父元素设置为弹性容器

`display:flex;`将父元素设置为弹性盒子（称为弹性容器），对外展示为块级特性，对内子元素拥有弹性元素特性。

`display:inline-flex;` 对外展示为行内块特性，对内子元素拥有弹性元素特性。

子元素: 水平排列  不独占整行  可以设置宽高 margin  padding生效。不固定高度时默认会占父级高度的100%，不固定宽度时由内容撑开。

###### 子元素设置排列方向

```css
/* 设置 子盒子的排列方向（设置 主轴方向） */
flex-direction: row; 默认 主轴水平向右、侧轴垂直向下
row-reverse: 主轴水平向左、侧轴垂直向下
column: 主轴垂直向下、侧轴水平向右
column-reverse： 主轴垂直向上，侧轴水平向右  

/* 换行方式  */
flex-wrap: nowrap; /* 默认子元素不换行展示  在主轴上被压缩 */
flex-wrap: wrap;
flex-wrap: wrap-reverse; /* 反向换行 */

/* 复合写法 */
flex-flow: row wrap;
```

###### 子元素主轴上排列属性

```css
justify-content: flex-start;默认
center; 居中展示 
flex-end; 在主轴末尾位置展示

分散式布局（）
space-around  相当与所有元素都拥有相同的左右margin 
space-between 两侧元素靠主轴两边排列 中间的元素平分空间
space-evenly  两侧以及元素之间的间距完全相等
```

###### 子元素在侧轴上的排列属性

```css
align-items: stretch; 默认（如果子元素没有设置高度 将拉伸到父元素高度100%）
flex-start  center  flex-end

多行子元素分散式布局方案
（align-content一般是配合flex-wrap: wrap;这条属性来使用 适应与子元素换行展示后拥有多行的时候的布局）
align-content: flex-start/center/flex-end(将子元素挤在一起来排列) space-between/space-evenly/space-around（将子元素分散在侧轴排列）;
```

###### 子元素在父元素内垂直居中的方案

```css
父元素设置
display: flex;
justify-content: center;
align-items: center;
```

###### 子元素控制自己的元素（只能用在弹性元素中）

```css
/*
1.order:0;调整子元素自己的排列位置  默认是0 越小顺序越靠前 越大越靠后

2.flex-grow: 0;默认值为0  负数无效  可以设置为小数
弹性子元素的膨胀因子，代表该元素参与瓜分剩余空间的系数（份数）  设置了数值之后这个值会覆盖元素的宽度设置

所有子元素的膨胀系数相加<1份的情况下
该元素自己分的的空间 = 自己的系数 * 总多余空间

所有子元素的膨胀系数相加>=1份的情况下
该元素自己分的的空间 =（自己的系数/总系数）* 总多余空间

3.flex-shrink: 1; 弹性元素缩小因子 默认1 不换行的情况下当空间不够时 默认弹性元素会被压缩 可以设置为0让它不被压缩
该元素自己被压缩的空间 =（自己的系数/总系数）* 总缺失部分

4.flex:initial; flex是flex-grow,flex-shrink,flex-basis的缩写/简写 
默认 initial ： 0  1  auto
none： 0 0 auto (也可以写成flex:0;)
inhert： 继承
auto：   1   1  auto (也可以写成flex:1;)

5.flex-basis:auto; 在分配多余空间前，子元素占据主轴的空间，浏览器根据这个属性来计算弹性盒子是否有剩余空间
可以使用百分比及其他单位（px em  rem）来定义宽度 负值无效

6.align-self: auto; 默认auto
子元素控制自己在侧轴上的排列方式 可以覆盖父元素align-items的设置
flex-start  flex-end  center
*/
```

###### 计算属性`calc();`

```css
/* css3计算属性 */
width: calc(100px * 2);
运算符左右两边必须有空格100px * 2,可以有两个不同的单位计算
+ - 加减法必须都有单位
* / 乘除法 只能前一个数带单位
```

