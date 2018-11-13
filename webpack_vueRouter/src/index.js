import Vue from 'vue'
// 导入app组件
import app from './app.vue'
import router from './router.js'
// 导入所有的 MintUI 组件
// import MintUI from 'mint-ui'

import { Button, Cell } from 'mint-ui'
// 这里可以省略node_modules，会默认去里面找
import 'mint-ui/lib/style.css'
import 'bootstrap/dist/css/bootstrap.css'
// 把所有的组件注册为全局组件
// Vue.use(MintUI)

Vue.component('mt-button', Button)
Vue.component('mt-cell', Cell)


var vm = new Vue({
  el: '#app',
  render: c => c(app),
  // 将路由对象挂载到vm上
  router,
})