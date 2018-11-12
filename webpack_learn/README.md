## 在普通页面中使用render函数渲染组件

## 在webpack中配置.vue组件页面的解析

1. 运行`cnpm i vue -S`将vue安装为运行依赖；

2. 运行`cnpm i vue-loader vue-template-compiler -D`将解析转换vue的包安装为开发依赖；

3. 运行`cnpm i style-loader css-loader -D`将解析转换CSS的包安装为开发依赖，因为.vue文件中会写CSS样式；

4. 在`webpack.config.js`中，添加如下`module`规则：

```json

module: {

    rules: [

      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      { test: /\.vue$/, use: 'vue-loader' }

    ]

  }

```

5. 创建`App.js`组件页面：

```html
    <template>
      <!-- 注意：在 .vue 的组件中，template 中必须有且只有唯一的根元素进行包裹，一般都用 div 当作唯一的根元素 -->
      <div>
        <h1>这是APP组件 - {{msg}}</h1>
        <h3>我是h3</h3>
      </div>
    </template>
    <script>
    // 注意：在 .vue 的组件中，通过 script 标签来定义组件的行为，需要使用 ES6 中提供的 export default 方式，导出一个vue实例对象
    export default {
      data() {
        return {
          msg: 'OK'
        }
      }
    }
    </script>
    <style scoped>

    h1 {
      color: red;
    }
    </style>
```

6. 创建`main.js`入口文件：

```

    // 导入 Vue 组件

    import Vue from 'vue'



    // 导入 App组件

    import App from './components/App.vue'



    // 创建一个 Vue 实例，使用 render 函数，渲染指定的组件

    var vm = new Vue({

      el: '#app',

      render: c => c(App)

    });

```

## 在使用webpack构建的Vue项目中使用模板对象？
1. 在`webpack.config.js`中添加`resolve`属性：
```json
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
```
2.默认 webpack 无法打包.vue文件，需要安装相关的loader, vue-loader可以将vue文件转换为JS模块；
`npm i vue-loader vue-template-compiler -D`
在配置文件中新增配置项：
```js
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
  plugins: [
    new VueLoaderPlugin()
  ]
},
{
  module: {
    rules: [
      // ... other rules
      {//处理.vue文件的loader
                test: /\.vue$/,
                use: 'vue-loader'
      }
    ]
  }
}
```

[新特性参考](https://vue-loader.vuejs.org/migrating.html#a-plugin-is-now-required)

## ES6中语法使用总结

1. 使用 `export default` 和 `export` 导出模块中的成员; 对应ES5中的 `module.exports` 和 `export`
```js
var info = {name:'dishui',age:23}
export default info

export var title = '葬花吟'
export var content = '花谢花飞花满天'
//接收成员
import info ,{title as title12,content} from '路径' 
```

2. 使用 `import ** from **` 和 `import '路径'` 还有 `import {a, b} from '模块标识'` 导入其他模块

3. 使用箭头函数：`(a, b)=> { return a-b; }`

*注意：1.export default 向外暴露的成员，可以使用任意的变量来接收*
*2.在一个模块中export default只准许向外暴露一次*
*3.使用export向外暴露的成员，可以同时暴露多个成员，只能使用{}的形式接收，并严格使用导出时的名称，这种形式，叫做【按需导出】*
*4.使用export导出的成员，可以使用 as 来起别名*
