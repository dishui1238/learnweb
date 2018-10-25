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
