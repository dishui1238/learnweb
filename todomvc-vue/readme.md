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

## 在 <template> 元素上使用 v-if 条件渲染分组

- 因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素。

## 按键修饰符

[按键修饰符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

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
