# vue 路由

## 什么是路由

1. 对于普通的网站，所有的超链接都是URL地址，所有的URL地址都对应服务器上对应的资源；

2. 对于单页面应用程序来说，主要通过URL中的hash(#号)来实现不同页面之间的切换，同时，hash有一个特点：HTTP请求中不会包含hash相关的内容；所以，单页面程序中的页面跳转主要用hash实现；

3. 在单页面应用程序中，这种通过hash改变来切换页面的方式，称作前端路由（区别于后端路由）；

4. 相关文章
[URL中的hash（井号）](http://www.cnblogs.com/joyho/articles/4430148.html)

## 在 vue 中使用 vue-router

1. 导入 vue-router 组件类库：
```js
<!-- 1. 导入 vue-router 组件类库 -->
  <script src="../vue-router.js"></script>
```
*当导入 vue-router 之后，在 window 全局对象中，就有了一个路由的构造函数，叫 VueRouter*

2. 使用 router-link 组件来导航
```html
<!-- 2. 使用 router-link 组件来导航 -->
<router-link to="/login">登录</router-link>
<router-link to="/register">注册</router-link>
```
> 被激活的 router-link 默认具有 router-link-active 类名，可通过linkActiveClass:'myactive'//自定义类名
```js
const routerObj = new VueRouter({
            routes: [ //路由匹配规则有两个属性
                // 属性1.path 表示监听那个路由链接地址
                // 属性2.component 需要展示的组件,值必须是一个组件的模板对象，不能是组件的引用名称
                {
                    path:'/',
                    redirect:'/login'   //重定向
                },
                {
                    path: '/login',
                    component: login
                },
                {
                    path:'/register',
                    component:register
                }
            ],
            linkActiveClass:'myactive'//自定义类名
        })
```
3. 使用 router-view 组件来显示匹配到的组件
```js
<!-- 3. 使用 router-view 组件来显示匹配到的组件 -->
<router-view></router-view>
```
4. 创建使用`Vue.extend`创建组件
```js
    // 4.1 使用 Vue.extend 来创建登录组件
    var login = Vue.extend({
      template: '<h1>登录组件</h1>'
    });

    // 4.2 使用 Vue.extend 来创建注册组件
    var register = Vue.extend({
      template: '<h1>注册组件</h1>'
    });
```
5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
```js
// 5. 创建一个路由 router 实例，通过 routers 属性来定义路由匹配规则
    var router = new VueRouter({
      routes: [
        { path: '/login', component: login },
        { path: '/register', component: register }
      ]
    });
```
6. 使用 router 属性来使用路由规则
```js
// 6. 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      router: router // 使用 router 属性来使用路由规则
    });
```

## 在路由规则中定义参数
1. 在规则中定义参数：
```js
{ path: '/register/:id', component: register }
```
2. 通过 `this.$route.params`来获取路由中的参数：
```js
var register = Vue.extend({
      template: '<h1>注册组件 --- {{this.$route.params.id}}</h1>'
    });
```

## 使用 `children` 属性实现路由嵌套

```html
  <div id="app">
    <router-link to="/account">Account</router-link>

    <router-view></router-view>
  </div>

  <script>
    // 父路由中的组件
    const account = Vue.extend({
      template: `<div>
        这是account组件
        <router-link to="/account/login">login</router-link> | 
        <router-link to="/account/register">register</router-link>
        <router-view></router-view>
      </div>`
    });

    // 子路由中的 login 组件
    const login = Vue.extend({
      template: '<div>登录组件</div>'
    });

    // 子路由中的 register 组件
    const register = Vue.extend({
      template: '<div>注册组件</div>'
    });

    // 路由实例
    var router = new VueRouter({
      routes: [
        { path: '/', redirect: '/account/login' }, // 使用 redirect 实现路由重定向
        {
          path: '/account',
          component: account,
          children: [ // 通过 children 数组属性，来实现路由的嵌套
            { path: 'login', component: login }, // 注意，子路由的开头位置，不要加 / 路径符
            { path: 'register', component: register }
          ]
        }
      ]
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: {
        account
      },
      router: router
    });
  </script>
```


