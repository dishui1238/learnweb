var express = require('express')
var path = require('path')
var router = require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')

// 实例化express
var app = express()

// 配置bodyParser中间件 一定要在挂载路由之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置 express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

// 开放资源
app.use('/public/', express.static(path.join(__dirname, '/public')))
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')))
app.engine('html', require('express-art-template'))

// 设置查找默认目录
app.set('views', path.join(__dirname, './views'))

// 把路由挂载到app中 
app.use(router)

// 配置一个处理404的中间件
app.use(function (req, res) {
    res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use(function (err, req, res, next) {
    res.status(500).json({
        err_code: 500,
        message: err.message
    })
})

app.listen(3000, function () {
    console.log('running')
})
