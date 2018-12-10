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
*在当前作用域下,js运行之前，会把带有 var 和 function 关键字的事先声明，并在内存中安排好。然后再从上到下执行js语句。预解析只会发生在通过 var 定义的变量和 function 上。*
*只要是通过 var 定义的，不管是变量，还是函数，都是先赋值 undefined，如果是变量，也不管变量有没有赋值，在预解析阶段，都是会被赋值为 undefined。*
*我们运行函数的时候会生成一个新的私有作用域（每次执行都是新的，执行完成就销毁）这个作用域下我们可以理解为开辟了一个新的内存空间。在这个内存中我们也要执行预解析。当我们的函数执行完成后，这个内存或者作用域就会销毁*
*如果在当前作用域下的一个变量没有预解析，就会向它的上一级去找，直到找到 window，如果 window 下也没有定义，就会报错。所以，在函数内通过 var 定义的变量是局部变量，没有能过 var 定义的变量是全局变量。*
*预解析不会在同一个变量上重复的发生，也就是一个变量如果已经在当前作用域下预解析了，不会再重复解析。*
```js
    let btns = document.getElementsByTagName('input')
    for (var i = 0; i < btns.length; i++) {
      var btn = btns[i]
      btn.onclick = function () {
        alert(i)
      }
    }
```
> 上述代码中 变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i ，值为 btns.length

问题解决：1. 闭包，立即执行函数(function(){})()
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
> 上述代码中 变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
```js
for(let i=0;i<10;i++){
  let i = 'abc'
  console.log(i)
  //abc
  //abc
  //abc 表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。
}
```

#### 暂时性死区
+ 使用 let 声明变量使，只要变量在还没有声明完成前使用，就会报错

### 2. const 关键字
1. 作用：定义一个常量
2. 特点：
   + 不能被修改
   + 声明后必须立即初始化
   + 块级作用域内有效
   + 其他特点同 let
3. 应用： 保存不用改变的数据

### 3. 变量的解构赋值
1. 理解：从对象或数组中提取数据，并赋值给变量(多个)
2. 对象的解构赋值：`let {x,y} = {x:'crystal',y:23}`
3. 数组的解构赋值：`let [x,y] = ['crystal',23]`
4. 字符串的解构赋值：`const [a, b, c, d, e] = 'hello';`
5. 作用：给多个形参赋值
```js
let obj = {name:'crystal',age:23}

let {name,age} = obj
console.log(name,age) // crystal 23 
```
6. 如果解构不成功，变量的值就等于undefined。
```js
let [foo] = []; //foo---undefined
let [bar, foo] = [1]; //bar--1, foo--undefined
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
   + 用来取代 arguments ，但比 arguments 灵活, arguments 是伪数组，不具备数组的方法，而 rest 可变参数是真正的数组，具备数组的一切方法
   + rest 参数必须是最后部分的形参参数 Rest parameter must be last formal parameter
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

1. Promise 对象：所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
2. 有了 Promise 对象可以将异步操作以同步的流程表达出来，避免层层嵌套的回调函数(回调地狱)
3. ES6 的 Promise 是一个构造函数，用来生成 promise 实例
4. 使用 Promise 基本步骤（2步）：
   + 创建 Promise 对象：Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
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
   + 调用 promise 的 then()：Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数
   ```js
   promise.then(()=>{},()=>{})
   ```
5. promise 对象的三个状态：
   + pending: 初始化状态
   + fulfilled: 成功状态
   + rejected: 失败状态
6. Promise 缺点：首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
7. 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。reject函数的参数通常是Error对象的实例，表示抛出的错误；resolve函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。
```js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```
上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。
*注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。*
```js
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```
上面代码中，调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。这是因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。

一般来说，调用resolve或reject以后，Promise 的使命就完成了，后继操作应该放到then方法里面，而不应该直接写在resolve或reject的后面。所以，最好在它们前面加上return语句，这样就不会有意外。
```js
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```
#### Promise.prototype.then() 
+ then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）
#### Promise.prototype.catch()
   + Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
   + Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
   + 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
   + catch方法返回的还是一个 Promise 对象
   ```js
   promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
  ```
#### Promise.prototype.finally() 
> finally方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。
+ finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

```js
promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
```

#### Promise.all()
+ Promise.all方法用于将多个 Promise 实例，包装成一个新的 Promise 实例,Promise.all方法接受一个数组作为参数
```js
const p = Promise.all([p1, p2, p3]);
```
+ 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
+ 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

> 补充：AJAX
[廖雪峰AJAX](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499861493e7c35be5e0864769a2c06afb4754acc6000)
1. AJAX不是JavaScript的规范，Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求。
2. AJAX请求是异步执行的，也就是说，要通过回调函数获得响应
3. onreadystatechange:存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
4. readyState 存有 XMLHttpRequest 的状态，从 0 到 4 发生变化
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
> ES6 中添加了一种原始数据类型 Symbol ，表示独一无二的值(已有的原始数据类型 String,Number,Boolean,null,undefined,Object)
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
   + 作为属性名的 Symbol：由于每个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就会保证不会出现同名的属性 
   + Symbol 值作为对象属性名时，不能用点运算符，Symbol 值必须放在方括号之中
   ```js
   let symbol = Symbol();
    let obj = {
      name: 'crystal',
      age: 23
    };
    obj[symbol] = 'hello';
    console.log(obj)
   ```
   + 传参标识 ：Symbol函数可以接收一个字符串作为参数，表示对 symbol 实例的描述(比较容易区分)
   ```js
   // 可以传入唯一的标识以进行区分
    let obj4 = Symbol('4')
    let obj5 = Symbol('5')
    console.log(obj4) //Symbol(4)
    console.log(obj5) // Symbol(5)
   ```
   + 内置 Symbol 值：除了定义自己使用的 Symbol 值外，ES6 还提供 11 个内置的 Symbol 值，指向语言内部的使用方法
      * Symbol.iterator 属性指向对象的默认遍历器方法
      ```js
          // 对象的 Symbol.iterator 实现，指向遍历器对象
        let obj = {
          name: 'crystal',
          age: 23
        }
        // for (let i of obj) { //报错！！
        //   console.log(i)
        // }
        // 为对象人为的定义一个 iterator 接口
        obj[Symbol.iterator] = function* test() {
          yield 1
          yield 2
          yield 3
        }
        for (let i of obj) {
          console.log(i)//1 2 3
        }
      ```
*注意：Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。*

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

### 13. async 函数(ES2017)
> 真正意义上解决异步回调的问题，同步流程表达异步操作
1. 本质：Generator 的语法糖
2. 语法：
```js
async function foo(){
  await 异步操作；
  await 异步操作；
}
```
3. 特点：
   + 不需要像 Generator 调用 next 方法，遇到 await 等待，当前异步操作执行完就往下执行
   + 返回的总是 Promise 对象，可以用 then 方法进行下一步操作
   + async 取代 Generator 函数的 * 号，await 取代 Generator 的 yield
   + 语义上更为明确，使用简单，经临床验证，暂时没有任何副作用及不良反应

### 14. class类
+ 通过 class 定义类/实现类的继承
+ 在类中通过 constructor 定义构造函数
+ 通过 new 来创建类的实例
+ 通过 extends 来实现类的继承
+ 通过 super 来调用父类的构造方法
+ 重写从父类中继承的一般方法
```js
// 定义一个人物的类
    class Person2 {
      // comstructor 是类的构造方法
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      // 类的一般方法(必须用对象的简写方式)
      showName() {
        console.log(this.name)
      }
    }
    let person2 = new Person2('dishui', 23)
    console.log(person2)
    person2.showName()

    // 子类
    class StarPerson extends Person2 {
      constructor(name, age, salary) {
        super(name, age); //调用父类的构造方法
        this.salary = salary;
      }
      // 父类的方法重写
      showName(){
        console.log('子类的方法')
      }
    }
    let p1 = new StarPerson('ctystal', 23, 10000)
    console.log(p1) //StarPerson {name: "ctystal", age: 23, salary: 10000}
    p1.showName() //子类的方法
```

### 15. 字符串、数组的扩展

#### 字符串扩展
+ includes(str):判断是否包含指定的字符串
+ startsWith(str):判断是否以指定的字符串开头
+ endWith(str):判断是否以指定的字符串结尾
+ repeat(str):重复指定次数

#### 数组扩展
+ 二进制与八进制数值表示法：二进制用 0b ,八进制用 0o
+ Number.isFinite(i):判断是否是有限大的数(Infinity表示无限大的数)
`cosnole.log(Number.isFinite(Infinity)) //false`
+ Number.isNaN(i):判断是否是 NaN
+ Number.isInterger(i):判断是否是整数
`console.log(Number.isInterger(123.0)) //true`
+ Number.parseInt(str):将字符串转换为对应的数值
`console.log(Number.parseInt('123abc123')) //123`
`console.log(Number.parseInt('a123abc123')) //NaN`
+ Math.trunc(i):直接去除小数部分

#### 数组方法的扩展
+ Array.from(v):将伪数组对象或可遍历对象转换为真数组
+ Array.of(v1,v2,v3):将一系列值转换为数组
+ find(function(item,index,arr){return true}):找出第一个满足条件返回true的元素
```js
let arr = [1,2,3,4,5,6]
let result = arr.find(function(item,index){
  return item > 4
})
console.log(result)//5
```
+ findIndedx(function(item,index,arr){return true})

#### 对象方法的扩展
+ Object.is(v1,v2):判断两个数据是否完全相等(以字符串的形式判断)
```js
console.log(0==-0) // true
console.log(NaN==NaN) //false   NaN不等于任何值
console.log(Object.is(0,-0))  //false
console.log(Object.is(NaN,NaN))  //true
```
+ Object.assign(target,source1,source2..):将源对象的属性复制到目标对象上
```js
let obj = {}
let obj1 = {username:'crystal',age:23}
let obj2 = {sex:'female'}
Object.assign(obj,obj1,obj2)
console.log(obj) // {username: "crystal", age: 23, sex: "female"}
```
+ 直接操作 `__proto__ `属性:`let obj2 = {}; obj2.__proto__ = obj1;`
```js
let obj = {};
let obj1 = {money:30000}
obj.__proto__ = obj1
console.log(obj)
console.log(obj.money)//30000
```

### 16. 深度克隆
+ 对 堆 和 栈 内存结构的理解：
   + 基本的数据类型：保存在栈中，保存与复制的是值本身,即拷贝后会生成一份新的数据，修改拷贝后的数据不会影响原数据
   + 引用类型：保存在堆中，保存与复制的是指向对象的一个指针，即拷贝后不会生成新的数据，而是拷贝的一份引用，修改拷贝后的数据会影响原来的数据
+ 拷贝数据的方法：
   1. 直接赋值给一个变量--------------浅拷贝
   2. Object.assign()---------------浅拷贝
   3. Array.prototype.concat()------浅拷贝
   4. Array.prototype.slice()-------浅拷贝
   5. JSON.parse(JSON.stringfy())---深拷贝(深度克隆)，拷贝的数据里不能有函数，处理不了
+ 浅拷贝：拷贝的是引用，修改拷贝后的数据会影响原数据，使得原数据不安全
+ 深拷贝(深度克隆)：考本的时候生成新数据，修改拷贝后的数据不会影响原数据
```js
 // 不会影响原数据
    let str = 'abcd'
    let str2 = str
    str2 = 'efg'
    console.log(str)//abcd

    // 影响原数据
    let obj = {username:'dishui',age:23}
    let obj1 = obj 
    obj1.username = 'ctystal'
    console.log(obj.username) //crystal

    let arr = [1,3,4,5]
    let arr1 = arr
    arr1[0] = 'asd'
    console.log(arr) //["asd", 3, 4, 5]
```
> 如何实现深度拷贝(克隆)？？拷贝的数据里不能有数据或数组，即使有对象或数组，可以继续遍历对象/数组，一直拿到是基本数据类型，然后进行复制，这时就是深度拷贝(克隆)
+ 如何判断数据类型：
   - typeof 返回的数据类型有 String, Number, Blooean, Undefined, Object, Function
   - Object.prototype.toString.call(obj).slice(8,-1)
   ```js
   let result = 'abcd'
   result = null
   result = [1,2]
   console.log(Object.prototype.toString.call(result).slice(8,-1))
   ```
   - for in 循环(枚举对象拿到属性名/key,枚举数组拿到下标/index)

```js
//定义检测数据类型的功能函数
function checkedType(target){
  return Object.prototype.toString.call(target).slice(8,-1)
}
//实现深度克隆---对象/数组
function clone(target){
  // 判断拷贝的数据类型
  // 初始化变量 result , 成为最终克隆的数据
  let result,targetType = checkedType(target);
  if(targetType === 'Object'){
    result = {};
  }else if(targetType === 'Array'){
    result = [];
  }else{
     return target;
  }
  // 遍历目标数据
  for(let i in target){
    // 获取遍历数据结构的每一项值
    let value = target[i];
    // 判断目标结构里的每一项是否存在对象/数组
    if(checkedType(value) === 'Object'||checkedType(value) === 'Array'){
        // 继续遍历获取到的 value 值
       result[i] = clone(value)
    }else{//获取到的value值是基本数据类型或者是函数
      result[i] = value
    }
  }
  return result
}

//调用测试
let arr = [1,2,3,{username:'crystal'}]
let arrClone = clone(arr)
arrClone[3].username = 'dishui'
console.log(arr,arrClone)

```

### 17. set、map 容器
1. set 容器：无序的、不可重复的多个 value 的集合体
   + Set()
   + Set(array)
   + add(value)
   + delete(value)
   + has(value)
   + clear()  //清空容器
   + size     //value的个数
```js
let set = new Set([1,2,3,4,2,3,4])
console.log(set)  //{1, 2, 3, 4}
set.clear()
```

2. map 容器：无序的、key不重复的多个 key-value 的集合体
   + Map()
   + Map(array)
   + set(key,value) //添加
   + get(key)
   + delete(key)
   + has(key)
   + clear
   + size //键值对的个数
```js
let map = new Map([['username','dishui'],['age',23]])
console.log(map)  //{"username" => "dishui", "age" => 23}

map.set('sex','female')
console.log(map.size) //3
```

### 18. for of 用法
+ 遍历数组
+ 遍历 Set
+ 遍历 Map
+ 遍历字符串
+ 遍历伪数组

## ES7
1. 指数运算符(幂)：**
2. Array.prototype.includes(value):判断数组中是否包含指定的 value

