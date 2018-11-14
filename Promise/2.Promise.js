// new Promise 实例，会立即调用异步操作中的代码
const fs = require('fs')
const path = require('path')

function getFileByPath(fpath){

  return new Promise(function(resolve,reject){
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
      if(err) return reject(err)
      resolve(dataStr)
    })
  })
}
// ==================第一种方式捕获异常：指定失败的回调，不影响后续promise的执行==============
// 通过.then()指定回调函数，成功的回调必须传，失败的函数可以省略
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


// ===========第二种方式捕获异常：如果Promise执行失败，则立即终止promise的执行(之前的不会受到影响)============
// 通过.then()指定回调函数，成功的回调必须传，失败的函数可以省略
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

