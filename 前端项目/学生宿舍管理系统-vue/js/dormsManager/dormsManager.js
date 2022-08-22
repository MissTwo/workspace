(function() {
	let app = new Vue({
		mixins: [mixins_crud()],
		el: "#app",
		data: {
			titles: ["序号", "名称", "简介", "管理员", "操作"],
			// 所有数据
			list: JSON.parse(localStorage.getItem("data")).dorms,
			// 当前正在编辑的记录对象
			editItem: {
				intro: "",
				name: "",
			},
			// 所有管理员数据
			dormAdmins: JSON.parse(localStorage.getItem("data")).dormAdmins,
		},
		methods: {
			dormAdminNames(id) {
				// console.log("id", id);
				let names = [];
				this.dormAdmins.forEach(item => {
					if(item.dormId == id) return names.push(item.username);
				})
				// console.log("names", names);
				return names.join(" ");
			},
			updateStorage() {
				// 修改的数据保存到localStorage中
				let data = JSON.parse(localStorage.getItem("data"));
				data.dorms = this.list;
				localStorage.setItem("data", JSON.stringify(data));
			},
			doAdd() {
				this.isEdit = false; // 添加状态
				this.editItem = {
					id: this.list[this.list.length - 1].id + 1,
					intro: "",
					name: "",
				};
				this.pageData.push(this.editItem);
				this.editIndex = this.pageData.length - 1;
			},
		},
		computed: {
			pageData() {
				// 默认是显示所有数据
				this.searchData = this.list;
				// 有搜索条件
				if (this.searchForm.name) {
					this.searchData = this.searchData.filter(item =>
						item.name.toLowerCase().indexOf(this.searchForm.name.toLowerCase()) != -1);
				}
				return this.searchData.filter((value, index) =>
					index >= this.pager.pageSize * (this.pager.pageNum - 1) &&
					index < this.pager.pageSize * this.pager.pageNum);
			}
		}
	});
})();
