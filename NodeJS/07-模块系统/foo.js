var foo = 'hello node'
 function add(x,y){
    return x+y
}
exports.add = add
//如果一个模块需要直接导出某个成员，而非挂载的方式
// 那么必须使用下面这种方式
module.exports = add