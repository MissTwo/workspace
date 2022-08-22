(function() {
	let app = new Vue({
		mixins: [mixins_crud()],
		el: "#app",
		data: {
			userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
			titles: ["序号", "学号", "姓名", "性别", "宿舍楼", "寝室", "日期", "备注", "操作"],
			editItem: {
				createDate: "",
				remark: "",
				studId: -1,
				stu: {},
				dorm: {},
			},
			// 所有学生数据
			students: JSON.parse(localStorage.getItem("data")).students,
		},
		methods: {
			updateStorage() {
				// 修改的数据保存到localStorage中
				let data = JSON.parse(localStorage.getItem("data"));
				let absences = data.absences;
				// 将list中的所有数据在data中删除
				absences = absences.filter(item => this.list.findIndex(subItem => item.id == subItem.id) == -1);
				console.log(absences, this.list);
				// 将新的list数据添加到data中
				this.list.forEach(item => {
					absences.push(Object.assign({}, item));
				});
				// 去除补全的信息
				absences.forEach(item => {
					delete item.stu;
					delete item.dorm;
				})
				data.absences = absences;
				localStorage.setItem("data", JSON.stringify(data));
			},
			doAdd() {
				this.isEdit = false; // 添加状态
				this.editItem = {
					id: this.list[this.list.length - 1].id + 1,
					// 数字类型必须大于0
					studId: 1,
					createDate: "",
					remark: "",
					stu: {},
					dorm: {},
				};
				console.log(this.editItem);
				this.pageData.push(this.editItem);
				console.log(this.pageData);
				this.editIndex = this.pageData.length - 1;
				// console.log(this.editIndex);
			},
			// 补充信息
			updateInfo(item) {
				let stu = this.students.find(stu => stu.id == item.studId);
				item.stu = stu;
				let dorm = this.dorms.find(dorm => dorm.id == stu.dormId);
				item.dorm = dorm;
			}
		},
		watch: {
			editItem: {
				handler: function(newVal, oldVal) {
					console.log(newVal, oldVal);
					this.updateInfo(this.editItem);
				},
				deep: true
			}
		},
		computed: {
			getStudents() {
				// 所有学生数据
				let students = this.students;
				let dormId = this.userInfo.dormId;
				// 宿舍管理员
				if (this.userInfo.type == 1) {
					return students.filter(item => item.dormId == dormId);
				}
				// 学生
				if (this.userInfo.type == 2) {
					return students.filter(item => item.id == this.userInfo.studId);
				}
			
				return students;
			},
			list() {
				let list = JSON.parse(localStorage.getItem("data")).absences;
				// 补全信息
				list.forEach(item => {
					this.updateInfo(item);
				});
				// 宿舍管理员
				if (this.userInfo.type == 1) {
					return list.filter(item => {
						return item.stu.dormId == this.userInfo.dormId;
					});
				}
				// 学生
				if (this.userInfo.type == 2) {
					return list.filter(item => item.studId == this.userInfo.studId);
				}

				return list.filter(item => true);
			},
			pageData() {
				// 默认是显示所有数据
				this.searchData = this.list;
				// 有搜索条件
				if (this.searchForm.sname) {
					this.searchData = this.searchData.filter(item =>
						item.sname.toLowerCase().indexOf(this.searchForm.sname.toLowerCase()) != -1);
				}
				if (this.searchForm.startTime) {
					this.searchData = this.searchData.filter(item => moment(item.createDate).isAfter(new Date(this.searchForm.startTime)));
				}
				if (this.searchForm.endTime) {
					this.searchData = this.searchData.filter(item => moment(item.createDate).isBefore(new Date(this.searchForm.endTime)));
				}
				return this.searchData.filter((value, index) =>
					index >= this.pager.pageSize * (this.pager.pageNum - 1) &&
					index < this.pager.pageSize * this.pager.pageNum);
			}
		}
	});
})();
