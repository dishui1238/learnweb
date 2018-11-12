## 在vue组件页面中，集成vue-router路由模块

[vue-router官网](https://router.vuejs.org/)

1. 导入路由模块：

```js
import VueRouter from 'vue-router'
```

2. 安装路由模块：

```js
Vue.use(VueRouter);
```

3. 导入需要展示的组件:

```js
import login from './components/account/login.vue'
import register from './components/account/register.vue'
```

4. 创建路由对象:

```js
var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/register', component: register }
  ]
});

```

5. 将路由对象，挂载到 Vue 实例上:

```js
var vm = new Vue({
  el: '#app',
  // render: c => { return c(App) }
  render(c) {
    return c(App);
  },
  router // 将路由对象，挂载到 Vue 实例上
});

```

6. 改造App.vue组件，在 template 中，添加`router-link`和`router-view`：

```js
    <router-link to="/login">登录</router-link>
    <router-link to="/register">注册</router-link>

    <router-view></router-view>
```

## 组件中的css作用域问题

```css
<style scoped>
  div{
    color: red;
  }
</style>
```
**scoped 当前样式适用于当前组件**