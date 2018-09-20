// 1.引包
var express = require('express')
var bodyParser = require('body-parser')
// 2.创建服务器应用程序
var app = express()
// 配置bodyParser中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// express-art-template是专门把art-template整合到express中的，
// 必须安装art-template,因为express-art-template依赖了art-template
app.engine('html', require('express-art-template'));
// 3.注册request事件

app.get('/', function (req, res) {
    // express开发约定：默认去views目录中找所需文件,
    // 如果想要修改默认views视图渲染存储目录，set('views',目录路径)
    res.render('index.html', {
        comments: comments
    });
})
app.get('/post', function (req, res) {
    // express开发约定：默认去views目录中找所需文件,
    // 如果想要修改默认views视图渲染存储目录，set('views',目录路径)
    res.render('post.html')
})
// app.get('/pinglun', function (req, res) {
    // express开发约定：默认去views目录中找所需文件,
    // 如果想要修改默认views视图渲染存储目录，set('views',目录路径)
    // console.log(req.query)  { name: 'zqq', message: '姬缘，我们还会在一起的吧！' }
    // req.query只能拿到get请求参数
    // var comment = req.query
    // var date = new Date()
    // comment.dateTime = date.toLocaleDateString()
    // comments.unshift(comment)
    // 重定向，跳转到首页
    // res.statusCode = 302
    // res.setHeader('location','/')
    // res.end()
    // res.redirect('/')  框架写法
// })
// 处理post请求
app.post('/post',function(req,res){
    var comment = req.body
    console.log(req.body)
    var date = new Date()
    comment.dateTime = date.toLocaleDateString()
    comments.unshift(comment)
    res.redirect('/')
})
// 开放public目录，能其中获取文件
app.use('/public/', express.static('./public/'))
// 4.绑定端口号，启动服务器
app.listen(3000, function () {
    console.log('running ...')
})

var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三4',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    },
    {
        name: '张三5',
        message: '今天天气不错！',
        dateTime: '2015-10-16'
    }
]
