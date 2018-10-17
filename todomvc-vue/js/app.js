(function () {
	// const todos = [
	// 	{
	// 		id: 1,
	// 		title: '学习',
	// 		complete: false
	// 	},
	// 	{
	// 		id: 2,
	// 		title: '写代码',
	// 		complete: false
	// 	},
	// 	{
	// 		id: 3,
	// 		title: '睡觉',
	// 		complete: false
	// 	}
	// ]

	// 注册一个全局自定义指令 `v-focus`
	Vue.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		// el 参数就是你作用该指令的 DOM 元素
		inserted: function (el) {
			// 聚焦元素
			el.focus()
		}
	})
	Vue.directive('todo-focus', {
		update(el){
			// console.log(el)
			el.focus()
		}		
	})
	window.app = new Vue({
		data: {
			todos: JSON.parse(window.localStorage.getItem('todos') || '[]'),
			// todos,
			currentEditing: null,
			filterText: ''
		},
		computed: {
			remaningCount: function () {
				return this.todos.filter(t => !t.complete).length
			},

			toggleAllCompleted: {
				get() {
					return this.todos.every(t => t.complete)
				},
				set() {
					const checked = !this.toggleAllCompleted
					return this.todos.forEach(item => {
						item.complete = checked
					})
				}
			},
			filterTodos() {
				switch (this.filterText) {
					case 'active':
						return this.todos.filter(t => !t.complete);

					case 'completed':
						return this.todos.filter(t => t.complete);

					default:
						return this.todos;

				}
			}
		},
		watch: {
			// 深度 watcher
			todos: {
				handler() {
					// 监视todos的变化，并持久化存储
					window.localStorage.setItem('todos', JSON.stringify(this.todos))
				},
				deep: true,
				// immediate:true //无论变化与否，开始就调用一次
			},
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

			// handleToggleAll(e) {
			// 	const checked = e.target.checked
			// 	this.todos.forEach(function (element) {
			// 		element.complete = checked
			// 	});
			// },

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
				this.todos[index].title = editingText
				this.currentEditing = null
			},

			handleCancleEditing() {
				this.currentEditing = null
			},

			handleClearCompleted() {
				for (let i = 0; i < this.todos.length; i++) {
					if (this.todos[i].complete) {
						this.todos.splice(i, 1)
						i--
					}
				}
				// 另一种方式：过滤出需要的重新赋值到todos中
				// this.todos = this.todos.filter(item => !item.complete)
			}
		}
	}).$mount('#app')

	// 注册 hash 的改变事件
	window.onhashchange = function () {
		app.filterText = window.location.hash.substr(2)
	}
	// 页面初始化的时候调用一次，保持路由路径状态
	window.onhashchange()
})();
