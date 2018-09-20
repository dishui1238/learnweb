// 1.引包 
var express = require('express')
// 2.创建服务器应用程序
var app = express()

app.get('/', function (req, res) {
    //send()为express框架中的方法
    res.send('hello world!')
})
app.get('/about', function (req, res) {
    res.send('hello express! 我是中文')
    
})
//  公开指定目录->可通过/public/xx的方式访问 http://127.0.0.1:3000/public/img/11.jpg
// app.use('/public/',express.static('./public/'))

//  公开指定目录->可通过/public/xx的方式访问 http://127.0.0.1:3000/a/img/11.jpg
// app.use('/a/',express.static('./public/'))

//第一个参数省略，可以通过 省略/public的方式来访问 http://127.0.0.1:3000/img/11.jpg
app.use(express.static('./public/'))

app.listen(3000, () => console.log('listening on port 3000!'))
// 当服务器收到get请求/的时候，执行操作
