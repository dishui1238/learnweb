# 网站交互方式

+ 经典的多页面
   - 每个页面都需要重新加载渲染，速度慢
   - 前后端糅合，开发维护效率低下
   - 有利于SEO搜索引擎搜索（蜘蛛会爬链接）
   
+ 现代式的单页面应用程序 music.163.com
   - 前后端分离，可维护性好
   - 用户体验好，像原生客户端一样使用
   - 只需加载渲染局部视图，不需整页刷新
   - 由于异步加载，不利于SEO搜索
   - 前端三大框架：
      + angularJS
      + ReactJS
      + VueJS

# 前后端分离开发方式

+ 项目立项
+ 需求分析
+ 服务端工作
   - 需求分析
   - 设计数据库
   - 接口设计
   - 接口开发
+ 前端工作
   - 需求分析
   - 写页面
   - 页面功能
   - 通过接口和服务端进行交互

# Vue.js 介绍

+ 作者:尤雨溪 正式发布于2014年2月
+ 2015年10月27日 正式发布1.0
+ 2016年8月1日，正式发布2.0
+ 至今2.5.17
+ 最大程度上解放了DOM操作
+ Vue 不支持 IE8 及以下版本

## 文本插值

```
      <div id="app">
            {{ message }}
      </div>

      var app = new Vue({
            el: '#app',
            data: {
            message: 'Hello Vue!'
            }
      })
```
数据和 DOM 已经被建立了关联，所有东西都是响应式的。

## 绑定元素

```
      <div id="app-2">
            <span v-bind:title="message">鼠标悬停几秒钟查看此处动态绑定的提示信息！</span>
      </div>
```
```
      var app = new Vue({
            el:'#app-2',
            data:({
                  message:'页面加载于' + new Data().toLocalString()
            })
      })
```

*v-bind 特性被称为指令,类似的还有 v-on 。指令带有前缀 v-，以表示它们是 Vue 提供的特殊特性。*

## 控制切换元素

```
      <div id="app-3">
            <p v-if="seen">现在你看到我了</p>
      </div>
```
```
      var app3 = new Vue({
                  el: '#app-3',
                  data: {
                  seen: true
                  }
            })
```
修改 app3.seen = false ,则 p 标签不显示

## 绑定数组的数据

```
      <div id="app-4">
        <ol>
            <li v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ol>
    </div>
```

```
      var app4 = new Vue({
            el: '#app-4',
            data: {
                todos: [
                    { text: '学习 JavaScript' },
                    { text: '学习 Vue' },
                    { text: '整个牛项目' }
                ]
            }
        })
```

app4.todos.push({ text: '新项目' })  添加一个新项目

# 处理用户输入

## 添加事件监听器

` <button v-on:click="reverseMessage">逆转消息</button> `

## 双向数据绑定
` <input v-model="message"> `

# class

```
            <!--
                v-bind 用来动态绑定属性值
                class 给了一个对象：
                    对象的key就是类名
                    对象的value是布尔值
                当布尔值为true时，作用这个key样式
                当布尔值为false时，去除这个key样式
            -->
            <span v-bind:class="{done:item.done}">{{ item.title }}</span>
```

# 指令

## v-text & v-cloak

在vue中解决{{ }}闪烁的问题：

- v-text 
` <h1 v-text="message></h1>" `
- v-cloak 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕,样式自动移除。

    ```html
        [v-cloak] {
        display: none;
        }
        <div v-cloak>
            {{ message }}
            {{ message }}
        </div>
    ```
## v-show & v-if

- v-show 根据条件进行显示和隐藏，无论显示还是隐藏，DOM都在
- v-if 根据条件进行渲染和不渲染，不渲染就会将 DOM 移除

## v-else & v-else-if

 v-else 前一兄弟元素必须有 v-if 或 v-else-if

## v-pre

- 跳过这个元素和它的子元素，不需要编译。
- 可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- 否则vue会逐个检查有没有vue语法

## v-html

- 更新元素的 innerHTML 。注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译 。

## [v-for](https://cn.vuejs.org/v2/api/#v-for)

## [v-on](https://cn.vuejs.org/v2/api/#v-on)

- 缩写 @
* 修饰符 *

## v-bind

- 缩写 :
- 动态的绑定一个或多个属性

## v-model

- 在表单控件或者组件上创建双向绑定

## v-once

- 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

## 计算属性

- 解决问题： ①模板内的逻辑复杂 ②调用次数过多（用methods方法）
- 对于复杂逻辑应使用计算属性

```javascript
      computed:{
		remaningCount:function(){
			return this.todos.filter(t=>!t.complete).length
		}
	},
```
*  Vue 提供的一大特色，本质是方法，但不能当做方法来调用，必须当做属性来调用，相比于方法优势在于会缓存计算的结果,这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。 *

# 利用 watch 监视实现本地持久化

[watch](https://cn.vuejs.org/v2/api/#watch)

- 引用类型只能监视一层，无法监视子成员的改变
```javascript
    // 深度 watcher 监视c
        c: {
        handler: function (val, oldVal) { /* ... */ },
        deep: true
        },
```

## localStorage (H5新增)

- localStorage 主要是用来作为本地存储，解决了cookie存储空间不足的问题(cookie中每条cookie的存储空间为4k)，localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。

- 浏览器的大小不统一，并且在IE8以上的IE版本才支持localStorage这个属性

- 目前所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换

```javascript
    todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
```

- localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡

- localStorage不能被爬虫抓取到

- localStorage与sessionStorage的唯一一点区别就是localStorage属于永久性存储，而sessionStorage属于当会话结束的时候，sessionStorage中的键值对会被清空。

- localStorage在浏览器的隐私模式下面是不可读取的

# 自定义指令

例子 vuejs-demos/v-bind.html

## 简写

由于很多时候，会在bind、update中调用相同的代码，所以提供了一个简写方式

```javascript     
       Vue.directive('my-bind', {
            // bind（）只调用一次
            bind(el, binding) {
                console.log(el) //<h1>Hello Vue.js!</h1>
                console.log(binding) //{name: "my-bind", rawName: "v-my-bind:title", value: "Hello Vue.js!", expression: "message", arg: "title", …}
                // 操作DOM
                el.setAttribute(binding.arg, binding.value)
            },
            // 实现实时更新
            update(el,binding){
                el.setAttribute(binding.arg, binding.value)
            }
        })
```
简写

```javascript
      Vue.directive('my-bind',function(el,binding){
            el.setAttribute(binding.arg,binding.value)
        })
```

# nrm 安装与使用

注意：nrm只是单纯的提供了几个常用的下载包的URL地址，并能让我们在这几个地址之间很方便的进行切换，但是每次装包的时候使用的装包工具都是npm

## 装包地址
- npm ---- https://registry.npmjs.org/
- cnpm --- http://r.cnpmjs.org/
- * taobao - https://registry.npm.taobao.org/
- nj ----- https://registry.nodejitsu.com/
- rednpm - http://registry.mirror.cqupt.edu.cn/
- npmMirror  https://skimdb.npmjs.com/registry/
- edunpm - http://registry.enpmjs.org/

## 指令

- npm i nrm -g  全局安装nrm包
- nrm ls    查看当前所有可用的镜像源地址，以及当前使用的镜像源地址
- nrm use taobao 切换到taobao镜像地址

