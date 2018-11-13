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

### scoped属性选择器的实现原理

`<h1 data-v-3e681ea0="">account组件</h1>`
1. 通过 CSS 的选择器进行实现的

## 使用 饿了么的 MintUI 组件

[Github 仓储地址](https://github.com/ElemeFE/mint-ui)

[Mint-UI官方文档](http://mint-ui.github.io/#!/zh-cn)
1. 引入所有的组件
```js
import Vue from 'vue'
// 导入app组件
import app from './app.vue'
// 导入所有的 MintUI 组件
import MintUI from 'mint-ui'
// 这里可以省略node_modules，会默认去里面找
import 'mint-ui/lib/style.css'
// 把所有的组件注册为全局组件
Vue.use(MintUI)
```

2. 借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
首先，安装 babel-plugin-component
`npm install babel-plugin-component -D`
