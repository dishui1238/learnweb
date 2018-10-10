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

* v-bind 特性被称为指令,类似的还有 v-on 。指令带有前缀 v-，以表示它们是 Vue 提供的特殊特性。*

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
