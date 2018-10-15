(function () {
	const todos = [
		{
			id: 1,
			title: '学习',
			completed: false
		},
		{
			id: 2,
			title: '写代码',
			complete: false
		},
		{
			id: 3,
			title: '睡觉',
			complete: false
		}
	]
	new Vue({
		data: {
			todos,
			currentEditing: null
		},
		methods: {
			handleTodosRemove(index) {
				this.todos.splice(index, 1)
			},

			handleTodosAdd(e) {
				const todoText = e.target.value
				if (!todoText.length) {
					return
				}
				this.todos.push({
					id: todos.length ? todos[todos.length - 1].id + 1 : 1,
					title: todoText,
					complete: false
				})
				e.target.value = ''
			},

			handleToggleAll(e) {
				const checked = e.target.checked
				this.todos.forEach(function (element) {
					element.complete = checked
				});
			},

			handleDblclickEditing(item) {
				this.currentEditing = item
			},

			handleEditingSave(index, $event) {
				// 1.获取文本框数据
				const editingText = $event.target.value.trim()
				// 2.数据校验：为空--删除，否则--保存编辑
				if (!editingText) {
					return this.todos.splice(index, 1)
				}
				todos[index].title = editingText
				this.currentEditing = null
			},

			handleCancleEditing(){
				this.currentEditing = null
			},

			handleClearCompleted(){
				for(let i=0;i<this.todos.length;i++){
					if(this.todos.complete){
						this.todos.splice(i,1)
						i--
					}
				}
				// 另一种方式：过滤出需要的重新赋值到todos中
				// this.todos = this.todos.filter(item => !item.complete)
			}
		}
	}).$mount('#app')
})();
