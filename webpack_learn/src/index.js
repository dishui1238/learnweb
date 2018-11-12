// 如何在webpack构建的项目中，使用vue进行开发

// =================import Vue from 'vue'
// [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. 
// Either pre-compile the templates into render functions, or use the compiler-included build.

// 注意：在webpack中使用 import Vue from 'vue' 导入的vue构造函数，功能不完整，只提供了 runtime-only 的方式


// 回顾包的查找规则
// 1.找醒目目录中 node_modules 的文件夹
// 2.在 node_modules 中根据包名，找对应的vue文件
// 3.在vue文件夹中，找package.json 的包配置文件
// 4.在package.json文件中，找一个 main 属性(main属性指定了这个包再被加载时的入口文件)


import Vue from '../node_modules/vue/dist/vue.js'

// 修改配置文件之后
// import Vue from 'vue'

import login from './login.vue'

var vm = new Vue({
  el: '#app',
  data: {
    msg: '123'
  },
  // components:{
  //   login
  // },
  render: (createElements => {
    return createElements(login)
  })
  // 等价于 render:c=>c(login)


})