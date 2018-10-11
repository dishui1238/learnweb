# path路径操作模块

- path.basename()  获取文件名
- path.dirname()  获取目录名
- path.extname()  获取文件扩展名
- path.isAbsolute()  判断是否为绝对路径
- path.parse()  把路径解析成对象
- path.join('c:/a','b') 返回c:\\a\\b 第一个为转义 拼接路径 支持任意个参数 

# Node中的其他成员

在每个模块中，除了require、express等模块相关API之外，还有两个特殊成员：

- __dirname 可以用来获取当前文件所属目录的绝对路径
- __filenme 可以用来获取当前文件的绝对路径

在文件操作中，使用相对路径是不可靠的，因为Node中文件操作的路径倍设计为相对执行node命令所处的路径（不是bug）
为了解决这个问题，只需把相对路径改变为绝对路径

# 配置art-template模板引擎

- 第一步 安装
   + npm install art-template express-art-template

- 第二步 指定.html使用的解析引擎
   + app.engine('html', require('express-art-template'))

- 第三步 设置默认查找目录（默认为views，可不设置）
   + app.set('views',path.join(__dirname,'./views'))

- 第四步 传值

   ```

        app.get('/', function (req, res) {
                res.render('index.html', {
                    user: {
                        name: 'aui',
                        tags: ['art', 'template', 'nodejs']
                    }
                });
            });

   ```
## art-template中的include、extend、block

- {{ include '文件路径'}}
- {{ block 'content' }} 默认内容 {{ /block }} 留一个坑，后面进行填充，若无填充使用默认内容
- {{ extend '留坑的文件路径' }} {{ block 'content' }} 内容 {{ /block }}   填坑

# 路由设计

| 路径      | 请求方式 | get参数 | post参数 | 是否需要登录 |         备注      |
| ---       |    ---   | ---     | ---     |   ---       |      ---          |
| /         | get      |         |         |      否     | 渲染index.html页面 |
| /register | get      |         |         |      否     | 渲染register.html页面 |
| /register | post     |         |email、name、password |      否     | 处理注册请求 |
| /login    | get      |         |         |      否     | 渲染login.html页面 |
| /login    | post     |         |email、name、password       否     | 处理登录请求 |
| /loginout | get      |         |email、name、password       否     | 处理退出请求 |

# 在 Express 中获取 post 表单提交的数据

- 1. 安装 body-parser中间件
   `npm install body-paser`

- 2. 配置body-paser  一定要在挂载路由之前
   `var bodyParser = require('body-parser')`
   `app.use(bodyPaser.urlencoded({ extended:false }))`
   `app.use(bodyParser.json())`

- 3. 使用 req.body 获取post请求数据

# 密码 md5 加密

** 一般使用双重加密 md5(md5(password)) **

# try-catch-finally 语法

- try语句允许我们定义在执行时进行错误测试的代码块。

- catch 语句允许我们定义当 try 代码块发生错误时，所执行的代码块。

- finally 语句在 try 和 catch 之后无论有无异常都会执行。

* 注意： catch 和 finally 语句都是可选的，但你在使用 try 语句时必须至少使用一个。*

- 例

```
 try { 
        if(x == "")  throw "为空";
        if(isNaN(x)) throw "不是一个数字";
        if(x > 10)   throw "太大了";
        if(x < 5)    throw "太小了";
    }
    catch(err) {
        message.innerHTML = "输入的值 " + err;
    }
    //输入 1 返回 输入的值太小了
```
# 异步&同步表单提交

- 表单具有默认的提交行为，默认同步，浏览器会锁死（转圈），等待响应，直接把响应结果覆盖当前页面

- 异步提交  res.redirect('/')重定向失效 需在客户端跳转window.location.href = '/'

# session & Cookie

- Coolie 可以用来保存一些不太敏感的信息
- Session 可以用来保存敏感数据（账号密码）

在Express中，默认不支持Session和Cookie,需中间件 expres-session

- 第一步 安装
   npm install express-session
- 第二步 配置
   var session = require('express-session')

   ```
    app.use(session({
        secret: 'keyboard cat', //配置加密字符串，在原有基础上，和这个字符串拼接起来去加密，防止客户端恶意伪造
        resave: false,
        saveUninitialized: true //无论是否使用session，默认分配一个session
    }))

   ```
- 第三步 使用 req.session 

   - 添加session数据： req.session.foo='bar'
   - 访问session数据：rea.session.foo 

* 默认session是内存存储的，服务器一旦重启就会丢失，生产环境会持久化存储 *
# 中间件

* 中间件本身是一种方法，该方法接收三个参数：Request请求对象、response响应对象、next下一个中间件 *
- 和请求路径无关的中间件
next 和顺序相关
```
    app.use(function(res,res,next){
        console.log('1')
        next()  //不调用next()不会进入下一个中间件
    })
    app.use(function(req,res,next){
        console.log('2')
        next()
    })
    app.use(function(req,res,next){
        console.log('3')
    })
```
- 以 /××× 开头的路径中间件

```
app.use('/a',function(req,res){
    console.log(req.url)   //得到不包含/a的url后面的部分
})

- 错误处理中间件---统一处理错误信息
```
    router.use(function (err, req, res, next) {
        res.status(500).send(err.message)
     })
     //调用
     next(err)
```
