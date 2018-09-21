const mongoose = require('mongoose');
// 连接monggodb数据库
mongoose.connect('mongodb://localhost/test');
// 创建一个模型
// const声明一个只读的常量，常量值一旦声明，就不允许改变。一旦声明就必须初始化
const Cat = mongoose.model('Cat', { name: String });
// 实例化一个Cat
const kitty = new Cat({ name: 'Zildjian' });
// 持久化保存kitty实例
// kitty.save().then(() => console.log('meow'));
kitty.save(function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log(('meow'))
    }
})
