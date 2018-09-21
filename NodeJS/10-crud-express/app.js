/**
 * app.js 入门模块
 * 职责：做服务相关配置
 *      模板引擎
 *      插件body-parser
 *      静态资源服务
 *      挂载路由
 *      监听端口，启动服务
 */

// 引包
var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')
var router = require('./router')
var bodyParser = require('body-parser')

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量。
var app = express()

// 配置bodyParser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// router(app)
// 配置art-template
app.engine('html', require('express-art-template'))

// 开放资源
app.use('/public/', express.static('./public/'))
app.use('/node_modules/', express.static('./node_modules/'))
app.use(router) //把路由器挂载到app服务中

// 绑定端口，启动服务器
app.listen(3000, function () {
    console.log('running ...')
})
