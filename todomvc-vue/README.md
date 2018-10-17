# develop

`npm start`

# 项目配置

    - Vue-Devtools
    - browser-sync
       + 配置 在package.json文件中添加：

       ```json
            "scripts": {
            "dev": "browser-sync start --server --files \"css/*.css, *.html, js/*.js",
            "start": "npm run dev"
             },
       ```
   - start 是 npm run start

# 项目记录

## 在 `<template>` 元素上使用 v-if 条件渲染分组

   - 因为 v-if 是一个指令，所以必须将它添加到一个元素上。
   - 但是如果想切换多个元素呢？
   - 此时可以把一个 `<template> `元素当做不可见的包裹元素，并在上面使用 v-if。
   - 最终的渲染结果将不包含 `<template>` 元素。

## 按键修饰符

    [按键修饰符](https://cn.vuejs.org/v2/guide/events.html)

## 获取用户输入

   - 双向数据绑定
   - 通过参数 e : e.target.value

      + 当事件处理函数没有传参的时候，第一个参数默认就是 e,当手动传递了参数的时候，就没有办法获取默认的event事件，这个时候可以手动在调用方法的时候传递 $event ，来接收 event 对象

      + handleTodosRemove(index,$event)

   - 获取checkbox状态 e.target.checked 

## 样式控制

   - 双向数据绑定 ` v-bind:class="{ completed:item.complete }" `

## 选中联动

   [计算属性和侦听器](https://cn.vuejs.org/v2/guide/computed.html)

## 双击任务项获得编辑模式

## 按Esc取消编辑

## 删除已完成

   * 不要在 forEach 循环遍历中删除数组元素，会导致索引错乱  用for*

    ```javascript

        for(let i=0;i<this.todos.length;i++){
            if(this.todos.complete){
                this.todos.splice(i,1)
                i--
            }
    ```
# v-text & v-cloak

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
# v-show & v-if

- v-show 根据条件进行显示和隐藏，无论显示还是隐藏，DOM都在,切换比较频繁用 v-show
- v-if 根据条件进行渲染和不渲染，不渲染就会将 DOM 移除, 切换不频繁用 v-if

# v-pre

- 跳过这个元素和它的子元素，不需要编译。
- 可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- 否则vue会逐个检查有没有vue语法

# 计算属性

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

# All & Active & Completed 过滤

## 关于Hash、onHashChange事件

现在的网络应用程序越来越多的使用AJAX异步请求完成页面的无缝刷新，导致浏览器的URL不会发生任何变化而完成了请求，从而破坏了用户浏览体验。同时本次浏览的页面内容在用户下次使用URL访问时将无法重新呈现而解决该问题的一个途径便是使用window.location.hash属性及窗口的onhashchange事件

1. 散列值浏览器是不会随请求发送到服务器端的（即地址栏中＃及以后的内容）。

2. 可以通过window.location.hash属性获取和设置的哈希值。

3. 如果注册onhashchange事件，设置散列值会触发事件。可以通过设置window.onhashchange注册事件监听器，也可以在主体元素上设置onhashchange属性注册。

4. window.location.hash值的变化会直接反应到浏览器地址栏（＃后面的部分会发生变化）。

5. 同时浏览器地址栏散列值的变化也会触发window.location.hash值的变化，从而触发onhashchange事件。

6. 当浏览器地址栏中URL包含哈希如http://www.baidu.com/#home，这时按下输入，浏览器发送http://www.baidu.com/请求至服务器，请求完毕之后设置散列值为#home，进而触发onhashchange事件。

7. 当只改变浏览器地址栏URL的哈希部分，这时按下回车，浏览器不会发送任何请求至服务器，这时发生的只是设置散列值新修改的哈希值，并触发onhashchange事件。

8. html `<a>`标签属性href可以设置为页面的元素ID如#top，当点击该链接时页面跳转至该id元素所在区域，同时浏览器自动设置window.location.hash属性，同时地址栏哈希值发生改变，并触发onhashchange事件。

```
    // 注册 hash 的改变事件
        window.onhashchange = function () {
            app.filterText = window.location.hash.substr(2)
        }
        // 页面初始化的时候调用一次，保持路由路径状态
        window.onhashchange()
```

# 自定义指令

对 DOM 元素进行底层操作，需要用到自定义指令

## 全局注册

- 在任一组件都可使用
- 注册方式： 

```javascript
    Vue.directive('directName',{

    })
```
- 在使用时务必加上 v- 前缀

* 如果使用驼峰命名，在使用时吧驼峰转为小写，用-连接起来，v-direct-name *

- 第二个参数是需要配置指令的生命钩子函数

   + bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

   + inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

   + update：所在组件的指令值更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。

   + componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。

   + unbind：只调用一次，指令与元素解绑时调用与，例如清除定时器window.clearInterval()。

** bind 与 inserted 区别：bind操作不到父亲，inserted可以  同：只执行一次，以后再也不会调用**
** update 与 componentUpdated 区别：update指令更新之前调用，componentUpdated指令更新之后调用 **

- 每个钩子函数都可以接受两个参数

   + el：指令所绑定的元素，可以用来直接操作 DOM 。
   ```javascript
   Vue.directive('my-show',{
       bind(el,binding){
            if(binding.value){
                el.style.display = 'block'
            } else{
                el.style.display = 'none'
            } 
        }
   })
   
   ```
   + binding：一个对象，包含以下属性：
      - name：指令名，不包括 v- 前缀。
      - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
      - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
      - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
      - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
      - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。


## 局部注册

## 元素自动获得焦点

```javascript
    // 注册一个全局自定义指令 `v-focus`
    Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
            // 聚焦元素
            el.focus()
        }
    })
```
