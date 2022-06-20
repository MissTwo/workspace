{"objectClass":"NSDictionary","root":{"objectClass":"MindNode","ID":"D1G36","rootPoint":{"objectClass":"CGPoint","x":356.7529274004684,"y":1132.5},"lineColorHex":"#BBBBBB","children":{"0":{"objectClass":"MindNode","ID":"J28Q5","lineColorHex":"#DC306C","children":{"0":{"objectClass":"MindNode","ID":"RHC2L","lineColorHex":"#DC306C","text":"类选择器\n.class"},"1":{"objectClass":"MindNode","ID":"52VQI","lineColorHex":"#DC306C","text":"id选择器\n#id"},"2":{"objectClass":"MindNode","ID":"88G84","lineColorHex":"#DC306C","text":"通配符选择器\n*"},"3":{"objectClass":"MindNode","ID":"255L4","lineColorHex":"#DC306C","text":"标签选择器\ndiv，p，a"},"4":{"objectClass":"MindNode","ID":"MHRWE","lineColorHex":"#DC306C","text":"父子选择器\ndiv p\ndiv>p"},"5":{"objectClass":"MindNode","ID":"VSL83","lineColorHex":"#DC306C","text":"兄弟选择器\ndiv+p\ndiv~p"},"6":{"objectClass":"MindNode","ID":"22MG1","lineColorHex":"#DC306C","text":"伪类选择器\na:link     未访问的超链接\na:visited  已访问的超链接\na:active   活动中链接\na:hover    鼠标在链接上面时\n:first-child 第一个子元素\n:last-child  最后一个子元素\n:nth-child(n) 第n个子元素\n:nth-of-type(n) 第n个子元素\n:nth-last-child(n) 倒数第n个子元素"},"objectClass":"NSArray"},"text":"css选择器"},"1":{"objectClass":"MindNode","ID":"45526","lineColorHex":"#BF58F5","children":{"0":{"objectClass":"MindNode","ID":"744P7","lineColorHex":"#BF58F5","text":"元素默认样式：不同浏览器有不同表现,通过以下代码去除默认样式。\n*{\nmargin: 0;\npadding: 0;\nlist-style: none;\ntext-decoration: none;\n}"},"1":{"objectClass":"MindNode","ID":"SULC5","lineColorHex":"#BF58F5","text":"display:block;\n块级元素，默认独占一行，可以设置宽高和内外边距。\n块级元素里面可以放任何标签。\np标签里面不能再放任何块级标签。\n块级元素中会存在父子上外边距重叠问题（仅针对第一个子元素），处理方案：\n方案1: 给父元素设置padding-top\n方案2；给父元素上border\n方案3；给父元素开启overflow:hidden;"},"2":{"objectClass":"MindNode","ID":"3SL28","lineColorHex":"#BF58F5","text":"display: inline;\n行内元素，默认不独占一行，内容自作而右排列。\n设置上下margin和padding不影响布局，不支持宽高设置，高度由文本与行高共同撑开 \n行内元素中不能放任何块级元素，但是a标签例外，里面可以放除了a标签的任何标签"},"3":{"objectClass":"MindNode","ID":"57X56","lineColorHex":"#BF58F5","text":"display: inline-block; \n行内块元素，可以设置宽高和内外边距，不会独占一行\n可以实现块级元素水平排列，不支持左右auto\n行内元素之间默认在垂直方向是基线对齐(英文字母的小写x的底线)\n可以通过vertical-align:属性去做垂直方向的对齐（给inline-block元素设置）\n父级块级或者行内块元素设置text-align: center;可以实现行内块元素的水平居中\n行内块之间会产生解析空格，处理方案：\n1.消除html结构代码之间的空格\n2.将父级元素字体大小设置为0，然后后代元素需要用到的再去重新设置。"},"objectClass":"NSArray"},"text":"元素显示样式"},"2":{"objectClass":"MindNode","ID":"636O8","lineColorHex":"#26BBFF","children":{"0":{"objectClass":"MindNode","ID":"2D07C","lineColorHex":"#26BBFF","text":"背景颜色设置成红色\nbackground-color: red;\n引入名字为logo的背景图片\nbackground-image: url(\"./logo.png\");\n背景图片是否重复\nbackground-repeat: no-repeat;\n背景图片大小\nbackground-size:\ncontain;背景平铺到只要有一个遍碰到元素边界,就停止拉伸,不对图片进行裁切。\ncover;背景平铺满整个 铺满后就停止拉伸  会对图片进行裁切。\n写像素值时 第一个值代表宽度  第二个值代表高度 会使图片变形。\n背景图片定位\nbackground-position: 100px 100px;\n背景图片附着\nbackground-attachment：\nfixed;背景图片依附于视口而存在。\nscroll;默认值。\nlocal;背景图片跟着内容一起滚动。\n复合型样式\nbackground: -color -url() -repeat \n-position/-size"},"objectClass":"NSArray"},"text":"背景样式"},"objectClass":"NSArray"},"text":"oneday"}}