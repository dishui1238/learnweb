/**
 * 项目的JS入口文件
 */

// 1. 导入JQuery
// import ** from ** 是ES6导入模块的方式
import $ from 'jquery'
// const $ = require('jquery')

$(function(){
    $('li:odd').css('backgroundColor','lightblue')
    $('li:even').css('backgroundColor',function(){
        return '#'+'D97634'
    })
})
