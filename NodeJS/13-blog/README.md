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
