## 封装读取文件的方法

```js
function getFilePath(fpath){
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    if(err) throw err
    return dataStr
  })
  // 主程序直接向后执行的地方
}

var result = getFilePath(path.join(__dirname,'./files/1.txt'))
console.log(result) //undefined
```
**问题总结**
1. fs.readFile()是一个异步方法，会将其放入队列中进行执行，主程序不会执行
2. 主程序直接向后执行，没有return，故返回undefined

解决办法:利用回调函数
```js
function getFilePath(fpath,callback){
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    if(err) throw err
    callback(dataStr)
  })
}

getFilePath(path.join(__dirname,'./files/1.txt'),(dataStr)=>{
  console.log(dataStr)
})
```
优化：throw err会终止程序运行，没有给用户回馈，改用callback(err)
规定callback的参数：1.成功时（null,dataStr）2.失败时（error,undefined）
```js
function getFilePath(fpath,callback){
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    if(err) callback(err)
    callback(null,dataStr)
  })
}

getFilePath(path.join(__dirname,'./files/1.txt'),(err,dataStr)=>{
  if(err) return err.message
  console.log(dataStr)
})
```
提高：
```js
function getFilePath(fpath,successCallback,errCallback){
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    if(err) errCallback(err)
    successCallback(dataStr)
  })
}

getFilePath(path.join(__dirname,'./files/1.txt'),function(data){
  console.log('成功时的回调函数'+data)
},function(err){
  console.log('失败时的回调函数'+err.message)
})

```
## 异步读取多个文件

1. 回调地狱：嵌套过深

2. Promise解决回调地狱问题

   - Promise 是一个构造函数，可以使用 new Promise 得到一个Promise实例
   - 在 Promise 上，有 resolve（成功之后的回调函数）、reject（失败之后的回调函数）
   - 在 Promise 构造函数的属性上，有一个 .then() 方法
   - Promise 表示一个异步操作，当 new 一个 Promise 实例，就表示创建了一个异步操作
   - 异步操作的结果有两种状态：异步执行成功--内部调用resolve，失败--调用reject
   - Promise 是异步操作，所以内部拿到的操作结果无法使用return吧结果返回给调用者，需要用回调函数

## 两种方式捕获异常

1. 指定失败的回调，不影响后续promise的执行
```js
getFileByPath(path.join(__dirname,'./files/1.txt'))
  .then(function(data){
    console.log(data)
    return getFileByPath(path.join(__dirname,'./files/2.txt'))
  },function(err){//指定失败的回调，不影响后续promise的执行
    console.log(err.message)
  })
  .then(function(data){
    console.log(data)
    return getFileByPath(path.join(__dirname,'./files/3.txt'))
  })
  .then(function(data){
    console.log(data)
  })
```

2. 通过.catch()捕获异常,如果Promise执行失败，则立即终止promise的执行(之前的不会受到影响)
```js
getFileByPath(path.join(__dirname,'./files/1.txt'))
  .then(function(data){
    console.log(data)
    return getFileByPath(path.join(__dirname,'./files/2.txt'))
  })
  .then(function(data){
    console.log(data)
    return getFileByPath(path.join(__dirname,'./files/3.txt'))
  })
  .then(function(data){
    console.log(data)
  })
// 捕获异常,如果Promise执行失败，则立即终止promise的执行(之前的不会受到影响)
.catch(function(err){
  console.log(err.message)
})
```
## jquery 中的 Promise

```js
$(function(){
      $('#btn').on('click',function(){
        $.ajax({
          url:'./data.json',
          type:'get',
          dataType:'json',
          // success:function(data){
          //   console.log(data)
          // }
        })
        .then(function(data){
          console.log(data)
        })
      })
    })  
```

