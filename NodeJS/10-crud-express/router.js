/**
 * router.js 路由模块
 */
// 路由
var fs = require('fs')
var Student = require('./student')
// module.exports = function (app) {
//     app.get('/', function (req, res) {
//         // 读取db.json文件
//         // 第二个参数是可选的，utf8表示把读出的文件通过utf8直接转成我们可以认识的字符
//         // 也可以通过data.toString()进行转换
//         fs.readFile('db.json', 'utf8', function (err, data) {
//             if (err) {
//                 return res.status(500).send('server error')
//             }
//             // data为string类型,一定要手动转成对象
//             // 渲染数据
//             res.render('index.html', {
//                 student: JSON.parse(data).student
//             })
//         })
//     })
//     app.get('/student', function (req, res) {
//     })
// }


// express提供更好的一种方式，专门用来包装路由
var express = require('express')
// 1.创建一个路由容器
var router = express.Router()

// 2.把路由都挂载到router路由容器中
router.get('/', function (req, res) {
    // 读取db.json文件
    // 第二个参数是可选的，utf8表示把读出的文件通过utf8直接转成我们可以认识的字符
    // 也可以通过data.toString()进行转换
    // fs.readFile('db.json', 'utf8', function (err, data) {
    //     if (err) {
    //         return res.status(500).send('server error')
    //     }
    //     // data为string类型,一定要手动转成对象
    //     // 渲染数据
    //     res.render('index.html', {
    //         student: JSON.parse(data).student
    //     })
    // })
    Student.find(function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('index.html', {
            student: data
        })
    })
})
router.get('/students/new', function (req, res) {
    res.render('new.html')
})
router.post('/students/new', function (req, res) {
    var student = req.body
    // console.log(typeof student)  object
    Student.save(student, function (err) {
        if (err) {
            return res.status(500).send('server error')
        }
    })
    res.redirect('/')
})
// 渲染编辑学生页面
router.get('/students/edit', function (req, res) {
    Student.findById(parseInt(req.query.id), function (err, data) {
        if (err) {
            return res.status(500).send('server error')
        }
        res.render('edit.html', {
            student: data
        })
    })
})
// 保存修改数据
router.post('/students/edit', function (req, res) {
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
router.get('/students/delete', function (req, res) {
    Student.delete(req.query.id,function(err){
        if(err){
            return res.status(500).send('server error')
        }
        res.redirect('/')
    })
})
// 3.把router导出
module.exports = router
