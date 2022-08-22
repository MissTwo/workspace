(function() {
	let app = new Vue({
		el: "#app",
		data: {
			userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
			updateForm: {

			},
			menuTitle: "修改密码"
		},
		methods: {
			onSubmit() {
				if (!this.updateForm.password) {
					alert("原密码不能为空");
					return;
				}
				if (!this.updateForm.newpassword) {
					alert("新密码不能为空");
					return;
				}
				// 新密码的两次输入必须一致
				if (this.updateForm.cfmpassword != this.updateForm.newpassword) {
					alert("新密码的两次输入必须一致");
					return;
				}
				// console.log(this.updateForm);
				if (this.updateForm.password == this.userInfo.password) {
					// 原密码正确
					let data = JSON.parse(localStorage.getItem("data"));
					// 将记录更新到storage中
					if (this.userInfo.type == 0) {
						// 系统管理员
					} else if (this.userInfo.type == 1) {
						// 所有管理员数据
						let dormAdmins = data.dormAdmins;
						console.log(this.userInfo);
						console.log(dormAdmins);
						// 宿舍管理员
						let dormAdmin = dormAdmins.find(item => item.password == this.updateForm.password && item.account == this.userInfo
							.account);
						console.log(dormAdmin);
						if (dormAdmin) {
							dormAdmin.password = this.updateForm.newpassword;
							localStorage.setItem("data", JSON.stringify(data));
							sessionStorage.clear();
							// 跳转到登录页面
							location.href = "/河池学院前端/学生宿舍管理系统-vue/login.html";
						}
					} else if (this.userInfo.type == 2) {
						// 所有学生数据
						let students = data.students;
						// 学生
						let stu = students.find(item => item.password == this.updateForm.password && item.code == this.userInfo.account);
						if (stu) {
							stu.password = this.updateForm.newpassword;
							localStorage.setItem("data", JSON.stringify(data));
							sessionStorage.clear();
							// 跳转到登录页面
							location.href = "/河池学院前端/学生宿舍管理系统-vue/login.html";
						}
					}
				} else {
					alert("原密码不正确");
				}
			}
		},
		computed: {
			// 保存欢迎语句

		}
	});
})();
