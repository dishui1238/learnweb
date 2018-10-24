# webpack

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

1.安装步骤

   1. 安装webpack
      
     -  `npm install webpack --save-dev` 或 `npm install webpack -D`//安装最新版本webpack
      `npm install --save-dev webpack@<version>`//安装指定版本
![第一步](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/step1.JPG)

     - 如果你webpack安装的是4+以上的版本，还需要安装webpack-cli,此工具用于在命令行中运行 webpack
     ` npm install webpack-cli -D `
![第一步](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/step1-1.JPG)

   * 注意 *
   > 官方不推荐全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

   > 从 webpack 4.0.0 版本开始，可以不用通过引入一个配置文件打包项目。然而，webpack 仍然还是 高度可配置的，并且能够很好的满足需求。在webpack3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。

   > `--save-dev `缩写`-D`会把安装的包和版本号记录到 `package.json `中的 `devDependencies` 对象中，还有一个 `--save`， 会记录到 dependencies 对象中，它们的区别，我们可以先简单的理解为打包工具和测试工具用到的包使用 --save-dev 存到 devDependencies， 比如 eslint、webpack。浏览器中执行的 js 用到的包存到 dependencies， 比如 jQuery 等 

2. 目录架构

- 现在我们将创建以下目录结构、文件和内容，将“源”代码(/src)从我们的“分发”代码(/dist)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载
![目录架构](https://github.com/dishui1238/learnweb/blob/master/webpack-learn/src/imgs/schema.JPG)
