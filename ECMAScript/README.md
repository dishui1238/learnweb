# ECMAScript
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
