# ECMAScript
[ECMAScript6](http://es6.ruanyifeng.com/)
## ECMAScript 简介
- 1995：javascript诞生
- 1997：ECMAScript标准确立
- 1999：ES3出现
- 2009：ES5出现
- 2015：ES6/ECMAScript2015出现，划时代
- 2016：ES7出现
- 2017：ES8出现

## ES5 介绍

### 1. 严格模式 strict mode
`'use strict'`
约束：
+ 必须使用 var 声明变量
+ 禁止自定义的函数中使用 this 指向 window
+ 创建 eval 作用域
+ 对象不能有重名的属性

### 2. JSON 对象
+ JSON.stringfy(obj/arr) js对象(数组)转换为 json 对象(数组)
+ JSON.parse(json)  json对象(数组)转换为js对象
*注意：json字符串指的是json对象或数组，与普通字符串不同*

### 3. Object 扩展
> ES5 给Object扩展了一些方法，常用的2个：
+ Object.create(prototype,[descriptors])
   + 作用：以指定对象为原型创建新的对象
   + 为新的对象指定新的属性，并对属性进行描述
      - value：指定值
      - writeable：标识当前属性值是不是可修改的，默认false
      - configurable: 标识当前属性是否可被删除，默认false
      - enumerable: 标识当前属性是否能用 for in 枚举，默认false
```js
var obj1 = {
      firstName: 'kobe',
      lastName: 'bryant'
    }
    obj1 = Object.create(obj1, {
      age: {
        value: '30',
        writable: true,
        configurable: true,
        enumerable: true
      }
    })
```
+ Object.defineProperties(object,descriptors)
   + 作用：为指定对象定义扩展多个属性
   + get: 获取扩展属性的值时get方法自动调用 (惰性求值)
   + set: 监听扩展属性，当扩展属性发生变化时立即调用
   + 存取器属性：getter 取值, setter 存值
```js
var obj2 = {
      firstName: 'kobe',
      lastName: 'bryant'
    }
    Object.defineProperties(obj2, {
      fullName: {
        get: function () { // 获取扩展属性的值
          return this.firstName + ' ' + this.lastName
        },
        set: function (data) { //监听扩展属性，当扩展属性发生变化时立即调用
          console.log(data) //kobe bryant boss
          this.firstName = data
        }
      }
    })
```
```js
var obj = {
      name: 'crystal',
      age: 23,
      get description() {
        return `${this.name},${this.age} years old`
      },
      set description(data) {
        this.name = data
      }
    }
    console.log(obj.description) //crystal,23 years old
    obj.description = 'hello everyone!'
    console.log(obj.description) //hello everyone!,23 years old
```

### 4. Array 扩展
监测方法：
1. Array.isArray():监测是否为数组
位置方法：
2. Array.indexOf(value):得到值在数组中的第一个下标
3. Array.lastIndexOf(value):得到值在数组中的最后一个下标
迭代方法：
4. Array.forEach(function(item,index){}):遍历数组
5. Array.map(function(item,index){}):对数组中每一个值执行函数，并返回执行函数过后的数组 
6. Array.filter(function(item,index){}):比那里过滤出一个新的数组，返回条件为true的值
7. Array.every(function(item,index){}):对数组中每一项运行给定函数，如果该函数对每一项都返回true，则返回true
8. Array.some(function(item,index){})：对数组中每一项运行给定函数，如果该函数对任一项都返回true，则返回true
归并方法：
9. Array.reduce(function(prev,cur,index,array){})：从数组的第一项开始，逐个遍历到最后，返回构建的值
   + 第一个参数(可选)：归并基础的初始值
   + 第二个参数：function(),函数可接受四个参数：前一个值，当前值，项的索引，数组对象
10. Array.reduceRight(function(prev,cur,index,array){})：从数组的最后一项开始，逐个遍历，返回构建的值

### 5. Function 扩展
1. Function.prototype.call(this作用域,[参数数组])
   + 改变this指向，扩充作用域
   + 绑定完 this 立即调用函数
2. Function.prototype.apply(this作用域,参1,参2,参3 ···)
   + 改变this指向，扩充作用域
   + 绑定完 this 立即调用函数
3. Function.prototype.bind(this作用域)
   + this值会被绑定到传给bind函数的值
   + 绑定完 this 不会立即调用当前函数，而是将函数返回
   + 传参方式同 call 相同

```js
    var obj = {
      name: 'crystal'
    }
    function foo() {
      console.log(this)
    }
    foo() //window
    foo.bind(obj)() //{name: "crystal"}
```

## ES6
### 1. let 关键字
1. 作用：与 var 类似，用于声明一个变量
2. 特点：
   + 在块级作用域内有效
   + 不能重复声明
   + 不会预处理，不存在提升
3. 应用：
   + 循环遍历加监听
   + 使用 let 取代 var 是趋势
***js预解析***
*在当前作用域下,js运行之前，会把带有var和function关键字的事先声明，并在内存中安排好。然后再从上到下执行js语句。预解析只会发生在通过var定义的变量和function上。*
*只要是通过var定义的，不管是变量，还是函数，都是先赋值undefined，如果是变量，也不管变量有没有赋值，在预解析阶段，都是会被赋值为undefined。*
*我们运行函数的时候会生成一个新的私有作用域（每次执行都是新的，执行完成就销毁）这个作用域下我们可以理解为开辟了一个新的内存空间。在这个内存中我们也要执行预解析。当我们的函数执行完成后，这个内存或者作用域就会销毁*
*如果在当前作用域下的一个变量没有预解析，就会向它的上一级去找，直到找到window，如果window下也没有定义，就会报错。所以，在函数内通过var定义的变量是局部变量，没有能过var 定义的变量是全局变量。*
*预解析不会在同一个变量上重复的发生，也就是一个变量如果已经在当前作用域下预解析了，不会再重复解析。*
```js
//   ====每个btn弹出的都是btns.length的值，原因：点击事件会放到队列里进行执行，主程序不会等待
    let btns = document.getElementsByTagName('input')
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i]
      btn.onclick = function () {
        alert(i)
      }
    }
```
问题解决：1. 闭包，立即执行函数
```js
let btns = document.getElementsByTagName('input')
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i];
        (function (i) {
          btn.onclick = function () {
            alert(i)
          }
        })(i)
    }
```
问题解决：2. 使用 let 声明 i ,则 i 在块级作用域内
```js
let btns = document.getElementsByTagName('input')
    for (let i = 0; i < btns.length; i++) {
      var btn = btns[i];
        btn.onclick = function () {
        alert(i)
      }
    }
```

### 2. const 关键字
1. 作用：定义一个常量
2. 特点：
   + 不能被修改
   + 其他特点同 let
3. 应用： 保存不用改变的数据

### 3. 变量的解构赋值
1. 理解：从对象或数组中提取数据，并赋值给变量(多个)
2. 对象的解构赋值：`let {x,y} = {x:'crystal',y:23}`
3. 数组的解构赋值：`let [x,y] = ['crystal',23]`
4. 作用：给多个形参赋值
```js
let obj = {name:'crystal',age:23}

let {name,age} = obj
console.log(name,age) // crystal 23 
```

### 4. 模板字符串
1. 作用：简化字符串的拼接
2. 模板字符串必须用 `` 包含
3. 变化的部分用${}定义

### 5. 简化的对象写法
1. 省略同名的属性值
2. 省略方法的 function
```js
let name = 'crystal'
let age = 23
let obj = {
  name ,
  age ,
  // getName:function(){ // 先前的写法
  //   return this.name
  // },
  getName(){
    return this.name
  }
}
```

### 6. 箭头函数
1. 作用：定义匿名函数
2. 基本语法：
   + 没有参数：() => console.log(...)
   + 一个参数：i => i+2
   + 大于一个参数：(i,j) => i+j
   + 函数体不用大括号：默认返回结果
   + 函数体如果有多个语句，需要用 {} 包围，若有需要返回的内容，需要手动返回
3. 使用场景：多用来定义回调函数
4. 特点：
   + 简洁
   + 箭头函数没有自己的 this，箭头函数的 this 不是调用的时候决定的，而是在定义的时候处在的对象就是它的this
   + 扩展理解：箭头函数的this看外层是否有函数，如果有=>外层函数的this就是箭头函数的this，如果没有=>则this是window

### 7. 三点运算符
1. rest(可变)参数
   + 用来取代 arguments ，但比 arguments 灵活,arguments是伪数组，不具备数组的方法，而rest可变参数是真正的数组，具备数组的一切方法
   + rest参数必须是最后部分的形参参数 Rest parameter must be last formal parameter
```js
    function foo(a, ...value) {
      console.log(arguments) //Arguments(4) [1, 2, 3, 4, callee: (...), Symbol(Symbol.iterator): ƒ]

      console.log(value) //(3) [2, 3, 4]
    }
    foo(1, 2, 3, 4)
``` 
2. 扩展运算符
   + 和数组结合，可拆解数组
```js
    let arr = [1, 6]
    let arr1 = [2, 3, 4, 5]
    arr = [1, ...arr1, 6]

    console.log(arr) //(6) [1, 2, 3, 4, 5, 6]
    console.log(...arr) //1 2 3 4 5 6
```

### 8. 形参默认值
> 当不传入参数的时候使用形参里的默认值
```js
function point(x=0,y=0){
  this.x = x ;
  this.y = y ;
}
point() // 不传入值时，默认x=0,y=0
```

### 9. Promise 对象
1. Promise 对象：代表了未来将要发生的事件(通常是一个异步操作)
2. 有了 Promise 对象可以将异步操作以同步的流程表达出来，避免层层嵌套的回调函数(回调地狱)
3. ES6 的 Promise 是一个构造函数，用来生成 promise 实例
4. 使用 Promise 基本步骤（2步）：
   + 创建 Promise 对象
   ```js
   let promise = new Promise((resolve,reject)=>{
     // 初始化 promise 状态为 pending
     // 执行异步操作
     if(异步操作成功){
       resolve(value); // 修改 promise 状态为 fullfilled
     } else {
       reject(errmsg); // 修改 promise 的状态为 rejected
     }
   })
   ```
   + 调用 promise 的 then()
   ```js
   promise.then(()=>{},()=>{})
   ```
5. promise 对象的三个状态：
   + pending: 初始化状态
   + fullfilled: 成功状态
   + rejected: 失败状态

> 补充：AJAX
[廖雪峰AJAX](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499861493e7c35be5e0864769a2c06afb4754acc6000)
1. AJAX不是JavaScript的规范，Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求。
2. AJAX请求是异步执行的，也就是说，要通过回调函数获得响应
3. onreadystatechange:存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
4. readyState存有 XMLHttpRequest 的状态，从 0 到 4 发生变化
   + 0: 请求未初始化
   + 1: 服务器连接已建立
   + 2: 请求已接收
   + 3: 请求处理中
   + 4: 请求已完成，且响应已就绪
5. status:
   + 200: "OK"
   + 404: 未找到页面

```js
//原生 JavaScript 实现 AJAX
let request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

request.onreadystatechange = function () { // 状态发生变化时，函数被回调
    if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
            // 成功，通过responseText拿到响应的文本:
            return ××××
        } else {
            // 失败，根据响应码判断失败原因:
            return ××××
        }
    } else {
        // HTTP请求还在继续...
    }
}

// 发送请求:
request.open('GET', '/api/categories');
request.send();
```

### 10. Symbol 属性
> ES6 中添加了一种原始数据类型 Symbol (已有的原始数据类型 String,Number,Boolean,null,undefined,Object)
1. 产生原因：ES5 中对象的属性名都是字符串，容易造成重名，污染环境
2. 特点：
   + Symbol 属性对应的值是唯一的值，解决命名冲突问题
   ```js
    let obj2 = Symbol()
    let obj3 = Symbol()
    console.log(obj2 == obj3) //false====唯一性
    console.log(obj2) //Symbol()
    console.log(obj3) //Symbol()

    // 可以传入唯一的标识以进行区分
    let obj4 = Symbol('4')
    let obj5 = Symbol('5')
    console.log(obj4) //Symbol(4)
    console.log(obj5) // Symbol(5)
   ```
   + Symbol 值不能与其它数据进行计算，包括同字符串拼接
   + for in ，for of 遍历时不会遍历 Symbol 属性
   ```js
   let symbol = Symbol();
    let obj = {
      name: 'crystal',
      age: 23
    };
    obj[symbol] = 'hello';
    for (let i in obj) {
      console.log(i)//name age
    }
   ```
3. 使用
   + 调用 Symbol 函数得到 symbol 值
   ```js
   let symbol = Symbol();
    let obj = {
      name: 'crystal',
      age: 23
    };
    obj[symbol] = 'hello';
    console.log(obj)
   ```
   + 传参标识 
   ```js
   // 可以传入唯一的标识以进行区分
    let obj4 = Symbol('4')
    let obj5 = Symbol('5')
    console.log(obj4) //Symbol(4)
    console.log(obj5) // Symbol(5)
   ```
   + 内置 Symbol 值：除了定义自己使用的 Symbol 值外，ES6 还提供 11 个内置的 Symbol 值，指向语言内部的使用方法
      * Symbol.iterator 属性指向对象的默认遍历器方法

### 11. iterator 接口机制
> iterator 是一种接口机制，为不同的数据结构提供统一的访问机制
1. 作用：
   + 为各种数据结构，提供一个统一的、简便的访问接口
   + 是的数据结构成员能够按某种次序排列
   + ES6 创造了一种遍历命令 for···of 循环，iterator 接口主要供 for...of 消费
   + 将 iterator 接口部署在指定的数据类型(数组，字符串，arguments，set容器，map容器)上，可以使用 for of 去循环遍历
2. 工作原理：
   + 创建一个指针对象(遍历器对象)，指向数据结构的起始位置
   + 第一次调用 next 方法，指针会一直往后移动，知道指向最后一个成员
   + 每调用 next 方法返回的是一个包含 value 和 done 的对象( value 表示当前成员的值，done 对应的布尔值表示当前的数据结构是否遍历结束)
   + 当遍历结束的时候，返回的 value 值为 undefined，done 为 true
```js
    function myIterator(arr) {
      let nextIndex = 0;
      return {
        next: function () {
          return nextIndex < arr.length ? {
            value: arr[nextIndex++],
            done: false
          } : {
            value: arr[nextIndex++],
            done: true
          }
        }
      }
    }
    let arr = [1, 2, 3, 4]
    let iteratorObj = myIterator(arr)
    console.log(iteratorObj.next()) //1 false
    console.log(iteratorObj.next()) //2 false
    console.log(iteratorObj.next()) //3 false
    console.log(iteratorObj.next()) //4 false
    console.log(iteratorObj.next()) //undefined true
```
3. 扩展理解
   + 当数据结构上部署了 Symbol.iterator 接口，该数据是可以用 for of 遍历
   + 当使用 for of 去遍历目标数据的时候，该数据会自动去找 Symbol.iterator 属性
   + Symbol.iterator 属性指向对象的默认遍历器方法
      * Array
      * arguments
      * set 容器
      * map 容器

### 12. Generator 函数
> Generator 函数是 ES6 提供的解决异步编程的方案之一。 Generator 函数是一个状态机，内部封装了不同状态的数据，用来你生成遍历器对象，可暂停函数(惰性求值)，yield 可暂停，next 方法可启动，每次返回的是 yield 后的表达式结果

1. 特点：
   + function 与函数名之间有一个 * 号
   + 内部用 yield 表达式来定义不同的状态
   ```js
   function* generatorExample(){
     let result = yield 'hello';//状态值为 hello
     yield 'generator';//状态值为 generator
   }
   ```
   + generator 函数返回的是指针对象，而不会执行函数内部逻辑
   + 调用 next 方法函数内部逻辑开始执行，遇到 yield 表达式停止，返回 {value:yield后面的表达式结果/undefined, done:true/false}
   + 再次调用 next 方法，会从上一次停止的 yield 处开始
   + yield 语句的返回结果通常是 undefined ，当调用 next 方法时传参内容会作为启动时 yield 语句的返回值。
```js
// yield 默认返回值是 undefined ，可通过next()传递参数，该参数作为启动时yield的返回值
    function* myGenerator() {
      console.log('开始执行')
      let res = yield 'hello'
      console.log(res) //aaa
      console.log('暂停后，再次执行')
      let result = yield 'generator'
      console.log(result) //undefined
    }

    let MG = myGenerator()
    console.log(MG)
    console.log(MG.next()) //{value: "hello", done: false}
    console.log(MG.next('aaa')) //{value: "generator", done: false}
    console.log(MG.next()) //{value: undefined, done: true}
```
