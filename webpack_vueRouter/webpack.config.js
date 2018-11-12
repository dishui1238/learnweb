const path = require('path')
const webpack = require('webpack')
const htmlWebPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
    // 入口文件
    entry: path.join(__dirname, './src/index.js'),
    // 指定打包好的文件输出的目录
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'main.js'
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
    plugins: [ //所有webpack插件的配置节点
        // 创建一个在内存中生成HTML的插件
        new htmlWebPlugin({
            template: path.join(__dirname, './src/index.html'), //指定模板页面
            filename: 'index.html' //指定生成页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module: { // 用来配置第三方loader模块的
        rules: [ // 文件的匹配规则
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, //处理css文件的规则
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'url-loader?limit=20'
            },
            // 配置babel来转换高级JS语法
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {//处理.vue文件的loader
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    resolve: {
        alias: { //修改Vue被导入时包的路径
            // "vue$": "../node_modules/vue/dist/vue.js"
        }
    }
}