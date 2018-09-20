// 1.加载http核心模块
var http = require('http');
// 2.创建web服务器
var server = http.createServer();
// 3.服务器注册请求事件
server.on('request', function (request, response) {
    console.log('收到请求！' + request.url);
    response.end('我已收到请求~');
})
// 4.绑定端口号，启动服务器
server.listen(3000, function () {
    console.log('服务器启动成功！');
})
