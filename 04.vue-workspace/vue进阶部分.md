# 使用vue脚手架

## 一、生命周期

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

## 二、组件基本使用

**vue中使用组件的三大步骤：**
         **1.创建组件**(定义组件)**
         **2.注册组件**
         3.编写组件标签(使用组件)**

### Ⅰ.如何定义一个组件？

​    使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options机会一样。
​    但是也有区别，如下：
​        1.el不要写，为什么？
​            最终所有的组件都要经过一个vm的管理，由vm中的el决定服务于哪一个容器。
​        2.data必须写成函数的形式。为什么？
​            避免组件被复用时，数据存在引用关系
​        备注：使用template可以配置组件结构

### Ⅱ.如何注册组件？

​    1.局部注册：靠new Vue的时候传入components选项
​    2.全局注册：靠Vue.component('组件名',组件)

### Ⅲ.编写组件

​    <student></student>

### Ⅳ.几个注意点：

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

### Ⅴ.组件分类：

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

#### Ⅵ.重点es6模块化：

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



## 二、组件与vue实例的关系

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

## 三、render函数

### 1.语法

```javascript
// 函数写法
render(createElement) {
return createElement('h2', '欢迎渲染');
},
// 对象写法
render: function (createElement) {
return createElement('h2', '欢迎渲染');
},
// 对象写法的简写
render: createElement => createElement('h2', '欢迎渲染'),
// 改变参数名称
// h() 是 hyperscript 的简称——意思是“能生成 HTML (超文本标记语言) 的 JavaScript”
render: h => h('h2', '欢迎渲染'),
// 若是组件
render: h => h(App)
```

### 2.使用情景

关于不同版本的vue:

​	1.vue.js与vue.runtime.xxx.js的区别：

​		（1）vue.js是完整版本的vue，包含：核心功能+模板解析器

​		（2）vue,runtime.xxx.js是运行版本的vue,只包含核心功能，没有模板解析器

​	2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接受到的createElment函数去指定具体内容

## 四、vue的配置

使用vue.config.js配置文件：

### 1.查看vue脚手架的默认配置

```js
vue inspect > output.js
```

### 2.使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh/config/#pages

## 五、ref属性

### 1.被用来给元素或子组件注册引用信息（id的替代者）

### 2.应用在html标签上获取的是真实dom元素，应用在组件标签上是组件的实例对象（vc）

3.使用方法：

​	打标识：<h1 ref="xxx">.....</h1>或者<MySchool ref="xxx"></MySchool>

​	获取：this.$refs.xxx

```vue
 <template>
  <div>
    <h1 ref="title">{{ title }}</h1>
    <button @click="show_info">点我打印上部标签</button>
    <p ref="paragraphs">我是段落</p>
  </div>
</template>

<script>
export default {
  name: "MySchool",
  data() {
    return {
      title: '欢迎学习',
    };
  },
  methods:{
    show_info(){
      console.log(this.$refs.title);
      console.log("---------------");
      console.log(this.$refs.paragraphs);
    }
}
};
</script>

```

## 六、通过Prop向子组件传值

### 1.功能：让组件接收外部传过来的数据

### 2.父组件传递数据：<MyDemo name="xxx" /> 或者<MyDemo :name="xxx" />

### 3.子组件接收数据：

#### 	(1)第一种方式（只接收）：

```js
props:["name"]
```

#### 	(2)第二种方式（限制类型）：

```js
props:{
	name:String
}
```

#### 	(3)第三种方式（限制类型、限制必要性、指定默认值）

```js
props:{
    name:{
        type:String,
        //必要的
        required:true,
    },
    age:{
        type:Nunber,
        //默认值
        default:20
    }
}
```

备注：props是只读的，vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到组件的data中一份，然后修改data中的数据，vue的机制是若属性名字一样，先处理渲染props再考虑data中的数据（props的优先级高）

父组件：

```vue
<template>
  <div class="demo">
    <h3>组件实例中传递值</h3>
    <MyStudent name="tom" :age="22"></MyStudent>
    <h3>父组件的data中传递值</h3>
    <MyStudent v-for="p in person" :key="p.id" :name="p.name" :age="p.age" />	
  </div>
</template>

<script>
import MyStudent from "@/components/MyStudent";
export default {
  name: 'MySchool',
  data() {
    return {
      person: [
        {id: 1, name: "lucy", age: 18},
        {id: 2, name: "bob", age: 25},
        {id: 3, name: "jack", age: 24},
      ],
    };
  },
  components: {
    MyStudent,
  },
};
</script>
```

子组件：

```vue
<template>
  <div class="student">
    <h5>{{ msg }}</h5>
    <h5>你好我是{{ name }}</h5>
    <h5>年龄是：{{ age + 1 }}</h5>
    <h6>组件年龄{{myAge}}</h6>
    <button @click="handler_add">点我年龄增加</button>
  </div>
</template>

<script>
export default {
  name: 'MyStudent',
  data() {
    return {
      msg: "学生个人信息",
      myAge: this.age,
    };
  },
  methods: {
    handler_add(){
      this.myAge++
    }
  },
  // 简单声明接收
   props:["name","age"]

  // 接收的同时对类型进行限制
   props: {
     name: String,
     age: Number,
  },

  // 接收的同时对类型进行限制,默认值的指定，必要值的限制
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 18,
    },
  },
};
</script>

```

## 七、mixin混入

### 1.功能：可以把多个组件共用的配置提取成一个混入对象

### 2.使用方式：

#### （1）第一步：定义混合

```js
export const mixin={
    data(){....},
    methoods:{....},
    .....
}
```

#### 	(2）第二步：使用混合

```js
//全局混入（再main.js下）
import {mixin1,mixin2} from 'xxx'
Vue.mixin(mixin1)
Vue.mixin(mixin2)

//局部混入
import {mixin1,mixin2} from 'xxx'
//组件中配置
mixins:['mixin1','mixin2']
```



## 八、插件

### 1.功能：用于增强Vue

### 2.本质：包含install方法的一个对象，install的第一个参数就是vue，第二个以后的参数是插件使用者传递的数据

### 3.定义插件

```js
//简写
export defualt {
    install(Vue){
    ...
    }	
}
//完整写法
对象.install=function（Vue，options）{
    //1.添加全局过滤器
    Vue.filter(....)

    //2.添加全局自定义指令
    Vue.directive(....)

    //3.配置全局混入
    Vue.mixin(...)

    //4.添加实例方法
    Vue.prototype.$myMethods=function(){...}
}
在main.js中使用插件：
Vue.use(对象)
```



## 九、scoped样式

### 1.用法：让样式在局部生效，防止冲突

### 2.写法：

```vue
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello{
  color: #4cae4c;
  h2{
    color: red;
  }
}
</style>

```

**注意：lang属性如果写了要明确语言类型，默认是css**

