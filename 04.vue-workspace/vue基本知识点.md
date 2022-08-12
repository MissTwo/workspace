# vue基本知识点

#### 一、初识vue

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


#### 二、vue模板语法

##### 1.插值语法:

​    功能:用于解析标签体内容

​    写法:{{xxx}},xxx是js表达式,且可以直接读取到data中的所有属性

#####   2.指令语法:

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

#### 三、vue的数据绑定

##### 1.单向绑定（v-bind:value="xx"简写为:value="xx"）:数据只能从data流向页面

#####  2.双向绑定（v-model:value="xx"简写为v-model="xx"）:数据不仅能从data流向页面，还可以从页面流向data

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

#### 四、el与data的两种写法

##### 1.el的2种写法

​      （1）new Vue时候配置el属性

​      （2）先创建Vue实例，随后再通过vm.$mount('.root')指定el的值

#####     2.data的2种写法

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

#####     3.一个重要的原则：由vue管理的函数，一定不要写箭头函数，一旦写了箭头函数 this就不再是Vue实例了 

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

#### 五、MVVM模型

1. ##### M(模型 model):data中的数据
2.  ##### V(视图 view)：模板代码
3.   ##### VM(视图模板 ViewModel):Vue实例

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

#### 六、数据代理

##### 1.数据代理:通过一个对象代理对另外一个对象中属性的操作(读/写)

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

##### 2.vue中的数据代理

概念：通过vm对象来代理data对象中属性的操作(读/写)

优势：Vue中数据代理的好处：更加方便的操作data中的数据

基本原理：通过object.defineProoerty()把data对象中所有属性添加到vm上为每一个添加到vm上的属性，都指定一个getter和setter，在getter/setter内部上操作(读/写)data中对象的属性

![数据代理](D:\Mermer\workspace\04.vue-workspace\Vue中的数据代理.jpg)

#### 七、事件处理

##### 1.事件的基本使用

- 使用v-on:xxx="function(方法名称)"或@xxx="function(方法名称)",xxx为事件名称
-  事件的回调需要配置在methods对象中，最终会在vm上
-  methods中配置的函数，不要用箭头函数:(event)=>,否则this不是vm
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象
- @click="demo"和@click="demo($event)"效果一致，但后者可以传参

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



##### 2.事件修饰符

Vue中的事件修饰符：

- prevent:阻止默认事件(常用)

```html
<a href="https://www.baidu.com" @click.prevent="showInfo('阻止默认行为')">
	点我去百度
</a>
```

- stop:阻止事件冒泡(常用)                     [冒泡：从内到外，一层层]

```html
<div class="box1" @click="showInfo(1)">
        box1
    <div class="box2" @click.stop="showInfo(2)">
            box2
    </div>
</div>
```

- once:事件只触发一次(常用) 

```html
<button @click.once="showInfo(1)">点我只触发一次效果</button>
```

- capture：使用事件的捕获模式            [捕获：从外到内，一层层]

```

```

- self:只有event.target是当前操作的元素时候才触发事件

```

```

- passive：事件的默认行为立即执行，无需等待事件回调执行完毕

```

```

数据绑定中常用修饰符：

- trim:去除文本左右空格

```

```

- number:转换为number类型

```

```

- lazy:失去焦点时才会更新变量值

```

```



##### 3.键盘事件