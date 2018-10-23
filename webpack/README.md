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

1. 安装
- 从 webpack 4.0.0 版本开始，可以不用通过引入一个配置文件打包项目。然而，webpack 仍然还是 高度可配置的，并且能够很好的满足需求。
- `--save-dev `缩写`-D`会把安装的包和版本号记录到 `package.json `中的 `devDependencies` 对象中，还有一个 `--save`， 会记录到 dependencies 对象中，它们的区别，我们可以先简单的理解为打包工具和测试工具用到的包使用 --save-dev 存到 devDependencies， 比如 eslint、webpack。浏览器中执行的 js 用到的包存到 dependencies， 比如 jQuery 等

作者：冷落i
链接：https://www.jianshu.com/p/991e1067eee0
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。
` npm i webpack -g `  //安装的webpack版本为4.22.0
` webpack-cli -v` //安装的版本为3.1.2
因为在webpack 3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。
2. 使用
` webpack .\src\main.js .\dist\bundle.js `
