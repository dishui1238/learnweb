/**
 * 项目的JS入口文件
 */

// 1. 导入JQuery
// import ** from ** 是ES6导入模块的方式
import $ from 'jquery'
// const $ = require('jquery')
import './css/index.css'
import './css/index.less'
import './css/index.scss'

$(function(){
    $('li:odd').css('backgroundColor','blue')
    $('li:even').css('backgroundColor',function(){
        return '#'+'D97634'
    })
})
// class关键字是ES6中的新语法，从后端语言借鉴过来的，是用来实现面向对象的编程方式
class Person{
    // 使用static关键字来定义静态属性
    // 静态属性：可以通过类名直接访问的属性
    // 实例属性：只能通过类的实例来访问的属性
    static info = {name:'zqq',age:23}
}
// 实例化Person
var p1 = new Person()
console.log(Person.info)


// 传统方式
function Animal(name){
    this.name = name
}
Animal.info = 123

var a1 = new Animal('二狗子')