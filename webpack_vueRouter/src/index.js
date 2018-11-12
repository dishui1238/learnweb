import Vue from 'vue'
// 导入app组件
 import app from './app.vue'
 import router from './router.js'
// import VueRouter from 'vue-router'
// // 导入组件
// import account from './main/account.vue'
// import goodsList from './main/goodsList.vue'
// import login from './main/login.vue'
// import register from './main/register.vue'

// Vue.use(VueRouter)

// 创建路由对象
// const router = new VueRouter({
//   routes: [{
//       path: '/account',
//       component: account,
//       children: [{
//           path: 'login',
//           component: login
//         },
//         {
//           path: 'register',
//           component: register
//         }
//       ]
//     },
//     {
//       path: '/goodsList',
//       component: goodsList
//     }
//   ]
// })

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  // 将路由对象挂载到vm上
  router,
})