### rem单位

`em`：单位是一个相对单位，如果自身设置了字体大小`16px`，那么 `1em = 16px `，如果自身没有设置，就在父级或祖先元素逐层往上找，那么这时 `1em = 父级或祖先元素的字体大小`。

`rem`：只参照根标签`html`字体大小，`1rem = 根标签的字体大小`



### @media媒体查询

```css
@media mediatype and|not|only (media feature) {
    ......
}
媒体查询语法
关键词 @media 
媒体类型 mediatype
连接词  and|not|only
媒体查询条件 （media feature）
{ 样式 }

一般响应式是需要写在css样式末尾，在媒体查询中添加样式代码时注意权重问题。
```



### line-height 设置问题

当我们给文本设置字体大小,会依照比例(1.32)给这行文字设置行高,行高撑开了这个盒子 ，给`line-height`设置了没有单位`1.5`,行高就是当前元素`font-size`的1.5倍，后面所有元素的`font-size`都会和行高成比例。

  如果`body`的`font-size`为`16px`,`line-height:1.5;`那么默认的`line-height`就是`24px;`后面所有元素会继承自己文字的1.5倍。

  如果`body`的`font-size`为`16px`，`line-height:100%;`那么默认的`line-height`就是`16px;`后面所有元素会继承这个行高为固定的`16px`。

**总结：如果body设置行高用的百分比或em,其子元素继承的都是计算后得到的固定行高,不会与自己的字体大小成比例。如果body设置行高用无单位的值如`1.5`，那么子元素继承的 `行高=1.5*自身字体大小;`永远与自己的font-size成比例。**



### bootstrap

略