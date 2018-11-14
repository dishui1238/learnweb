const fs = require('fs')
const path = require('path')

// 普通读取文件的方式
fs.readFile(path.join(__dirname,'./files/1.txt'),'utf-8',(err,dataStr)=>{
  // console.log(__dirname) F:\gitRepository\learnweb\Promise
  // console.log(__filename) F:\gitRepository\learnweb\Promise\1.封装读取文件的方法.js
  if(err) throw err
  // console.log(dataStr)
})

// 封装读取文件的方法
function getFilePath(fpath,callback){
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    // if(err) callback(err) 
    if(err) throw err 
    // return dataStr
    callback(dataStr)
  })
  // 主程序直接向后执行的地方
}

getFilePath(path.join(__dirname,'./files/1.txt'),(dataStr)=>{
  console.log(dataStr)
})
// console.log(result) //undefined

// ============ 问题总结 ==============================//
// fs.readFile()是一个异步方法，会将其放入队列中进行执行，主程序不会执行
// 主程序直接向后执行，没有return，故返回undefined

// 规定callback的参数：1.成功时（null,dataStr）2.失败时（error,undefined）
function getFilePath(fpath,callback){
  fs.readFile(fpath,'utf-8',(err,dataStr)=>{
    // if(err) callback(err) 
    if(err) callback(err)
    // return dataStr
    callback(null,dataStr)
  })
  // 主程序直接向后执行的地方
}

getFilePath(path.join(__dirname,'./files/1.txt'),(err,dataStr)=>{
  if(err) return err.message
  console.log(dataStr)
}) 

