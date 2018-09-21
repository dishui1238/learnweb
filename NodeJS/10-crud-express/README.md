# Express -crud

## 起步

- 初始化
- 模板处理

## 路由设计

## 回调函数：获取异步操作的结果

-例
    function fn(callback){
        setTimeOut(function(){
            var data = 'hello'
            callback(data)
        },1000)
    }
    <!--获取data-->
    fn(function(data){
        console.log(data)
    })

## json 字符串与对象之间的转换

- json字符串转为对象
    + JSON.parse(str)
- json对象转为字符串
    + JSON.stringify(obj
    )

## express 提供专门包装路由的方式

    1.创建路由容器
    - var express = require('express')
    - var router = express.Router() 
    2.将路由挂载到router容器中
    - router.get('/', function (req, res) {})
    3.把路由器挂载到app服务中
    -app.use(router)

## 文件读写模块

    - fs.readFile()参数
        + 第一个参数：文件路径
        + 第二个参数：可选，编码格式，utf8，若不加，可data.toString()
        + 第三个参数：回调函数
    
    -fs.writeFile()参数
        + 第一个参数：文件路径
        + 第二个参数：需要写入的字符串
        + 第三个参数：回调函数