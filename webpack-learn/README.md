# webpack

## 在网页中会引用哪些常见的静态资源？
+ JS
   + .js  .jsx  .coffee  .ts（TypeScript  类 C# 语言）
+ CSS
   + .css  .less   .sass  .scss
+ Images
   + .jpg   .png   .gif   .bmp   .svg
+ 字体文件（Fonts）
   + .svg   .ttf   .eot   .woff   .woff2
+ 模板文件
   + .ejs   .jade  .vue【这是在webpack中定义组件的方式，推荐这么用】

## 网页中引入静态资源多了以后产生的问题

- 网页加载速度慢，因为要发起很多二次请求
- 要处理错综复杂的依赖关系

## 如何解决上面两个问题？

1. 合并，压缩，精灵图，图片的Base64编码

2. 可以使用requireJS，也可以使用webpack解决各个包之间的复杂依赖关系
------------
完美解决外部工具
- 使用Gulp——是基于 task任务 创建的
- 使用webpack——是基于 整个项目 进行构建
   + 前端自动化构建工具，可以完美实现资源的合并、打包、压缩、混淆等诸多功能
   + 基于Node.js 开发

## [webpack概念](https://webpack.docschina.org/concepts/)

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(static module bundler)。在 webpack 处理应用程序时，它会在内部创建一个依赖图(dependency graph)，用于映射到项目需要的每个模块，然后将所有这些依赖生成到一个或多个bundle。

- 目前(2018-10-22)最新版本 v 4.21.0

## webpack安装-坑（版本兼容性问题）

### 1.安装步骤
      
- `npm install webpack --save-dev` 或 `npm install webpack -D`//安装最新版本webpack
`npm install --save-dev webpack@<version>`//安装指定版本
![第一步](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/step1.JPG)

- 如果你webpack安装的是4+以上的版本，还需要安装webpack-cli,此工具用于在命令行中运行 webpack
- webpack-cli 是 webpack 的命令行工具。让我们可以不用写打包脚本，只需配置打包配置文件，然后在命令行输入 webpack-cli --config webpack.config.js 来使用 webpack, 简单很多。webpack 4 之前命令行工具是集成在 webpack 包中的，4.0 开始 webpack 包本身不再集成 cli
> npm install webpack-cli -D 

![第一步](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/step1-1.JPG)

- 执行 `webpack ./src/main.js ./dist/bundle.js`命令，出现错误
![error](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/error1.JPG)

- ! 原来是让我们设置开发或者生产模式,在 webpack.config.js 里设置 ` mode: 'development' `

- 原因是，webpack4.x的打包已经不能用webpack 文件a 文件b的方式，而是直接运行webpack --mode development或者` webpack --mode production `，这样便会默认进行打包，入口文件是'./src/index.js'，输出路径是'./dist/main.js'，其中src目录即index.js文件需要手动创建，而dist目录及main.js会自动生成。 

- 因此我们不再按webpack 文件a 文件b的方式运行webpack指令，而是直接运行`webpack --mode development` 或者 `webpack --mode production `。这样便能够实现将'./src/index.js'打包成'./dist/main.js'。 
    
- 不过每次都要输入这个命令，非常麻烦，我们在package.json中scripts中加入两个成员：
> "dev":"webpack --mode development",
> "build":"webpack --mode production"
以后我们只需要在命令行执行npm run dev便相当于执行webpack --mode development，执行npm run build便相当于执行webpack --mode production。 我们在根目录执行：
> npm run dev

![success](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/success.JPG)

> 部分来源：CSDN 原文：https://blog.csdn.net/u012443286/article/details/79504289 

### 2.总结 

- webpack4.x中webpack.config.js这样的配置文件不是必须的。 
- 默认入口文件是./src/index.js，默认输出文件./dist/main.js。
- Webpack 4 配置, 必须配置 mode 属性， 可选值有 development,production,none, 开发模式和发布模式, 插件默认内置
 
* 注意 *

> 官方不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

> 从 webpack 4.0.0 版本开始，可以不用通过引入一个配置文件打包项目。然而，webpack 仍然还是 高度可配置的，并且能够很好的满足需求。在webpack3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。

> `--save-dev `缩写`-D`会把安装的包和版本号记录到 `package.json `中的 `devDependencies` 对象中，还有一个 `--save`， 会记录到 dependencies 对象中，它们的区别，我们可以先简单的理解为打包工具和测试工具用到的包使用 --save-dev 存到 devDependencies， 比如 eslint、webpack。浏览器中执行的 js 用到的包存到 dependencies， 比如 jQuery 等 

3. 目录架构

- 现在我们将创建以下目录结构、文件和内容，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载
![目录架构](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/schema.JPG)

# webpack 使用

## webpack.config.js 配置文件

```javascript
const path = require('path')
module.exports = {
    // 入口文件
    entry:path.join(__dirname,'./src/index.js'),
    // 指定打包好的文件输出的目录
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'main.js'
    }
}
```

## webpack-dev-server

功能：监听代码的改变，自动打包编译

### 安装

1. `npm i webpack-dev-server -D `把工具安装到项目的本地开发依赖
*** 注意：webpack-dev-server 依赖于 Webpack ,所以项目本地必须安装 webpack ***

> webpack-dev-server 帮我们打包生成的 main.js 并没有存放到实际的物理磁盘中，而是直接托管到电脑的内存中，所以在项目根目录中，根本找不到打包好的 main.js

> 我们可以认为，web-dev-server 把打包好的文件，以一种虚拟的形式托管到项目根目录中，虽然我们看不到它，好处:由于需要实时打包编译，所以放在内存中速度会非常快

### 配置

#### 1. 在 package.json 文件 scripts 中配置

> ` "start":"webpack-dev-server --mode development" `，默认8080端口

> ` "start":"webpack-dev-server --mode development --port 3000"  `,自定义端口
使用 ` npm start `启动 webpack-dev-server 

> 这个时候访问webpack-dev-server启动的`http://localhost:8080/`网站，发现是一个文件夹的面板，需要点击到src目录下，才能打开我们的index首页，此时引用不到bundle.js文件，需要修改index.html中script的src属性为:`<script src="../idex.js"></script>`

<font color=red>--open并没有在浏览器中打开，不起作用？？？<font>

```
--open：                     //打开默认浏器，index.html
--config  webpack.config.js //运行webpack。cofig.js文件
--hot：        //实现热替换，不是每次都生成一个新的文件，而是生成一个补丁(打补丁)&&浏览器页面无刷新加载
--inline:                      //实现自更新
--quiet                       //  控制台中不输出打包的信息
--compress                      //开启gzip压缩
--progress                    //显示打包的进度
--colors:                    //进度用颜色表示
--contentBase src           //与--open连用，直接打开src目录下的index.html文件

```

![启动webpack-dev-server](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/webpack-dev-server.JPG)

#### 2. 配置 webpack-dev-server 的第二种方式(相对上一种麻烦些)

在 webpack.config.js 中配置

```javascript

const webpack = require('webpack')

devServer:{
        open:true,  //自动打开浏览器
        port:3000,  //设置启动端口
        contentBase:'src',  //指定托管的根目录
        hot:true        //启用热更新
    },

// 配置插件的节点
plugins:[
    // new 一个热更新的模块对象
    new webpack.HotModuleReplacementPlugin()
]

```
<font color=red>并没有在浏览器中打开，不起作用？？？<font>

## html-webpack-plugin

由于使用`--contentBase`指令的过程比较繁琐，需要指定启动的目录，同时还需要修改index.html中script标签的src属性，所以推荐大家使用`html-webpack-plugin`插件配置启动页面.

### 安装

npm i html-webpack-plugin -D

### 在webpack.config.js中 配置

```javascript

const htmlWebPlugin = require('html-webpack-plugin')

plugins:[
        // 创建一个在内存中生成HTML的插件
        new htmlWebPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板页面
            filename:'index.html'   //指定生成页面的名称
        })
    ]

```

**作用**：

- 自动在内存中根据指定页面生成一个内存页面
- 当使用了 html-webpack-plugin 之后，我们不需要手动引用 main.js ，因为插件会自动引用并插入到DOM元素中去

----------------------

## 使用webpack打包css文件

webpack 默认只能打包处理 JS 类型的文件，如要处理其他非 JS 类型的文件，需要手动安装第三方 loader 加载器

1. 运行`npm i style-loader css-loader -D`
2. 修改`webpack.config.js`这个配置文件：
```JavaScript
module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }//处理css文件的规则
        ]
    }
```
3. 注意：`use`表示使用哪些模块来处理`test`所匹配到的文件；`use`中相关loader模块的调用顺序是从后向前调用的；
4. 在index.js文件中引入css文件 `import './css/index.css'`

*注意： webpack处理第三方文件类型的过程*

> 发现这个要处理的文件不是JS文件，然后去配置文件中查找有没有对应的第三方 loader 规则
> 如果找到对应的规则，就会调用对应的 loader 处理这种文件类型
> 在调用 loader 时，从后往前调用（输出的结果依次往前传递）
> 当最后一个 loader 调用完毕，会把输出的结果交给webpack打包合并，最终输出到main.js文件中去

## 使用webpack打包less文件

1. 运行`npm i less-loader less -D`
2. 修改`webpack.config.js`这个配置文件：
```
{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
```

## 使用webpack打包scss文件
1. 运行`npm i sass-loader node-sass --save-dev`
2. 在`webpack.config.js`中添加处理sass文件的loader模块：
```
{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
```

## 使用webpack处理css中的路径
1. 运行`npm i url-loader file-loader --save-dev`
2. 在`webpack.config.js`中添加处理url路径的loader模块：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader' }
```
3. 可以通过`limit`指定进行base64编码的图片大小；只有小于指定字节（byte）的图片才会进行base64编码：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960' },
```
图片名字会改变为url(e7445c675fefc4a0a3ee3a00d4edecdd.jpg)，前时一串哈希值（32位），以确保图片名称不会重复，如想要不改变名称则可使用（但当有相同名称的图片时，后者会覆盖前者）：
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960&name=[name].[ext]' }
```

在原有的名称之前加上hash值的前8位
```
{ test: /\.(png|jpg|gif)$/, use: 'url-loader?limit=43960&name=[hash:8]-[name].[ext]' }
```

## 使用babel处理高级JS语法
1. 运行`cnpm i babel-core babel-loader babel-plugin-transform-runtime --save-dev`安装babel的相关loader包
2. 运行`cnpm i babel-preset-es2015 babel-preset-stage-0 --save-dev`安装babel转换的语法
3. 在`webpack.config.js`中添加相关loader模块，其中需要注意的是，一定要把`node_modules`文件夹添加到排除项：
```
{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```
4. 在项目根目录中添加`.babelrc`文件，并修改这个配置文件如下：
```
{
    "presets":["es2015", "stage-0"],
    "plugins":["transform-runtime"]
}
```
5. **注意：语法插件`babel-preset-es2015`可以更新为`babel-preset-env`，它包含了所有的ES相关的语法；**

## 相关文章
- [babel-preset-env：你需要的唯一Babel插件](https://segmentfault.com/p/1210000008466178)
- [Runtime transform 运行时编译es6](https://segmentfault.com/a/1190000009065987)
