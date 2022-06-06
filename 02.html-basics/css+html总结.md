# css+html总结

### 一、背景

##### 1.背景颜色

```html
background-color:green;
```

##### 2.背景图片

```html
background-image:url('./xxx.jpg')
```

###### 注意：背景图片可以插入多张，用逗号隔开。

```html
background-image:
				url('./xxx.jpg'),
				url('./xxx.png');
```



##### 3.背景重复

```html
background-repeat:no-repeat	
```

##### 4.背景尺寸

```html
background-size:100px;
background-size:100%;
background-size:contain;
background-size:cover;
```

取值：

1.像素值，分别代表宽度、高度

2.百分比，代表相对于父级元素的宽度与高度的百分比

3.contain,代表图片缩放成合适背景定位区域的最大大小，换言之：背景平铺到只要有一个边缘碰到元素边界，就停止拉伸 ，不对图片进行裁切

4.cover,代表将图像缩放成将完全覆盖背景区域的最小大小，换言之：背景平铺满整个背景，铺满后就停止拉伸 ，会对图片进行裁切

###### 注意：

- 在像素值和百分比情况下，如果:只给出一个值，第二个值自动设置为auto

- contain与cover都不会按照图片比例缩放

##### 5.背景位置

```
background-position:left top;
background-position:100px 100px;
```

取值：代表x方向与y方向

1.方位关键词：left、right、top、bottom、center(还可以两两搭配)

2.百分比：水平方向、垂直反向。

​				0% 0%左上角

​				100% 100%右下角

3.像素值：水平位置、垂直位置

4.inherit：从父元素继承

##### 6.背景原点

```html
background-origin:padding-box|border-box|content-box;
```

取值：

- padding-box背景图像填充到padding

- border-box背景图像填充到边界边框

- content-box背景图像填充到主要内容处

##### 7.背景剪切

```html
background-clip:padding-box|border-box|content-box;
```

取值：

- padding-box剪切成衬矩方框

- border-box剪切成边框方框

- content-box剪切成内容方框

##### 8.复合写法

```html
background:-color -url('./xxx.jpg') -repeat -position/size -origin -clip
```

例如多张图片的复合型样式写法

```html
background:
	url('./xxx.jpg') no-repeat left top/cover ,
	url('./xxx.png') right top/cover ,

```

### 二、背景渐变：原理就是一张背景图片

##### 1.线性渐变

```html
background-img:linear-gradient(to 方向,颜色(百分比/像素值),颜色(百分比/像素值)~~~,颜色 终点)
```

##### 2.径向渐变

圆形

```
background-img:radial-gradient(circle 半径 at 方向,颜色(百分比/像素值),颜色 终点)
```

椭圆

```
background-img:radial-gradient(ellipse 横轴半径 纵轴半径 at 方向,颜色(百分比/像素值),颜色 终点)
```



### 三、BFC模型

##### 1.概念：BFC全称Block format context块级格式化上下文

形式独立的渲染区域，内容元素的渲染不会影响外界

##### 2.BFC的特性：

父节点与第一个子节点的上外边距重叠或者兄弟节点的外边距发生重叠

内部元素不会影响外部元素

不会与浮动元素重叠

元素的高度计算会包括浮动元素的高度

##### 3.如何创建BFC：

float值不为none

overflow值不为visible

position值不为static或relative

display的值为inline-block,table,table-cell

flex元素

##### 4.解决问题：

高度塌陷

清除浮动

包裹浮动