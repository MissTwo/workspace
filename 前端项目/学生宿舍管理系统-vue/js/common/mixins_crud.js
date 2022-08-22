/**
 * vue混入对象函数
 */
function mixins_crud() {
	let mixins_crud = {
		data: {
			menuTitle: sessionStorage.getItem("menuActiveTitle"), // 当前选中的菜单名称
			// 所有数据
			// list: JSON.parse(localStorage.getItem("data")).students,
			// 符合搜索条件的数据
			searchData: [],
			// 搜索参数
			searchForm: {
				gender: -1,
				dormId: -1
			},
			// 选中记录id
			selectedIds: [],
			// 是否是编辑
			isEdit: false,
			// 当前正在编辑的记录索引
			editIndex: -1,
			// 当前正在编辑的记录对象
			editItem: {},
			// 分页相关变量
			pager: {
				pageSize: 10,
				pageNum: 1
			},
			// 所有宿舍楼信息
			dorms: JSON.parse(localStorage.getItem("data")).dorms,
		},
		methods: {
			doPageNumChange(val) {
				this.pager.pageNum = val;
			},
			doPageSizeChange(size, num) {
				this.pager.pageSize = size;
				this.pager.pageNum = num;
			},
			doDel(index, item) {
				let result = confirm(`确认删除选中的记录？`);
				if (result) {
					// this.$delete();
					Vue.delete(this.list, this.list.findIndex(value => value.id == item.id));
					console.log(this.list);
					this.updateStorage();
				}
			},
			doDelBatch() {
				let result = confirm(`确认删除所有选中的记录？`);
				if (result) {
					this.selectedIds.forEach(id => Vue.delete(this.list, this.list.findIndex(item => item.id == id)))
					this.updateStorage();
				}
			},
			doSelectAll(isChecked) {
				// console.log("isChecked", isChecked);
				if (isChecked) {
					// 选中时
					this.selectedIds = this.pageData.map(item => item.id);
				} else {
					// 没有选中时
					this.selectedIds = [];
				}
			},
			doEdit(index, item) {
				this.editIndex = index;
				this.editItem = Object.assign({}, item); // 复制对象
				this.isEdit = true; // 编辑状态
			},
			doCancel() {
				this.editIndex = -1;
				if (!this.isEdit) {
					this.pageData.pop();
				}
			},
			doSave(index) {
				if (this.isEdit) {
					// this.pageData.splice(index, 1, this.editItem);
					// 修改
					Vue.set(this.pageData, index, this.editItem);
					Vue.set(this.list, this.list.findIndex(item =>
						item.id == this.editItem.id), this.editItem);
				} else {
					// 添加
					this.list.push(this.editItem);
				}
				console.log(this.editItem);
				this.editIndex = -1;
				this.updateStorage();
			},
		},
		watch: {
			// 如果 `searchForm` 对象的地址发生改变，这个函数就会运行
			// searchForm: function(newVal, oldVal) {
			// 	console.log(newVal, oldVal);
			// 	this.pager.pageNum = 1;
			// }
			// 要求 searchForm 对象中的属性发生变量，执行函数
			searchForm: {
				handler: function(newVal, oldVal) {
					// console.log(newVal, oldVal);
					this.pager.pageNum = 1;
				},
				deep: true
			}
		},
	}
	
	return mixins_crud;
}