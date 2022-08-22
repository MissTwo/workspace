(function() {
	let app = new Vue({
		mixins: [mixins_crud()],
		el: "#app",
		data: {
			titles: ["序号", "姓名", "性别", "电话", "宿舍楼", "用户名", "操作"],
			// 所有数据
			list: JSON.parse(localStorage.getItem("data")).dormAdmins,
			// 当前正在编辑的记录对象
			editItem: {
				account: "",
				dormId: -1,
				gender: -1,
				password: "",
				phone: "",
				username: "",
			},
		},
		methods: {
			updateStorage() {
				// 修改的数据保存到localStorage中
				let data = JSON.parse(localStorage.getItem("data"));
				data.dormAdmins = this.list;
				localStorage.setItem("data", JSON.stringify(data));
			},
			doAdd() {
				this.isEdit = false; // 添加状态
				this.editItem = {
					id: this.list[this.list.length - 1].id + 1,
					account: "",
					// 数字类型必须大于0
					dormId: 1,
					gender: 1,
					password: "",
					phone: "",
					username: ""
				};
				// this.editItem = this.list[0];
				// for(let key in this.editItem) {
				// 	if(typeof this.editItem[key] == "string") {
				// 		this.editItem[key] = "";
				// 	}
				// }
				console.log(this.editItem);
				this.pageData.push(this.editItem);
				console.log(this.pageData);
				this.editIndex = this.pageData.length - 1;
				// console.log(this.editIndex);
			},
		},
		computed: {
			pageData() {
				// 默认是显示所有数据
				this.searchData = this.list;
				// 有搜索条件
				if (this.searchForm.username) {
					this.searchData = this.searchData.filter(item =>
						item.username.toLowerCase().indexOf(this.searchForm.username.toLowerCase()) != -1);
				}
				if (this.searchForm.phone) {
					this.searchData = this.searchData.filter(item =>
						item.phone.toLowerCase().indexOf(this.searchForm.phone.toLowerCase()) != -1);
				}
				if (this.searchForm.gender > -1) {
					this.searchData = this.searchData.filter(item =>
						item.gender == this.searchForm.gender);
				}
				if (this.searchForm.dormId > -1) {
					this.searchData = this.searchData.filter(item =>
						item.dormId == this.searchForm.dormId);
				}
				return this.searchData.filter((value, index) =>
					index >= this.pager.pageSize * (this.pager.pageNum - 1) &&
					index < this.pager.pageSize * this.pager.pageNum);
			}
		}
	});
})();
