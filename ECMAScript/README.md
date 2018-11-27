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

1. 严格模式 strict mode
`'use strict'`
约束：
+ 必须使用 var 声明变量
+ 禁止自定义的函数中使用 this 指向 window
+ 创建 eval 作用域
+ 对象不能有重名的属性

2. JSON 对象
+ JSON.stringfy(obj/arr) js对象(数组)转换为 json 对象(数组)
+ JSON.parse(json)  json对象(数组)转换为js对象
*注意：json字符串指的是json对象或数组，与普通字符串不同*

3. Object 扩展
> ES5 给Object扩展了一些方法，常用的2个：
+ Object.create(prototype,[descriptors])
   + 作用：以指定对象为原型创建新的对象
   + 为新的对象指定新的属性，并对属性进行描述
      - value：指定值
      - writeable：标识当前属性值是不是可修改的，默认false
      - configurable: 标识当前属性是否可被删除，默认false
      - enumberable: 标识当前属性是否能用 for in 枚举，默认false
+ Object.defineProperties(object,descriptors)
   + 作用：为指定对象定义扩展多个属性
   + get   
   + set


## ES6 常用命令

- 函数的 Rest 参数和扩展
```js
 // ======================= 1.Rest 参数：··· 表示动态的，不确定的
    function sum(x, y, z) {
      let total = 0;
      if (x) total += x;
      if (y) total += y;
      if (z) total += z;
      // 语言模板
      console.log(`total:${total}`)
    }
    sum(1, 2, 3)

    function sum2(...m) { //...m表示不确定参数的个数
      let total = 0;
      // i of m ==== 对 m 对象的遍历，把 m 中的每一个值放入 i 中
      for (var i of m) {
        total += i;
      }
      console.log(`total:${total}`)
    }
    sum2(1, 2, 3, 4, 5)

    // ES6 方式
    let sum3 = (...m) => {
      let total = 0;
      for (var i of m) {
        total += i;
      }
      console.log(`total:${total}`)
    }
    sum3(1, 2, 3, 4, 5)

    // ... 和数组结合称为函数的扩展，是一种运算符，拆解数组然后输出
    var [x, y] = [4, 8]
    console.log(...[4, 8]) //4 8

    let arr1 = [1, 3];
    let arr2 = [4, 8];
    console.log("concat:" + arr1.concat(arr2)); ////concat:1,3,4,8
    var arr = [...arr1, ...arr2];
    console.log(arr); //[1, 3, 4, 8]

    // 对号入座 
    var [x, ...y] = [1, 2, 3, 4]; //x=1,y=[2,3,4]
    let [a, b, c] = "ES6"; //a="E",b="s",C="6"
```
- Promise的使用
```js
let checkLogin = function () {
      return new Promise((resolve, reject) => {
        let flag = document.cookie.indexOf('userId') > -1 ? true : false;

        if (flag=true) {
          resolve({
            status: 0,
            result: true
          })
        } else {
          reject('err')
        }
      })
    }
    let getUserInfo = () => {
      return new Promise((resolve, reject) => {
        let userInfo = {
          userId: '101'
        }
        resolve(userInfo)
      })
    }

    checkLogin().then((res) => {
      if (res.status == 0) {
        console.log('login success!')
        return getUserInfo()
      }
    }).catch((err) => {
      console.log(err)
    }).then(res2=>{
      console.log(`userId:${res2.userId}`)
    })

    // Promise.all() 同时调用多个接口和请求
    Promise.all([checkLogin(),getUserInfo()]).then(([res1,res2])=>{
      console.log(`result1:${res1.result},result2:${res2.userId}`)
    })
```
- module.exports 和 ES6 import/export 的使用
