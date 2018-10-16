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

- v-show 根据条件进行显示和隐藏，无论显示还是隐藏，DOM都在
- v-if 根据条件进行渲染和不渲染，不渲染就会将 DOM 移除

# v-pre

- 跳过这个元素和它的子元素，不需要编译。
- 可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
- 否则vue会逐个检查有没有vue语法

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
