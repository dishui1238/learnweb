const path = require('path')
const webpack = require('webpack')
const htmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口文件
    entry:path.join(__dirname,'./src/index.js'),
    // 指定打包好的文件输出的目录
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'main.js'
    },
    // devServer:{
    //     open:true,  //自动打开浏览器
    //     port:3000,  //设置启动端口
    //     contentBase:'src',  //指定托管的根目录
    //     hot:true        //启用热更新
    // },
    // // 配置插件的节点
    // plugins:[
    //     // new 一个热更新的模块对象
    //    new webpack.HotModuleReplacementPlugin()
    // ]
    plugins:[
        // 创建一个在内存中生成HTML的插件
        new htmlWebPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板页面
            filename:'index.html'   //指定生成页面的名称
        })
    ]
}