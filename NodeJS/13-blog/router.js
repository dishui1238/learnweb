var express = require('express')
var User = require('./models/user.js')
var md5 = require('blueimp-md5')

// 创建一个路由容器
var router = express.Router()

// 把路由挂载到router路由容器中
router.get('/', function (req, res) {
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/register', function (req, res) {
    res.render('register.html')
})


router.post('/register', function (req, res, next) {
    // 1.获取表单提交的数据
    var body = req.body

    // 2.操作数据库
    // 判断该用户是否存在，存在—>>不准许注册
    // 3.发送响应
    User.findOne({
        $or: [
            { email: body.email },
            { nickname: body.nickname }
        ]
    }, function (err, data) {
        if (err) {
            // 将对象转为字符串
            // res.status(200).send(JSON.stringify({  }))
            // Express提供了一个响应方法：json
            // return res.status(500).json({
            //     err_code: 500,
            //     message: '服务端错误'
            // })
            return next(err)
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或昵称已存在'
            })
        }
        // md5 加密
        body.password = md5(md5(body.password))

        // 插入一条记录
        new User(body).save(function (err, data) {
            if (err) {
                // return res.status(500).json({
                //     err_code: 500,
                //     message: '服务端错误'
                // })
                return next(err)
            }
            // 添加session数据
            req.session.user = data
            // 将对象转为字符串
            // res.status(200).send(JSON.stringify({  }))
            // Express提供了一个响应方法：json
            return res.status(200).json({
                err_code: 0,
                message: '注册成功'
            })
        })
    })
})

router.get('/login', function (req, res) {
    res.render('login.html', {
        user: req.session.user
    })
})

router.post('/login', function (req, res, next) {
    var body = req.body

    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function (err, data) {
        if (err) {
            //     return res.status(500).json({
            //         err_code: 500,
            //         message: err.message
            //      
            // })
            //当调用next时，如果传递了参数，直接往后找到带有四个参数的中间件
            return next(err)
        }

        // 如果邮箱和密码匹配，则 data 是查询到的用户对象，否则就是 null
        if (!data) {
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password is invalid.'
            })
        }

        req.session.user = data
        return res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/logout', function (req, res) {
    // 清除登录状态
    req.session.user = null
    res.redirect('/login')
})

module.exports = router
