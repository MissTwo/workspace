/*
 $ @Author: lishuangling
 $ @Date: 2022-06-20 15:24:52
 $ @LastEditTime: 2022-06-20 15:45:29
 $ @Description: 
 */
/* 
 一、获取元素的方法：
     1.动态获取：getElementsByTagName    getElementsByName   getElementsByClassName
         即：修改了获取节点的名字后就无法操作了

     2.静态获取：getElementById  querySelector   querySelectorAll   

 注意：
     (1)改为静态获取需要一个新变量来存储伪数组中要改的东西
     (2)获取元素若以数组的形式则都是伪数组（类数组）仅仅带有foreach方法

     3.让伪数组使用数组的方法：
     let box=document.querySelectorAll('#box p')
         (1)方法一：将伪数组转换为真的数组再用数组的方法
             box=Array.from(box)
             box.map((i) => {
                 i.innerText='222'
             })

         (2)方法二：给节点追加数组原型上的方法
         prototype:原型、雏形、最初形态
             box.map=Array.prototype.map
             box.map((i) => {
                 i.innerHTML=222
             })

 二、节点(node构成html网页的基本单元)
     1.概念：页面中每一个部分都称为节点，比如：html标签、属性、文本、注释 、整个文档等

     2.与DOM的关系：DOM文档就是由节点组成，标签是节点中的一种，html加载完毕后，引擎会再内存中把html文档生成DOM树

     3.整个html文档就是一个文档节点,所有的节点都是Object。
                 nodeType(值)  节点类型

                     1        元素节点(如：<p>、<div>等)
                     3        文字节点
                     8        注释节点
                     9        document节点（根节点）

                    

     注意：DOM文档包含多种节点，我们通常获取标签，只是元素节点
         let box=document.getElementById('box')

         (1)拿到元素内所有的子节点[text,p,text,p,text](包括空白文本)(获得：伪数组,里面的每一项都是Object)

             关系               考虑所有节点    兼容所有

             子节点             childNodes
             父节点             parentNode
             第一个子节点        firstChild
             最后一个子节点      lastChild
             前一个兄弟节点      previousSibling
             后一个兄弟节点      nextSibling    

             let a=box.childNodes
         注意：childNodes获取了子节点,节点就包括了各种类型(如：元素节点、文本节点、注释节点等)
         
         (2)拿到元素内所有的子元素节点(获得：HTML集合)

                 关系             只考虑元素节点    兼容到ie9

             子元素节点            children
             父元素节点            parentNode
             第一个子元素节点       firstElementChild
             最后一个子元素节点     lastElementChild
             前一个兄弟元素节点     previousElementSibling
             后一个兄弟元素节点     nextElementSibling
                 
             let b=box.children;
         注意：children获取的是子元素节点,元素节点就指的是html的标签(如：p\div\section\span等)

         (3)offsetParent 获取元素节点的最近的带有有效定位属性的祖先元素节点
             如果没有 就找到body（有效定位属性：absolute,relative,fixed,sticky）
             注意：自身有fixed定位属性 则返回null

 三、创建节点
     +=拼接的时候存在问题，只会保留html文档结构，不会保留之前节点上绑定的事件，故需要创建节点
         let root=document.getElementById('root')
         步骤1：创建'孤儿节点'
             创建元素节点
                 let node=document.createElement('标签')
             创建文本节点
                 let nodeText=document.createTextNode("文本内容")
         步骤2：操作这个元素(往里面添加内容、属性、事件、样式等)
             node.innerHTML='我是新增的节点'
         步骤3：将节点挂载上树(找到父亲挂为父元素的最后一个子元素)
             语法：
                 父元素.appendChild(创建好的孤儿节点)
                 父元素.insertBefore(创建好的孤儿节点,标杆子节点)
             
                 root.appendChild(node)
 四、移动节点(给一个元素换一个父节点)
     概念：
         新父节点.appendChild(已有父节点的节点)
         新父节点.insertBefore(已有父节点的节点,标杆子节点)
     注意：这意味着一个父节点不能同时位于DOM树的两个位置，相当于给一个元素换一个父元素
 五、删除节点
         父节点.removeChild(需要删除的子节点)
         注意：节点不能自己删除自己必须有父亲来删除它，如果我们想不获取父节点，怎么删除自己？
         节点.parentNode.removeChild(节点)
 六、克隆节点
         1.浅克隆：只会克隆这一个节点
             let 孤儿节点=老节点.cloneNode()
         2.深克隆：克隆包含内部所有节点
             let 孤儿节点=老节点.cloneNode(true)
 七、替换子元素
         父元素.replaceChild(新子元素孤儿节点,需要被替换的子元素)
 八、创建一个文档碎片
         先将多个“孤儿”节点，整合到这里面再统一添加，解决使用appendChild多次添加节点时候，页面多次进行渲染的问题，使用documentFragment处理节点，速度和性能远远由于直接操作DOM
         方法：
             创建文档碎片document.createDocumentFragment()
             let frag=document.createDocumentFragment()
             创建孤儿节点
             let p = document.createElement('p')
             p.innerHTML = '我是p标签'
             将孤儿节点加入到文档碎片中
             frag.appendChild(p)
             父元素.appendChild(frag)

  */
     /* let box = document.getElementById('box').childNodes
     console.log(box[1]);
     console.log(box);
     let a = []
     for (let i = 0; i < box.length; i++) {
         console.log(box[i]);
         if (box[i].nodeType===1) {
             a.push(box[i])
         }
     }
     console.log(a); */
     let box = document.getElementById('box')
     console.log(box.previousSibling.nodeType);
     function fn(element) {
         while (element.previousSibling != null) {
             if (element.previousSibling.nodeType == 1) {
                 return element.previousSibling
             } else {
                 return fn(element.previousSibling)
             }
         }
     }
     console.log(fn(box));
     //动态创建一个20行12列的表格
     let table = document.getElementById('my-table')
     for (let i = 0; i < 20; i++) {
         let tr = document.createElement('tr')
         for (let j = 0; j < 20; j++) {
             let td = document.createElement('td')
             tr.appendChild(td)
         }
         table.appendChild(tr)
     }
     let a = document.documentElement
     // console.log(a);
     let content = document.getElementById('content')
     let frag = document.createDocumentFragment()
     for (let i = 0; i < 100; i++) {
         let p = document.createElement('p')
         p.innerHTML = '我是p标签'
         frag.appendChild(p)
     }
     // frag使用之后自动消失,指文档结构的消失
     content.appendChild(frag)