### js简介

###### **怎样在HTML文档中引用js代码？**

- 行内书写方式

  ```html
  <div class="box" onclick='alert("张三!")'></div>
  ```

- 内联方式

  ```html
  <body>
      <script>
      	//js代码
      </script>
  </body>
  ```

- 外部引用方式

  ```html
  <script src="index.js"></script>
  ```

###### **javascript的组成**

核心（ECMAScript）：提供核心语言功能，规定语法规范标准。

文档对象模型（DOM）：提供访问和操作网页元素的方法和接口，由html页面中的标签组成。

浏览器对象模型（BOM）：提供与浏览器交互的方法与接口，即浏览器中前进、后退、刷新等功能。

###### **console控制台打印输出**

```js
console.log  	//普通输出
console.info   	//前面出现蓝色标记（ 在 chrome 上与 console.log 无区别）
console.warn  	//输出背景为黄色，警告信息
console.error  	//输出背景为红色，错误信息
console.dir  	//可以显示一个对象所有的属性和方法。
```

###### **弹窗**

```js
alert("");				//普通弹窗
prompt("请输入内容");	//输入弹窗
confirm("是否确认");	//确认弹窗
```

### javascript的标识符

###### **什么是标识符？**

变量、函数、属性的名字，或者函数的参数。

###### **标识符的命名规则**

- 由字母、数字、下划线 `_` 或美元符号 `$` 组成
- 不能以数字开头
- 不能使用关键字、保留字等作为标识符

### 变量

###### **什么是变量**？

在js中，变量是存储数据值的容器。通过变量名获取数据，且数据可以修改。

本质：变量是程序在内存中申请的一块用来存放数据的空间。

ECMAScript/javascript是一门松散类型/弱类型语言（变量可以用来保存任何类型的数据）。

###### **变量的命名规范**

- 由字母、数字、下划线 `_` 或美元符号 `$` 组成
- 严格区分大小写
- 不能重复定义/声明

- **关键词/保留词**  不能用来做变量名 
- 语义化驼峰命名

- 见名知意

**关键字：**js已经赋予特殊功能的单词

```
as      const      export     get         null     target   void
async   continue   extends    if          of       this     while
await   debugger   false      import      return   throw    with
break   default    finally    in          set      true     yield
case    delete     for        instanceof  static   try
catch   do         from       let         super    typeof
class   else       function   new         switch   var
```

**保留字：**js保留未来可能要使用的单词

```
enum  implements  interface  package  private  protected  public
```

###### **声明变量**

```js
//定义时赋值
let a = "语文";
//先定义 再赋值
let a;
a = "语文";

//如果一个变量没有声明就使用，JavaScript会报错，告诉你变量未定义
console.log(b);	//b is not defined
```

**const 和 let 的区别：**

**const用来声明常量，不允许被重新赋值。**

### 数据类型

js中的数据类型分为基本数据类型和引用数据类型，基本数据类型有数字（number）、字符串（string）、布尔值（boolean）、undefined、null、symbol、bigint；引用数据类型是对象（object，包括对象、函数、数组）。

###### **String**

字符串必须使用双引号 `""` 或单引号 `''` 或 模板字面量` `` `包裹起来。

```js
let b = "JiaJi";//双引号
let bb = '薛宝钗';//单引号
let bbb = `林黛玉`;//模板字面量
```

引号内部可以有不同的引号，比如双引号可以包裹单引号的字符串

```js
// 双引号中用单引号
console.log("你笑起来像'花儿'一样好看");
// 单引号中用双引号
console.log('你笑起来像"花儿"一样好看');
```

###### Number

**整数**

JavaScript中，数字的整数可以有三种进制：

- 10进制：普通的数字就是10进制
- 8进制：以0、0o、0O开头的数字就是8进制，8进制范围`0-7`
- 16进制：以0x、0X开头数字是16进制，16进制范围`0-9和a-f/A-f`

**八进制**

```js
//以0开头，是八进制；显示的时候会以十进制显示
console.log(017);  	//15  //7*8的零次方  +  1*8的一次方 
console.log(0o17);  //15
console.log(0O17);  //15

//错误写法
//以0开头，以10进制显示
console.log(080);  //80 

//以0o、0O开头，控制台报错
console.log(0o80); //报错
```

8进制只能出现0-7中的数字，如果表示不合法，js将自动认为你输入错误，从而使用10进制显示。

**16进制**

```js
// 十六进制：
console.log(0xff);    //255   f相当于15
console.log(0x2b);    //43

//错误写法
console.log(0x2g);// 控制台报错
```

**浮点数**

JavaScript内部，所有数字都是以64位浮点数形式存储。小数没有进制之分。

```js
console.log(3.1415);
console.log(.35);  //.35 如果整数位数是0，可以不写

//e用来表示乘以10的几次幂
console.log(5e5); //500000
```

**由于浮点数不是精确的值，所以涉及小数的比较和运算要特别小心**

```js
console.log(0.1+0.2);
//0.30000000000000004	
```

**Infinity**

`Infinity`用来表示正无穷或负无穷。

```js
// 场景一
//2的1024次方
 console.log( Math.pow(2, 1024)); //Infinity  
//表达式的计算结果太大，超出了能够表示的范围，因此返回Infinity

// 场景二
 console.log(1/0);   // Infinity
//而非0数值除以0，会返回Infinity。
```

Infinity大于一切数值（除了NaN），-Infinity小于一切数值（除了NaN）。Infinity与NaN比较，总是返回false。

**NaN**

NaN是 JavaScript 的特殊值，英语全名叫做not a number，表示“非数字“

主要出现在将字符串解析成数字出错的场合。

**NaN不等于任何值，包括它本身。**

**isNaN()**

isNaN方法可以用来判断一个值是否为NaN。

```js
console.log(isNaN(NaN)); // true
console.log(isNaN(123));  // false

//isNaN只对数值有效，如果传入其他值，会被先转成数值。
比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true
console.log(isNaN('Hello')); // true
```

**isFinite()**

isFinite方法返回一个布尔值，表示某个值是否为正常的数值。

```js
console.log(isFinite(Infinity)); // false
console.log(isFinite(-Infinity)); // false
console.log(isFinite(NaN)); // false
console.log(isFinite(undefined)); // false
//除了Infinity、-Infinity、NaN和undefined这几个值会返回false
```

###### **Boolean**

布尔（逻辑）只能有两个值：true 或 false。

除了下面六个值被转为false，其他值都视为true。

```
undefined
null
false
0
NaN
""或''或 ``（空字符串）
```

布尔值往往用于程序流程的控制

```js
if (表达式) {
  console.log('true');
}
//if命令后面的条件表达式，预期应该是一个布尔值
```

###### **Undefined**

undefined 表示这个值未被定义

**undefined 出现的场景：**

- 变量被声明了，但没有赋值时，就等于undefined。
- 调用函数时，应该提供的参数没有提供，该参数等于undefined。
- 对象没有赋值的属性，该属性的值为undefined。
- 函数没有返回值时，默认返回undefined。

###### **Null**

null 表示空，与undefined不同的是，

null它表示一个空对象指针，undefined则表示未定义

```js
 let f = null;
 //提前定义变量,指向一个空的内存地址,知道这个变量即将存储对象数据。
```

如果一个需要保存对象的变量没有真正保存对象，就应该明确的让该变量保存 null 值，这样做不仅可以体现 null 作为空对象指针的惯例，而且有助于进一步区分 null 和 undefined 

 **说明：undefined值是派生自null值的,所以undefined == null的返回结果是true。**

###### **Object-Array数组**

数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。

```js
//数组的作用是用来存储一组数据,本身是复杂类型,里面存储其他任何类型的数据
let a = [ "林黛玉" ,"JiaJi" , "薛宝钗" , 200 ,true]
console.log(a);
```



```js
//如果在中间多写一个逗号里面什么都不写
let b = [ "林黛玉" ,"JiaJi" , , "薛宝钗" , 200 ,true]
console.log( b ); //数组占位为empty     
console.log("数组的长度", b.length );
console.log( "下标2的数据:" , b[2]); //取值是undefined的数据类型 
```

**人为设置`length`大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位**

```js
let arr = [1,2,3];
arr[10] = 100;   // arr[3]到arr[9] 的值为 empty (留了空位) 读取新增的位置都会返回undefined。
console.log(arr[9])//undefined
```

**人为设置一个小于当前成员个数的值，该数组的成员数量会自动减少到`length`设置的值。**

```js
let arr = [ 'a', 'b', 'c' ];
console.log(arr.length); // 3
arr.length = 2;
console.log(arr); // ["a", "b"]
```

**清空数组的一个有效方法，就是将`length`属性设为0。**

```js
arr.length = 0;
console.log(arr)//[]
```

###### object-object(狭义的对象)

Js核心概念  

对象是一组键值对的集合 , 是一种无序的复合数据集合

```js
  //对象  --->  对一个东西的描述

let lindaiyu = {
    name : "林黛玉",    //属性名(键名):属性值(键值)
    sex : "女",		
    age : 16 ,				
    weight : "50kg",
    height : "150cm",
};

console.log(lindaiyu);

 /*对象所有的属性名都是字符串,加引号和不加引号都可以 除非不符合标识符的规则，比如第一个字符为数字含有空格或运算符*/

//属性值可以是任何数据类型

//每一个属性名被称为属性,如果一个属性名的值是函数,则这个属性称为方法

//属性之间用逗号分隔 , 最后一个属性可加可不加

 //属性名不能相同 属性值能相同

```

**对象取值**

```js
//取值,通过对象.属性去获取
console.log(lindaiyu.name);
console.log(lindaiyu.age);


console.log(lindaiyu.a);//取一个对象不存在的属性返回undefined
```

**对象修改**

```js
lindaiyu.age = 23;
console.log(lindaiyu.age);
```

**添加新属性**

```js
lindaiyu.hobby = "怼人";
console.log(lindaiyu);
//属性可以动态的创建和添加 不必在对象声明时全部指定
```

**对象删除**

```js
delete lindaiyu.age
console.log(lindaiyu);

// = 赋值操作不能删除对象属性
lindaiyu.height = undefined;
lindaiyu.height = null;
console.log(lindaiyu);
```

**内置对象,节点对象**

内置对象(js提前帮你定义好的对象)

节点对象(通过去获取的元素)

```js
console.log(window); //内置window对象,里面少读属性只读,大部分可读可写
console.log(document);
```

###### 函数对象

函数是一段可以反复调用的代码块

把一堆代码封装起来,不会立马去执行。

```js
function fn() {
    console.log("大");
    console.log("家");
    console.log("好");
}

// 函数调用方式之一(主动调用)
fn();
```

### typeof 操作符

检测一个变量或数据的数据类型

###### **number类型**

```js
//下面定义的变量都是number类型
let a = 200;       
let b = -123;
let c = 123.456;
let d = .5e4;
let e = 0xf0;
let f = 016;
let g = Infinity;       
let h = NaN;

console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
console.log(typeof d);
console.log(typeof e);      
console.log(typeof f);
console.log(typeof g);
console.log(typeof h);
```

######  **string 字符串类型**

```js
let str1 = "您好啊";
let str2 = "666";   
let str3 = "";   //空字符串，也是字符串
console.log(typeof str1);
console.log(typeof str2);
console.log(typeof str3);
```

###### **boolean类型**

boolean类型(布尔类型), 布尔类型只有两个值true,false,即真或假

```js
let bool = true;  
console.log(bool );
console.log(typeof bool );      //boolean
```

###### **undefined 类型**

只let了一个变量，没有赋初值，它的默认值是undefined;

```js
let un;   //没有赋初值，所以就是undefined，类型也是undefined
console.log(un);
console.log(typeof un); //undefined
```

###### **object类型**

```js
console.log(typeof null);//object
console.log(typeof []);//object
console.log(typeof {});//object
console.log(typeof window);//object  内置对象
```

**特殊 ：**null 在使用typeof检测时 ，数据类型为Object  

历史原因造成的。1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑`null`，只把它当作`object`的一种特殊值。后来`null`独立出来，作为一种单独的数据类型，为了兼容以前的代码，`typeof null`返回`object`就没法改变了。

```js
 console.log(typeof null);//object类型  但是是null类型
```

```js
console.log(typeof function a(){})
//function 更好区分普通对象和函数对象
```

