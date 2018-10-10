# 步骤

0. npm install vue
1. 引包
   + <script src="node_modules/vue/dist/vue.js"></script>
2. new Vue 得到vue实例

```
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

# 双向数据绑定

v-model 是Vue 提供的一个特殊属性，在Vue中被称之为指令，作用是：双向绑定表单控件

` <input type="text" v-model='message'> `

# vue 与 JQuery 比较

JQuery 提高了 DOM 操作的效率， Vue极大地解放了 DOM 操作

# vue 事件绑定方法

` <button v-on:click="handleIncrement">点击+1</button> `
```
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
