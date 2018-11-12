import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import account from './main/account.vue'
import goodsList from './main/goodsList.vue'
import login from './main/login.vue'
import register from './main/register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '/account',
      component: account,
      children: [{
          path: 'login',
          component: login
        },
        {
          path: 'register',
          component: register
        }
      ]
    },
    {
      path: '/goodsList',
      component: goodsList
    }
  ]
})

export default router