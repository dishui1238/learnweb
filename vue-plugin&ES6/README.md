## axios 插件

> 基于promise用于浏览器和node.js的http客户端
axios具有以下特征：

   - 从浏览器中创建 XMLHttpRequest
   - 从 node.js 发出 http 请求
   - 支持 Promise API
   - 拦截请求和响应
   - 转换请求和响应数据
   - 取消请求
   - 自动转换JSON数据
   - 客户端支持防止 CSRF/XSRF

### 使用

1. 安装
`npm i axios`
2. 引入
`<script src=""></script>`

**注意：axios插件是暴露在 window 对象(全局对象)上，并没有挂载到 Vue 实例上，可直接使用**

### API
```js
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```
### 例子

1. 发起 get 请求
```js
axios.get('/user/1234')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
2. 发起 post 请求
```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
3. 同时发起多个请求
```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}
//同时获取多个接口
axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```
4. axios 全局拦截器

```js
axios.interceptors.request.use(function(config){
    console.log('拦截成功')
    // 可以做一些 loading 的处理
    return config;
  })
  // 拦截响应
  axios.interceptors.response.use(function(response){

    return response;
  })
```

## ES6语法

### ECMAScript6 简介
- 1995：javascript诞生
- 1997：ECMAScript标准确立
- 1999：ES3出现
- 2009：ES5出现
- 2015：ES6/ECMAScript2015出现，划时代
- 2016：ES7出现
- 2017：ES8出现

### ES6 常用命令

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

## JS模块化开发
> AMD、CMD、CommonJS 和 ES6

### AMD
> AMD 是 RequireJS 在推广过程中对模块定义的规范化产出

### CMD
> CMD 是 SeaJS 在推广过程中对模块定义的规范化产出
1. 所有模块都通过 define 来定义
2. 通过 require 来引入依赖

### CommonJS
> 在服务端进行模块划分, NodeJS是CommonJS规范的实现,通过 module.export

### ES6
> export 和 import
