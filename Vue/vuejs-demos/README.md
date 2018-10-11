# 步骤

0. npm install vue
1. 引包
   + <script src="node_modules/vue/dist/vue.js"></script>
2. new Vue 得到vue实例

```javascript
    const app = new Vue({
            el:'#app',
            data:{
                message:'hello Vue.js'
            }
        })
```
   + el 选项的作用是Vue管理模板的入口节点
   + data 的作用：响应式数据，绑定的数据成员必须在data中初始化
      - 响应式数据：数据驱动视图，当数据改变，所有绑定该数据的 DOM 都会跟着改变（MVVM）
   * 将 DOM 操作转换为数据驱动视图操作  *

# 数据绑定

- v-on
- v-bind
- v-if 
- v-for
- v-once
- v-html

## 数据绑定

v-model 是Vue 提供的一个特殊属性，在Vue中被称之为指令，作用是：双向绑定表单控件

` <input type="text" v-model='message'> `

## 一次性绑定 v-once

首次载入后不会改变
`<p v-once>{{ message }}</p>`

## 输出HTML

` <div v-html="rawHtml"></div>`

```javascript
    new Vue({
        el:"#app",
        rawHtml:'<h1>hello</h1>'
    })
```
输出 hello

# vue 与 JQuery 比较

JQuery 提高了 DOM 操作的效率， Vue极大地解放了 DOM 操作

# vue 事件绑定方法

` <button v-on:click="handleIncrement">点击+1</button> `
- v-bind 用于标签属性绑定
` <a v-bind:href="url">菜鸟教程</a> `

```javascript
    const app = new Vue({
            el: '#app',
            data: {
                number: 1
                
            },
            methods:{
                handleIncrement:function(){
                    // 在通过v-on注册的方法中，可通过this访问data数据成员
                    this.number++
                }
            }
        })
```
# 属性操作

以下实例判断 class1 的值，如果为 true 使用 class1 类的样式，否则不使用该类：
```javascript
    <div id="app">
        <label for="r1">修改颜色</label><input type="checkbox" v-model="class1" id="r1">
        <br><br>
        <div v-bind:class="{'class1': class1}">
        // v-bind:class 指令
        </div>
    </div>
        
    <script>
        new Vue({
            el: '#app',
            data:{
                class1: false
            }
        });
    </script>
```
# 缩写

Vue.js 为两个最为常用的指令提供了特别的缩写：

### v-bind 缩写

```html
    <!-- 完整语法 -->
    <a v-bind:href="url"></a>
    <!-- 缩写 -->
    <a :href="url"></a>       
```

```javascript
    new Vue({
        el: '#app',
        data: {
            url: 'http://www.runoob.com',
            target:'_blank'
        }
    })
```
### v-on 缩写

```html  
    <!-- 完整语法 -->
    <a v-on:click="doSomething"></a>
    <!-- 缩写 -->
    <a @click="doSomething"></a>
```

# 新增对象属性

Vue.set 方法用来新增对象的属性。如果要增加属性的对象是响应式的，那该方法可以确保属性被创建后也是响应式的，同时触发视图更新

# 条件语句

```javascript
    <div id="app">
        <div v-if="Math.random() > 0.5">
             Sorry
        </div>
        <div v-else>
            Not sorry
        </div>
    </div>
        
    <script>
        new Vue({
            el: '#app'
        })
    </script>
```

## v-show

` <h1 v-show="ok">Hello!</h1> `

# 循环语句

## v-for("item in todos" )

# 计算属性

```javascript
    <div id="app">
        <p>原始字符串: {{ message }}</p>
        <p>计算后反转字符串: {{ reversedMessage }}</p>
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                message: 'Runoob!'
            },
            computed: {
                // 计算属性的 getter
                reversedMessage: function () {
                // `this` 指向 vm 实例
                return this.message.split('').reverse().join('')
                }
            }
    })
    </script>

```
## computed VS methods

- 我们可以使用 methods 来替代 computed，效果上两个都是一样的，但是 computed 是基于它的依赖缓存，只有相关依赖发生改变时才会重新取值。而使用 methods ，在重新渲染的时候，函数总会重新调用执行。
- 可以说使用 computed 性能会更好，但是如果你不希望缓存，你可以使用 methods 属性。


