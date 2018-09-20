var fooExports = require('./foo')

// console.log(foo)
// { add: [Function: add] }
// 挂载方式
console.log(fooExports.add(10,20))//30
// 直接导出
console.log(fooExports)