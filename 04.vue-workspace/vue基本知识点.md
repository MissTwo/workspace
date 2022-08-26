# vue基本知识点

## 一、初识vue

1. ​	想要vue工作必须先要创建一个vue实例，且要传入一个配置对象

2. ​	root容器中的代码符合html规范，只不过混入了一些特殊的vue语法

3. ​	root容器里的代码被称为【vue模板】

4. ​    vue实例与容器是一对一的关系

5. ​    真实开发中只要一个Vue实例,并且会配合着组件一起使用

6. ​    Vue的插值语法{{xxx}}中的xxx要写js表达式,且xxx可以制动读取的data中的所有属性

7. ​    一旦data中的数据发生改变,那么模板中用到该数据的地方会自动更新

   ```html
   <body>
        <!-- 准备一个容器 ，作用1.为vue提供模板 2.把vue的工作成果知道往哪里放 -->
       <!-- 页面解析流程：先有容器任何有一个实例，当实例工作时先找到对应的容器再解
           析是否有vue的语法，当找到后会生成了对应的容器把数据放进去 -->
       <div id="root">
           <!-- 使用插值语法 {{必须是js的表达式}}-->
           <h1>Hello,{{name}}</h1>
           <!-- toUpperCase()转换为大写的函数 -->
           <h1>地址:{{address.toUpperCase()}}</h1>
       </div>
       <!-- 将容器中变化的实例放在vue实例中去保管 -->
       <script>
           // 阻止 vue 在启动时生成生产提示
           Vue.config.productionTip=false
           // 创建vue实例，只传一个参数，参数类型是一个对象这个对象为配置对象
           new Vue({
               // el用于指定当前vue实例为那个容器服务，通常值为css选择器字符串
               el:'#root',
               // 数据存储,数据供el所指定的容器使用，值我们暂时先写成一个对象
               data:{
                   name:'尚硅谷123',
                   address:'beijing'
               }
           })
       </script>
   </body>
   ```

   

##### 注意:区分js表达式和js代码（语句）

​	1.表达式：一个表达式会产生一个值，可以放再任何一个需要值的地方

- ​      a
- ​      a+b
- ​      demo(1)
- ​      x===y?'a':'b'

​    2.js代码（语句）:带逻辑结构

- if( ){  }
- for( ){  } 


## 二、vue模板语法

### 1.插值语法:

​    功能:用于解析标签体内容

​    写法:{{xxx}},xxx是js表达式,且可以直接读取到data中的所有属性

###   2.指令语法:

​    功能:用于解析标签(包括:标签属性,标签体内容,绑定事件````)

​    举例:v-bind:href="xxx" 或 简写为:href="xxx",xxx要写js表达式,且可以直接读取到data中的所有属性。

 **备注**：Vue中有很多指令，且形式都是：v-???,此处我们只是拿v-bind举例 

```html
<body>
    <div id='root'>
        <!--插值语法-->
        <h1>
            你好{{name}}
        </h1>
        <!--指令语法-->
      	<a v-bind:herf="url">点位去尚硅谷学习</a>
    </div>
</body>
<script>
	const vm=new Vue({
        el:'root',
        data:{
            name:'jack',
            url:'http://www.atguigu.com'
        }
    })
</script>
```

## 三、vue的数据绑定

### 1.单向绑定（v-bind:value="xx"简写为:value="xx"）:数据只能从data流向页面

###  2.双向绑定（v-model:value="xx"简写为v-model="xx"）:数据不仅能从data流向页面，还可以从页面流向data

**备注：**

​    	1.双向绑定一般应用在表单类元素上（如：input、select等）

​    	2.v-model:value可以简写为v-model,因为v-model默认收集的就是value的值 

​		3.v-bind可以用绑定行内样式

```html
<body>
    <!-- 基础写法 -->
        单向数据绑定:<input type="text" v-bind:value="name"><br>
        双向数据绑定:<input type="text" v-model:value="name"><br>
    <!-- 简单写法 -->
        单向数据绑定:<input type="text" :value="name"><br>
        双向数据绑定:<input type="text" v-model="name"><br>
    <!-- 数据单向绑定的应用场景 -->
    <!-- 对象语法 -->
    <div v-bind:class="{active:isActive,'text-danger': hasError}"></div>
    <div v-bind:class="{clssObject}"></div>
    <!-- 数组语法 -->
    <div v-bind:class="[activeClass, errorClass]"></div>
</body>
<script>
    Vue.config.productionTip=false
    new Vue({
        el:'#root',
        data:{
            name:'尚硅谷',
            isActive: true,
            hasError: false,
            classObject: {
                active: true,
                'text-danger': false
              },
            activeClass: 'active',
  		   errorClass: 'text-danger',
        }
    })
</script>
```

## 四、el与data的两种写法

### 1.el的2种写法

​      （1）new Vue时候配置el属性

​      （2）先创建Vue实例，随后再通过vm.$mount('.root')指定el的值

###     2.data的2种写法

​      （1）对象式 

```javascript
data:{xxxx:'xxxx'}
```

​      （2）函数式

```javascript
data( ){
	retrun{
	xxx:'xxxx'
	}
}
```

   **如何选择：**目前都可以，后期学习到组件data必须用函数式，否则会报错

###     3.一个重要的原则：由vue管理的函数，一定不要写箭头函数，一旦写了箭头函数 this就不再是Vue实例了 

- el与data的对象式写法，第一种写法

```javascript
new Vue({
	el:'#root',
	data:{
		name:'jack',
		age:18
	}
})
```

- el与data的函数式写法，第二种写法

```javascript
const vm=new Vue({
	data( ){
		retrun{
		name:'jack'
		}
	}
})
vm.$mount('#root')
```

## 五、MVVM模型

1. ### M(模型 model):data中的数据
2.  ### V(视图 view)：模板代码
3.   ### VM(视图模板 ViewModel):Vue实例

  **观察发现：**

1. data中所有的属性，最后都出现在了vm身上
2.  vm身上的所有属性，及vue原型上的所有属性，在vue模板中都可以直接使用

```html
<body>
     <!-- View层,视图 -->
    <div id="root">
        <h1>学校名称:{{name}}</h1>
        <h1>学校地址:{{address}}</h1>
    </div>
</body>
<script>
     Vue.config.productionTip=false
    //  ViewModel视图模型
    const vm=new Vue({
        // Model层，数据
        data(){
            return{
                name:'西南交通大学希望学院',
                address:'金堂县三星镇学府大道'
            }
        }
    })
    vm.$mount('#root')
</script>
```

## 六、数据代理

### 1.数据代理:通过一个对象代理对另外一个对象中属性的操作(读/写)

原生js中的Object.defineProperty方法，例如：需求通过number控制person对象中的年龄

```javascript
<script>
       // 需求通过number控制person对象中的年龄
       let number=18
        //创建一个对象
       let person={
            name:'张三',
            sex:'男',
       }
    // 要给他添加一个年龄的属性age=18使用object.defineProperty()方法不可枚举(遍历)
    // 里面包含三个参数分别是:对象、添加的属性名称、配置项
        // Object.defineProperty(person,'age',{
             value:18,
        // 控制属性是否可以枚举，默认属性为false
             enumerable:true,
        // 控制属性是否可以修改，默认值是false
             writable:true,
        // 控制属性是否可以被删除，默认值是false
             configurable:true,
       // 当有人读取person的age属性时，get函数(getter)就被被调用，且返回值是age的值
            get(){// get:function demo(){}可以简写为get(){}
                console.log('有人读取了age属性')
                return number
            },
      // 当有人修改person的age属性时，set函数(setter)就被被调用，且会收到具体的修改值
            set(value){
                console.log('有人修改了age属性,且值为:value')
                number=value
            }
        })
        
		// Object.keys()方法,需要传入一个为对象的参数,方法可以把传入参数的所有属性的属性名提取出来

        // console.log(Object.keys(person))
        console.log(person)
   </script>
```

### 2.vue中的数据代理

概念：通过vm对象来代理data对象中属性的操作(读/写)

优势：Vue中数据代理的好处：更加方便的操作data中的数据

基本原理：通过object.defineProoerty()把data对象中所有属性添加到vm上为每一个添加到vm上的属性，都指定一个getter和setter，在getter/setter内部上操作(读/写)data中对象的属性

![数据代理](D:\Mermer\workspace\04.vue-workspace\Vue中的数据代理.jpg)

## 七、事件处理

### 1.事件的基本使用

1. 使用v-on:xxx="function(方法名称)"或@xxx="function(方法名称)",xxx为事件名称
2. 事件的回调需要配置在methods对象中，最终会在vm上
3. methods中配置的函数，不要用箭头函数:(event)=>,否则this不是vm
4. methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象
5. @click="demo"和@click="demo($event)"效果一致，但后者可以传参

```html
<div class="root">
    <button v-on:click="showInfo1">点我提示信息1(不传参数)</button>
    <button @click="showInfo2($event,66)">点我提示信息2(传参数)</button>
</div>
<script>
    const vm=new Vue({
        el:'.root',
        data:{name:'尚硅谷'},
        methods:{
            // event是默认可以传入的事件对象
            showInfo1(event){
                // target属性是拿到事件目标在这就是button按钮
                // innerText属性是拿到元素里面的文字
                console.log(event.target.innerText)
                // 此处的this是vm,不能用:()=>这个函数下是this是window
                console.log(this)
                alert('同学你好！')
            },
            showInfo2(event,number){
                console.log(event,number)
                alert('同学你好啊！！')
            }
        }
    })
</script>
```



### 2.事件修饰符

Vue中的事件修饰符：

​	1.prevent:阻止默认事件(常用)

```html
<a href="https://www.baidu.com" @click.prevent="showInfo('阻止默认行为')">
	点我去百度
</a>
```



​	2.stop:阻止事件冒泡(常用)                     [冒泡：从内到外，一层层]

```html
<div class="box1" @click="showInfo(1)">
        box1
    <div class="box2" @click.stop="showInfo(2)">
            box2
    </div>
</div>
```



​	3.once:事件只触发一次(常用) 

```html
<button @click.once="showInfo(1)">点我只触发一次效果</button>
```



​	4.capture：使用事件的捕获模式            [捕获：从外到内，一层层]

```html
<div class="box2" @click.capture="showMsg(1)">
    div1
    <div class="box3" @click="showMsg(2)">
        div2
    </div>
</div>
```



​	5.self:只有event.target是当前操作的元素时候才触发事件,在一定程度上也有阻止冒泡的效果 

```html
<div class="box3" @click.self="showInfo2">
    <button @click="showInfo1">按钮点我提示信息,阻止事件冒泡</button>
</div>
```



​	6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕

```html
<!-- 
两种滚动：
1.滚动条的滚动(键盘的上下键滚动，鼠标的滚轮滚动)：
	scroll [滚动条到底了再滚动滚轮不会触发了]
2.鼠标滚动轮的滚动:
	wheel [滚动条到底了再滚动滚轮仍会触发了]
-->
<ul class="list" @wheel.passive="demo">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        methods:{
            demo(){
               for(let i=0;i<10000;i++){
                   console.log('#')
               }
               console.log('累坏了')
            }
        }
    })
</script>
```

数据绑定中常用修饰符：

​	1.trim:去除文本左右空格

```html
<input type="text" v-model.trim="username">
```

​	

​	2.number:转换为number类型

```html
<input type="number" v-model.number="phone">
```



​	3.lazy:失去焦点时才会更新变量值

```html
<input type="text" v-model.trim.lazy="username">
```



### 3.键盘事件

```html
<!-- 1.vue中常用的按键别名：
        回车 => enter
        删除 => delete(捕获"删除"和"退格"键)
        退出 => esc
        空格 => space
        换行 => tab(特殊必须配合keydown使用)
        上 => up
        下 => down
        左 => left
        右 => right

    2.vue未提供别名的按键，可以使用按键原始的key值绑定，但是要注意转化为keyab-case(短横线命名)
    例如：CapsLock转化为caps-lock

    3.系统修饰键(用法特殊):ctrl、alt、shift、meta
        (1)配合keyup使用:按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
        (2)配合keydown使用:正常触发
    注意：如果要指定再按下修饰符的同时再按的其他键指定如：y则@keyup.ctrl.y='xxx'使用
    
    4.也可以使用keyCode去指定具体的按键(不推荐)

    5.Vue.config.keyCodes.自定义键名=键码 ，可以去定制按键别名(不推荐) -->

<div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- 键盘事件：
        1.keydown:按下去就触发事件了
        2.keyup:按下去抬起来了(按下去松手了)就触发事件了(一般用这个) -->
    <input type="text" placeholder="按下回车打印输入"@keyup.enter='showInfo'>
    <!-- 定制按键别名 -->
    <!-- <input type="text" placeholder="按下回车提示输入"@keyup.huiche='showInfo'> -->
</div>

<script>
    Vue.config.productionTip=false
    // 定制按键别名(不推荐)
    // Vue.config.keyCodes.huiche=13

    const vm=new Vue({
        el:'#root',
        data:{
            name:'尚硅谷'
        },
        methods:{
            showInfo(e){
                // 键盘输入就获取值打印了没有通过回车进行确认,故需要加一个判断
                // 用keyCode通过按键编码获取获取回车的编码为13
                // console.log(e.keyCode)
                // target.value拿到元素里面的值
                console.log(e.target.value)
                // vue中对这种按键事件都起了别名就不用如此繁琐
                // if(e.keyCode !==13)return 
                // console.log(e.target.value)
            }
        }
    })
</script>
```

## 八、计算属性

### 1.基本的概念及使用：

​		1.定于:要用的属性不存在，要通过已有属性计算得来

​		2.原理:底层借助了Object.defineproperty方法提供的getter和setter

​		3.get函数什么时候执行?

   		 (1)初次读取时会执行一次
   		 (2)当依赖的数据发生改变时会再次被调用

​		4.优势:与methods实现对比，内部有缓存机制(复用),效率更高,调用方便

备注:

​    (1)计算属性最终会出现在vm上，直接读取使用即可
​    (2)如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生变化

```html
<div id="root">
    姓:<input type="text" v-model="firstName"><br>
    名:<input type="text" v-model="lastName"><br>
    姓名:<span>{{fullName}}</span><br>
    <!-- 没有调用get因为fullName进行了缓存 -->
    姓名:<span>{{fullName}}</span><br>
    姓名:<span>{{fullName}}</span><br>
    姓名:<span>{{fullName}}</span><br>
    姓名:<span>{{fullName}}</span>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data(){
            // 放的是属性
            return{
                firstName:'李',
                lastName:'四'
            }
        },
        // 计算属性
        computed:{
            fullName:{
        // get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
        // get什么时候被调用？ 1.初次读取fullName时 2.所依赖的数据发生变化时
                get(){
                    console.log('get被调用')
                    return this.firstName+'-'+this.lastName
                },
                // set什么时候调用？当fullName被修改时
                set(value){
                    console.log('set被调用,值是',value)
                    const arr=value.split('-')
                    this.firstName=arr[0]
                    this.lastName=arr[1]
                },
            },
            
             // 在确定只读不改就可以简写
            // fullName:function()还可以简化为fullName()
            fullName(){
                console.log('get被调用')
                return this.firstName+'-'+this.lastName
            }

        }
    })
</script>
```

## 九、监视属性

### 1.基本的概念及使用：

​	1.当被监视的属性变化时，回调函数自动调用，进行相关操作

​	2.监视属性必须存在，才能进行监视！！

​	3.监视的两种写法：

​		(1)new Vue时传入watch配置

​		(2)通过vm.$watch('监视属性名字',{传入配置对象})

注意：可以监视计算属性

```html
<div id="root">
    <h2>今天天气很{{info}}</h2>
    <button @click="changeWeather">切换天气</button>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data:{
            isHot:true
        },
        computed:{
            //简写写法
            info(){
                return this.isHot ?'炎热':'凉爽'
            }
        },
        methods: {
            changeWeather(){
                this.isHot=!this.isHot
            }
        },
        // 监视属性的第一种写法
        watch:{
            //第一种写法完整版
            info:{
                // 初始化时让调用一下
                immediate:true,
                // handler什么时候调用？当isHot发生改变时
                handler(newValue,oldValue){
                    console.log('isHot被修改，新旧值分别是：',newValue,oldValue)
                }
            },
            //第一种写法简写版
            info(newValue,oldValue){
                console.log('isHot被修改，新旧值分别是：',newValue,oldValue)
            }
        }
    })
    // 监测属性的第二种写法完整版
     vm.$watch('info',{
         immediate:true,
    // handler什么时候调用？当isHot发生改变时
         handler(newValue,oldValue){
         console.log('isHot被修改，新旧值分别是：',newValue,oldValue)}
     })
    
    // 监测属性的第二种写法简写版
    vm.$watch('info',function(newValue,oldValue){
        console.log('isHot被修改，新旧值分别是：',newValue,oldValue)
    })
```

### 2.深度监视

​		1.vue中的watch默认不监视对象内部值的改变（一层）

​		2.配置deep:true可以监测对象内部值改变（多层）

备注：

​	(1)vue自身可以监视对象内部值的改变，但vue提供的watch默认属性不可以（提高效率)

​	(2)使用watch时根据数据的具体结构，决定是否采用深度监视

```html

<div id="root">
    <h2>a的值是:{{number.a}}</h2>
    <button @click="number.a++">点我让a+1</button>
    <hr>
    <h2>b的值是:{{number.b}}</h2>
    <button @click="number.b++">点我让b+1</button>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data:{
            number:{
                a:1,
                b:2
            }
        },
        // 监视属性的第一种写法
        watch:{
            // 监视多级属性中某个属性的变化
            'number.a':{
                handler(){
                    console.log('a被改变了')
                }
            }
            // 监视多级结构中所有属性的变化
            number:{
                deep:true,
                handler(){
                    console.log('number改变了')
                }
            }
        }
    })
 
</script>
```

### 3.computed和watch之间的区别：

​	(1)computed能完成的功能，watch也能完成

​	(2)watch能完成的功能，computed不一定能完成（例如：watch可以进行异步操作）

注意两个重要的小原则：

​	1.所被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象

​	2.所有不被Vue所管理的函数(如：定时器的回调函数、Ajax的回调函数、promise的回调函数)，最好都写成箭头函数，这样this的指向才是vm 或 组件实例对象

```html
 <div id="root">
     姓:<input type="text" v-model="firstName"><br>
     名:<input type="text" v-model="lastName"><br>
     姓名:<span>{{fullName}}</span><br>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data(){
            return{
                firstName:'李',
                lastName:'四',
                fullName:'李-四'
            }
        },
        watch:{
            firstName(newValue){
                setTimeout(() => {
                    this.fullName=newValue+'-'+this.lastName
                }, 1000);
            },
            lastName(newValue){
                this.fullName=this.firstName+'-'+newValue
            }
        }   
    })
</script>
```

## 十、样式绑定

### 1.class样式绑定：

​    写法  :class='xxx' 其中xxx可以是字符串、对象、数组
​    (1)字符串写法适用于:类名不确定，要动态获取
​    (2)对象写法适用于:要绑定多个样式，个数不确定，名字不确定
​    (3)数组写法适用于:要绑定多个样式，个数确定，名字确定，但不确定用不用

### 2.style样式绑定：

​    (1) :style="{fontSize:xxx}"其中xxx是动态值
​    (2) :style="[a,b]"其中a,b为样式对象

```html
<style>
    .basic{
        border: 4px solid rgb(4, 188, 212);
        width: 400px;
        height: 200px;
        margin: 10px;

    }
    .happy{
        border: 4px solid red;
        background-color: rgb(207, 230, 82);
        background: linear-gradient(30deg,yellow,pink,orange,yellow);
    }
    .sad{
        border: 4px dashed blue;
        background-color: gray;
    }
    .normal{
        background-color: aqua;

    }
    .atguigu1{
        background-color: chartreuse;
        border-radius: 4px;
    }
    .atguigu2{
        font-size: 40px;
    }
    .atguigu3{
        border-radius: 40px;
    }
</style>
<body>
<div id="root">
        <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
        <div class="basic" :class="mood" @click="changeMood">
            <h2>你好{{name}}</h2>
        </div>
        <hr>
        <!-- 绑定class样式--数组写法,适用于：要绑定的样式名字不确定、数量也不确定 -->
        <div class="basic" :class="classArr">
            <h2>你好{{name}}</h2>
        </div>
        <hr>
        <!-- 绑定class样式--数组写法,适用于：要绑定的样式名字确定、数量也确定,但要动态决定用不用 -->
        <div class="basic" :class="classObj">
            <h2>你好{{name}}</h2>
        </div>
        <hr>
        <!-- 绑定style样式--对象写法2 -->
        <div class="basic" :style="styleObj">
            <h2>{{name}}</h2>
        </div>
        <hr>
        <!-- 绑定style样式-对象写法1 -->
        <div class="basic" :style="{fontSize:fSize+'px'}">
            <h2>{{name}}</h2>
        </div>
        <hr>
        <!-- 绑定style样式--数组写法(不常用了) -->
        <div class="basic" :style="styleArr">
            <h2>{{name}}</h2>
        </div>
    </div>
</body>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data(){
            return{
                name:'尚硅谷',
                mood:'normal',
                classArr:['atguigu1','atguigu2','atguigu3'],
                classObj:{
                    atguigu1:false,
                    atguigu3:false
                },
                styleObj:{
                    fontSize:'30px',
                    backgroundColor: 'pink', 
                },
                fSize:40,
                styleArr:[
                    {
                        fontSize:'10px',
                    },
                    {
                        border: '4px dashed blue',
                        backgroundColor: 'orange',
                    }
                ]
            }
        },
        methods: {
            changeMood(){
                const arr=['happy','sad','normal']
                // 随机生成一个0到1之间的数取不到1,再扩大到0到3,并且向下取整
                const i=Math.floor(Math.random()*3)
                this.mood=arr[i]
                console.log('样式为',i)
            }
        },
    })
</script>
```



## 十一、条件渲染

### 1.v-if

​    写法:
​        (1)v-if="表达式"
​        (2)v-else-if="表达式"
​        (3)v-else="表达式"
​    适用于:切换频率较低的场景
​    特点:不展示DOM元素直接被删除
​    注意:v-if可以和v-else-if、v-else一起使用，但要求结构不能被打断

### 2.v-show

​    写法:v-show="表达式"
​    适用于:切换频率较高的场景
​    特点:不展示DOM元素未被删除，仅仅是使用样式隐藏掉了

### 备注:使用v-if时，元素可能无法获取到，而使用v-show时一定可以获取到元素

```html
<div id="root">
    <h2>当前n的值为:{{n}}</h2>
    <button @click="n++">点我n+1</button>
    <!-- 使用v-show做条件渲染 -->

    <h2 v-show="1===1">你好{{name}}</h2>
    <h2 v-show="false">你好{{name}}</h2>


    <!-- 使用v-if做条件渲染 -->

    <h2 v-if="1===1">你if好{{name}}</h2>
    <h2 v-if="false">你好{{name}}</h2>


    <!-- 使用v-else-if、v-else做条件渲染 -->

    <h2 v-if="n===1">Angular</h2>
    <h2 v-else-if="n===2">React</h2>
    <h2 v-else-if="n===3">Vue</h2>
    <h2 v-else="n===4">n不满足</h2>


    <!-- v-if与tempalte的配合使用，tempalate只能与v-if一起使用，且不会影响结构 -->
    <template v-if="1===1">
        <h2>你好</h2>
        <h2>尚硅谷</h2>
        <h2>北京</h2>
    </template>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data(){
            return{
                name:'尚硅谷',
                n:0
            }
        }
    })
</script>
```

## 十二、列表渲染

### 1.v-for指令：

​    1.用于展示列表数据
​    2.语法：v-for="(item,index) in xxx" :key="yyy"
​    3.可遍历：数组、对象、字符串（用的少）、指定次数（用的少） 

```html
<div id="root"> 
    <!-- 遍历数值 -->
    <h2>人员列表(遍历数组)</h2>
    <button @click.once="add">添加一个老刘</button>
    <ul>
        <li v-for="(p,index) in persons" :key="p.id">
            {{p.name}}-{{p.age}}
            <input type="text" >
        </li>

    </ul>
    <br>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data:{
            persons:[
                {id:'001',name:'张三',age:18},
                {id:'002',name:'李四',age:19},
                {id:'003',name:'王五',age:20},
            ]
        },
        methods: {
            add(){
                const p={id:'004',name:'老刘',age:40}
                this.persons.unshift(p)
            }
            
        },
    })
</script>
```

### 2.面试题：react、vue中key有什么作用？（key的内部原理）

 1.虚拟dom中key的作用：
     key是虚拟dom的标识，当数据发生变化时，vue会根据【新数据】生成【新的虚拟dom】
     随后vue进行【新虚拟dom】和【旧虚拟dom】的差异比较，比较规则如下：
 2.对比规则：
     (1)旧虚拟dom中找到与新虚拟dom相同的key:
         ①若虚拟dom中内容没有变化，直接使用之前的真实dom
         ②若虚拟dom中内容变化，则生成新的真实dom，随后替换掉页面中之前的真实dom
     (2)旧虚拟dom中未找到与新虚拟dom相同的key:
         直接创建新的真实dom，随后渲染到页面上
 3.用index作为key可能会发生的问题：
     (1)若对数据进行:逆序添加、逆序删除等破坏顺序操作：
         会产生没有必要的真实dom跟新==>界面效果没有变化但是效率低
     (2)如果结构中还包含输入类的dom：
         会产生错误的dom更新==>界面问题
 4.开发中如何选择key?
     (1)最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号码、学号等唯一值
     (2)如果不存在对数据的逆序添加、逆序删除等破坏顺序的操作，仅用于渲染列表用于展示，
     使用index作为key是没有问题的 

### 3.vue监视数据的原理：

​    1.vue会监视data中所有层次的数据
​    2.如何监视对象中的数据：通过实现监视,且要在new Vue时就传入要监测的数据
​        (1)对象中后追加的属性，Vue默认不做响应式处理
​        (2)如需要给后添加的属性做响应式处理，请使用一下api
​            Vue.set(target,propertyName/index,value)或
​            vm.$set(target,propertyName/index,value)
​    3.如何监视数组中的数据：
​        通过包裹数组元素更新的方法实现，本质就是做两件事
​        (1)调用原生的方法对数组进行更新
​        (2)重新解析模板，进而更新页面
​    4.在修改Vue中数组的某个元素一定要用如下方法：
​        (1)Vue.set()或vm.$set()
​        (2)使用这些数组的api:
​            push() 向数组的末尾添加一个或者多个元素,并返回新的长度
​            pop() 删除并返回数组的最后一个元素   
​            shift() 删除并返回数组的第一个元素   
​            unshift() 向数组的开头添加一个或多个元素,并返回新的长度   
​            splice() 删除元素,并向数组添加新元素
​            sort() 对数组的元素进行排序
​            reverse() 颠倒数组中元素的顺序 

```html
   <div id="root">
        <h1>学生信息</h1>
        <button @click="student.age++">年龄+1岁</button><br>
        <button @click="addSex">添加性别属性，默认值为:男</button><br>
        <button @click="student.sex='女'">修改性别</button><br>
        <button @click="addFriends">在列表首添加一个朋友</button><br>
        <button @click="updataFriendName">修改第一个朋友的名字为：张三</button><br>
        <button @click="addHobby">添加一个爱好</button><br>
        <button @click="modifyHobby">修改第一个爱好为：开车</button><br>
        <button @click="filterHobby">过滤掉爱好中的抽烟</button><br>
        <h3>姓名：{{student.name}}</h3>
        <h3>年龄：{{student.age}}</h3>
        <h3 v-show="student.sex">性别：{{student.sex}}</h3>
        <h3>爱好:</h3>
        <ul>
            <li v-for="(h,index) in student.hobby" :key="index">{{h}}</li>
        </ul>
        <h3>朋友们：</h3>
        <ul>
            <li v-for="(f,index) in student.friends" :key="index">
                {{f.name}}-{{f.age}}
            </li>
        </ul>

    </div>
</body>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: '#root',
        data: {
            student: {
                name: 'tom',
                age: 25,
                hobby: ['抽烟', '喝酒', '烫头'],
                friends: [
                    { name: 'jerry', age: 35 },
                    { name: 'tom', age: 36 }
                ]
            }

        },
        methods: {
            // 添加属性的两种方法
            addSex() {
                // 第一种
                // Vue.set(this.student,'sex','男')

                // 第二种
                this.$set(this.student, 'sex', '男')
            },
            addFriends() {
                this.student.friends.unshift({ name: 'jack', age: 18 })
            },
            updataFriendName() {
                this.student.friends[0].name = '张三'
            },
            addHobby() {
                this.student.hobby.push('学习')
            },
            modifyHobby() {
                // 0代表操作第一个，1代表从第0个开始删1个删完再插入1个
                this.student.hobby.splice(0, 1, '开车')
                // Vue.set(this.student.hobby,'0','开车')
                // this.$set(this.student.hobby,'0','开车')
            },
            filterHobby() {
                this.student.hobby = this.student.hobby.filter((h) => {
                    return h != '抽烟'
                })
            }
        },


    })  
</script>
```

## 十三、收集表单数据

收集表单数据：

###     若：<input type="text">,则v-model收集的就是value值,用户输入的就是value的值

```html
 账号：<input type="text" v-model.trim="userInfo.account"><br>
密码：<input type="password" v-model="userInfo.password"><br>
年龄：<input type="number" v-model.number="userInfo.number"><br>
```

###     若：<input type="radio">,则v-model收集的就是value值,且要给标签配置value值

```html
 性别：
<input type="radio" name="sex" v-model="userInfo.sex" value="male">男
<input type="radio" name="sex" v-model="userInfo.sex" value="famale">女<br>
```

###     若：<input type="checkbox">

​        1.没有配置input的value属性,那么收集的就是checked(勾选 or 未勾选,是布尔值)

```html
 爱好：
<input type="checkbox" value="study" v-model="userInfo.hobby">学习
<input type="checkbox" value="game" v-model="userInfo.hobby">打游戏
<input type="checkbox" value="eat" v-model="userInfo.hobby">吃饭
```

###  若：<select>  <option value="">xxx</option>  </select>

​		2.配置input的value属性:
​            (1)v-model的初始值是非数组,那么收集的就是checked(勾选 or 未勾选,是布尔值)
​            (2)v-model的初始值是数组,那么收集的就是value组成的数组

```html
所属地区：
<select v-model="userInfo.city">
    <option value="">请选择城市</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="shenzhen">深圳</option>
    <option value="wuhan">武汉</option>
</select>
```

​    备注:v-model的三个修饰符:
​        lazy:失去焦点再收集数据
​        number:输入字符串转换为有效的数字
​        trim:输入首位空格过滤 

```html
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: '#root',
        data: {
            userInfo: {
                account: '',
                password: '',
                sex: '',
                hobby: [],
                city: '',
                other: '',
                agree: '',
                number: ''
            }
        },
    })
</script>
```

## 十四、过滤器

### 定于：对要显示的数据进行特定的格式化后再显示(适用于一些简单逻辑的处理)

### 语法：

​    1.注册过滤器：Vue.filter(name,callback())或new Vue{filters:{}}
​    2.使用过滤器：{{xxx | 过滤器名字}} 或 v-bind:属性="xxx | 过滤器名字"

```html
<div id="root">
    <h2>显示格式化后的时间</h2>
    <!-- 过滤器实现 -->
    <h3>过滤器实现:{{time | timeFomater}}</h3>
    <!-- 过滤器实现(传参) -->
    <h3>过滤器实现(传参):{{time | timeFomater('YYYY-MM-DD')}}</h3>
    <!-- 多个过滤器串联 -->
    <h3>多个过滤器串联:{{time | timeFomater | mySlice}}</h3>
    <!-- 单向绑定使用过滤器 -->
    <h3 :value="msg | mySlice">尚硅谷</h3>
</div>
<div id="root2">
    <h2>{{msg | mySlice}}</h2>
</div>
<script>
    Vue.config.productionTip = false
    // 全局过滤器
    Vue.filter('mySlice', function (val) {
        return val.slice(0, 4)
    })
    const vm2 = new Vue({
        el: '#root2',
        data: {
            msg: 'hello,shangguigu'
        }
    })
    const vm = new Vue({
        el: '#root',
        data() {
            return {
                // 时间戳
                time: 1647876513045,
                msg: '你好，尚硅谷'
            }
        },
        // 局部过滤器
        filters: {
            // es6形参默认值，如果str有值就用传入的值，如果没有就用一下的默认值
            timeFomater(val, str = 'YYYY_MM_DD HH:mm:ss') {
                return dayjs(val).format(str)
            }
        }
    })
```



### 备注：

​    1.过滤器也可以接收额外参数、多个过滤器可以串联
​    2.并没有改变原本的数据，只是产生新的对应数据 

## 十五、内置指令

### v-bind:value   (:xxx)    单向绑定解析表达式

### v-model:value  (v-model) 双向数据绑定

### v-for                    遍历数组/对象/字符串

### v-if/v-else-if/v-else    条件渲染(动态控制节点是否存在)

### v-show                   条件渲染(动态控制节点是否展示)

### v-on(@事件)               绑定事件监听

### v-text指令：

​    1.作用：向其所在的节点中渲染文本内容
​    2.与插值语法的区别：v-text会替换掉节点的内容，{{xxx}}则不会

```html
<div v-text="name"></div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: '#root',
        data() {
            return {
                name: '尚硅谷'
            }
        }
    })
</script>
```

### v-html指令：

​    1.作用：向指定节点中渲染包含html的结构内容
​    2.与插值语法的区别：
​        (1)v-html会替换掉节点中的所有内容，{{xxx}}则不会
​        (2)v-html可以识别html结构
​    3.严重注意：v-html有安全问题！!
​        (1)在网站上动态渲染任意html是非常危险的，容易导致xss攻击
​        (2)一定要在可信的内容上使用v-html,永不要用在用户提交的内容上 

```html
<div id="root">
    <div v-html="str"></div>
    <div v-html="str2"></div>
</div>
<script>
    const vm=new Vue({
        el:'#root',
        data(){
            return{
                str:'<h2>你好呀！</h2>',
                str2:'<a href="http://www.baidu.com?"+document.cookie>你想要的内容</a>'
            }
        }
    })
</script>
```

### v-cloak指令(没有值)：

​    1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删除v-cloak属性
​    2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题 

```html
<style>
    [v-cloak]{
        display: none;
    }
</style> 
<div id="root">
    <!-- 解析页面有延迟时，使用页面不会有异常展示 -->
    <h2 v-cloak>你好{{name}}</h2>
</div>
<script>
    Vue.config.productionTip=false
    const vm=new Vue({
        el:'#root',
        data(){
            return{
                name:'尚硅谷'
            }
        }
    })
</script>
```

### v-once指令：

​    1.v-once所在节点在初次动态渲染后，就视为静态内容了
​    2.以后数据的改变是不会引起v-once所在结构的更新，可以用于优化性能

```html
   <div id="root">
       <h2 v-once>初始化的n值是：{{n}}</h2>
       <h2>当前的n值是：{{n}}</h2>
       <button @click="n++">点我n+1</button>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: '#root',
        data() {
            return {
                n: 1
            }
        }
    })
</script>
```

### v-pre指令：

​    1.跳过其所在节点的编译过程
​    2.可以利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译 

```html
<div id="root">
    <h2 v-pre>Vue的指令</h2>
    <h2>当前的n值是：{{n}}</h2>
    <button @click="n++">点我n+1</button>
</div>
<script>
    Vue.config.productionTip = false
    const vm = new Vue({
        el: '#root',
        data() {
            return {
                n: 1
            }
        }
    })
</script>
```

## 十六、自定义指令

自定义指令总结：

###     1、定义语法：

​        (1)局部指令：
​        函数的形式
​        new Vue({
​            directives:{
​                指令名(配置对象){ 
​                }
​            }
​        })

​        对象的形式
​        new Vue({
​            directives:{
​                指令名：{
​                    回调函数
​                }
​            }
​        })
​        (2)全局指令：
​        Vue.directive(指令名,配置对象)
​        Vue.directive(指令名,{回调函数})
​    

###     2、配置对象中常用的3个回调：

​        (1)bind():指令与元素成功绑定时调用
​        (2)inserted():指令所在元素插入页面时调用
​        (3)updat():指令所在模板机构被重新解析时调用

###     3、备注：

​        (1)指令定义时不加v-,但是在使用时要加v—
​        (2)指令名如果是多个单词，要使用kebab-case命名方式。不要用camelCase命名

```html
<div id="root">
    <h2>当前的n值为：{{n}}</h2>
    <h2>将n值扩大十倍后的值为：<span v-big-number="n"></span> </h2>
    <button @click="n++">点击我n+1</button>
    <hr>
    <!-- <input type="text" v-fbind:value="n" autofocus> -->
    <input type="text" v-fbind:value="n">
</div>
<hr>
<div id="root1">
    <input type="text" v-fbind:value="n">
</div>
<script>
    // 全局指令
    Vue.directive('fbind',{   
        // 指令与元素成功绑定时(一上来)
        bind(element,binding){
            element.value=binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element,binding){ 
            element.focus()
        },
        // 指令所在的模板被重新解析时
        updated(element,binding) {
            element.value=binding.value
        },
    })
    new Vue({
        el:'#root1',
        data:{
            n:3
        }
    })
    const vm = new Vue({
        el: '#root',
        data: {
            n: 1
        },
        // 定义局部指令
        directives: {
            // big函数什么时候会被调用？
            // 1.指令与元素成功绑定时(一上来) 2.指令所在模板被重新解析时
            'big-number'(element, binding) {
                // innerText可获取或设置指定元素标签内的文本值
                element.innerText = binding.value * 10
            },
            fbind: {
                // 指令与元素成功绑定时(一上来)
                bind(element, binding) {
                    element.value = binding.value
                },
                // 指令所在元素被插入页面时
                inserted(element, binding) {
                  获取焦点
                    element.focus()
                },
                // 指令所在的模板被重新解析时
                update(element, binding) {
                    element.value = binding.value
                }
            }
        }
    })
</script>
```

## 十七、生命周期

1.又名：生命周期回调函数、生命周期函数、生命周期钩子
2.是生命：Vue在关键时期帮我们调用的一些具有特殊名称的函数
3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的
4.生命周期函数中的this指向是vm 或 组件实例对象

```html
<div id="root">
    <!-- 动态绑定样式,样式是一组的需要使用对象的方式 -->
    <!-- 因为对象中出现重名所以使用简写形式 -->
    <h2 :style="{opacity}">欢迎学习Vue</h2>
</div>
<script>
    // 阻止vue启动时产生提示
    Vue.config.productionTip=false
    new Vue({
        el:'#root',
        data:{
            opacity:1
        },
        // vue完成模板的解析并且把初始的真实dom元素放入页面后(挂载完毕)调用mounted
        mounted() {
            console.log('mounted')
            // 开启定时器
            this.timer=setInterval(() => {
                this.opacity-=0.01
                if (this.opacity<=0) {
                    this.opacity=1
                }
            },16)
        },
    })
</script>
```

### 1.beforeCreate( ) :

​	初始化：生命周期、事件但数据代理还未开始(无法通过vm访问到data中的数据、methods中方法)

### 2.created( ) 

​	初始化：数据监测、数据代理(可以通过vm访问到data中的数据、methods中配置的方法)

### 3.beforeMount() 

​	(1).页面呈现的是未经Vue编译的DOM结构 

​	(2).所有对DOM的操作都不奏效会被覆盖  

### 4.mounted()

​	(1).页面呈现经过Vue编译的DOM 

​	(2).对DOM的操作均有效，(尽可能避免)。

​	(3).至此初始化结束，一般进行：**开启定时器、发送网络请求、订阅消息、绑定自定义事件、等初始化操作**

### 5.beforeUpdate() 

​	数据是新的，但页面是旧的(页面尚未和数据保持同步)

### 6.updated() 

​	数据是新的，页面也是新的(页面和数据保持同步)

### 7.beforeDestroy() 

​	(1).vm中的所有data、methods、指令等都可以用，马上要执行销毁过程
 	(2).一般此阶段：**关闭定时器、取消订阅消息、解绑自定义事件等收尾操作**

###  8.destroyed()

​	一般不用这个

------

**常用的生命周期钩子：**
    **1.mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】**
    **2.beforeDestroy:清除定时器、解绑自定义事件、取消订阅消息【收尾工作】**

**关于销毁Vue实例**
    **1.销毁后借助Vue开发者工具看不到任何信息**
    **2.销毁后自定义事件会失效，但原生DOM事件依然有效**
    **3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会发生更新流程了** 

```html
 <div id="root">
     <h2 :style="{opacity}">欢迎学习Vue</h2>
     <button @click="stop">点我停止变化</button>
</div>
<script>
    Vue.config.productionTip=false
    new Vue({
        el:'#root',
        data:{
            opacity:1
        },
        methods: {
            stop(){
                clearInterval(this.timer)
            }
        },
        mounted() {
            this.timer=setInterval(() => {
                this.opacity-=0.01
                if(this.opacity<=0){
                    this.opacity=1
                }
            },16)
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
    })
</script>
```

## 十八、组件基本使用

**vue中使用组件的三大步骤：**
         **1.创建组件**(定义组件)**
         **2.注册组件**
         3.编写组件标签(使用组件)**

### 一、如何定义一个组件？

​    使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options机会一样。
​    但是也有区别，如下：
​        1.el不要写，为什么？
​            最终所有的组件都要经过一个vm的管理，由vm中的el决定服务于哪一个容器。
​        2.data必须写成函数的形式。为什么？
​            避免组件被复用时，数据存在引用关系
​        备注：使用template可以配置组件结构

### 二、如何注册组件？

​    1.局部注册：靠new Vue的时候传入components选项
​    2.全局注册：靠Vue.component('组件名',组件)

### 三、编写组件

​    <student></student>

### 四、几个注意点：

#####   1.关于组件名字：

​    	一个单词组成：
​      		第一种写法(首字母小写)：school
​     	 	第二种写法(首字母大写)：School
​    	多个单词组成：
​      		第一种写法(kebab-case命名)：my-school
​     	 	第二种写法(CamelCase命名)：MySchool（需要Vue脚手架支持）
​    备注：
​      	(1)组件名尽可能回避HTML中已经由的元素名称。列入：h2\H2都不行
​      	(2)可以使用name配置项指定组件开发者工具中呈现的名字

#####    2.关于组件标签：

​    		第一种写法：<school></school>
​    		第二种写法：<school/>
​    备注：不用脚手架时，<school/>会导致后续组件不能渲染

#####    3.一个简写方式：

​    const school=Vue.extend(options)
​    可以简写为：const school=options

### 五、组件分类：

##### 	1.非单文件组件：一个文件中包含n个组件

```html
<body>
<div id="root">
    <h2>{{titles}}</h2>
    <app></app>
    <hello></hello>
</div>
</body>
<script src="../js/vue.js"></script>
<script>
    // 全局组件要先声明再使用
    const hello = {
        data() {
            return {say: '你好啊，我是全局的组件',};
        },
        template: `
          <div>{{ say }}</div>`,
    };
    Vue.component('hello', hello);

    const student = {
        data() {
            return {
                name: 'jack',
                age: 18,
            };
        },
        template: `
          <div>
          <div>{{ name }}</div>
          <div>{{ age }}</div>
          </div>
        `,
    };
    const school = {
        components: {
            student,
        },
        data() {
            return {
                name: '尚硅谷',
                address: '北京',
            };
        },
        template: `
          <div>
          <div>{{ name }}</div>
          <div>{{ address }}</div>
          <student></student>
          </div>
        `,
    };
    const app = Vue.extend({
        components: {
            school,
        },
        template: `
          <div>
          <school></school>
          </div>`,
    });
    new Vue({
        el: '#root',
        data: {
            titles: '嵌套',
        },
        //局部注册组件
        components: {
            app,
        },
    });

</script>
```

##### 	2.单文件组件：一个文件只包含1个组件

```html
<template>
  <!--  组件的结构-->
  <div class="demo">
    <h3>学校名字{{ name }}</h3>
    <h3>学校地址{{ address }}</h3>
    <h3>n:{{ n }}</h3>
    <button @click="handler_add">点我n自增</button>
  </div>
</template>

<script>
// 组件交互相关代码(数据、方法等等)
export default {
  name: 'School',
  data() {
    return {
      name: '尚硅谷',
      address: "北京",
      n: 0,
    };
  },
  methods: {
    handler_add() {
      this.n++;
    },
  },
};
</script>

<style>
/*组件的样式*/
.demo {
  background-color: antiquewhite;
  width: 100px;
  height: 100px;
  color: aquamarine;
}
</style>
```

#### 六、重点es6模块化：

#####   1.分别暴露：export const xxxx

#####   2.统一暴露： export {变量名字}

  以上两种引入方式：
    import {名字} from 地址

#####   3.默认暴露(一般用这个，因为只有一个东西都用这个)：export default 变量名字

  引入方式：
      import 名字 from 地址

```javascript
1.export const School
2.export {School}
3.export default Vue.extend({}) 简写  export default{}
```



## 十九、单文件组件

### Ⅰ.关于VueComponent:

#####     1.school组件本质是一个名为VueComponent的构造函数，且不说程序员定义的，是Vue.extend生成的

#####     2.我们只需要写<school/>或<school></school>,Vue解析时会帮我们创建school组件的实例对象

​        即Vue帮我们执行的：new VueComponent(options)

#####     3.特别注意：每次调用Vue.extend,返回的都是一个全选的VueComponent

#####     4.关于this指向

​        (1)组件配置中：

​            data函数，methods中的函数、watch中的函数、computed中的函数，它们中this均是【VueComponent实例对象】

​        (2)new Vue(options)配置中：

​            data函数，methods中的函数、watch中的函数、computed中的函数，它们中this均是【Vue实例对象】

#####     5.VueComponent的实例对象，以后简称vc [自己取的名字] (也可以称之为：组件实例对象)

​        Vue的实例对象，以后简称vm

### Ⅱ.vm与vc的关系

##### 	1.一个重要的内置关系：VueComponent.prototype.__proto__===Vue.prototype

##### 	2.为什么要有这个关系：让组件实例对象（vc）可以访问到Vue原型上的属性和方法

![vm与vc的关系](D:\Mermer\workspace\04.vue-workspace\vm与vc的关系.png)