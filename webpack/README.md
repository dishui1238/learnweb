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

## webpack使用

1. 安装
` npm i webpack -g `