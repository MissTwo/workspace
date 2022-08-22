(function() {
	let app = new Vue({
		el: "#app",
		data: {
			// 登录表单相关变量
			loginForm: {
				account: localStorage.getItem("account") || "",
				password: localStorage.getItem("password") || "",
				type: "0",
				rem: false
			},
			dormAdmins: JSON.parse(localStorage.getItem("data")).dormAdmins,
			students: JSON.parse(localStorage.getItem("data")).students,
		},
		methods: {
			doLogin() {
				// 数据合法性验证
				// 账号和密码不能为空
				if (this.loginForm.account == "") {
					alert("账号不能为空");
					return;
				}
				if (this.loginForm.password == "") {
					alert("密码不能为空");
					return;
				}

				if (this.loginForm.type == 0) {
					// 系统管理员登录
					if (this.loginForm.account == "admin" && this.loginForm.password == "123") {
						// 将账号密码保存到localStorage中
						console.log(this.loginForm.rem);
						if (this.loginForm.rem) {
							localStorage.setItem("account", this.loginForm.account);
							localStorage.setItem("password", this.loginForm.password);
						} else {
							localStorage.removeItem("account");
							localStorage.removeItem("password");
						}
						// 登录人员的信息保存到sessionStorage中
						// delete this.loginForm.password;
						sessionStorage.setItem("userInfo", JSON.stringify(this.loginForm));
						sessionStorage.setItem("menuActiveIndex", "0");
						// 跳转到欢迎页
						location.href = "welcome.html";
					} else {
						// 登录失败
						alert("登录失败，账号或密码错误");
					}
				} else if (this.loginForm.type == 1) {
					// 宿舍管理员登录
					// 面试题，高阶函数中不能使用break和continue中断循环
					let isSucess = false; // 账号密码是否正确
					let loginItem; // 保存登录成功的对象
					for (let index in this.dormAdmins) {
						let item = this.dormAdmins[index];
						if (item.account == this.loginForm.account && item.password == this.loginForm.password) {
							isSucess = true;
							loginItem = item;
							break; //中止当前循环
							// continue; //跳出当次循环
						}
					}

					if (isSucess) {
						// 登录成功
						// 登录人员的信息保存到sessionStorage中
						// delete this.loginForm.password;
						this.loginForm.dormId = loginItem.dormId;

						sessionStorage.setItem("userInfo", JSON.stringify(this.loginForm));
						sessionStorage.setItem("menuActiveIndex", "0");
						// 跳转到欢迎页
						location.href = "welcome.html";
					} else {
						// 登录失败
						alert("登录失败，账号或密码错误");
					}
				} else if (this.loginForm.type == 2) {
					// 学生登录
					let isSucess = false; // 账号密码是否正确
					let loginItem; // 保存登录成功的对象
					for (let index in this.students) {
						let item = this.students[index];
						if (item.code == this.loginForm.account && item.password == this.loginForm.password) {
							isSucess = true;
							loginItem = item;
							break; //中止当前循环
							// continue; //跳出当次循环
						}
					}
					console.log("loginItem", loginItem);
					if (isSucess) {
						// 登录人员的信息保存到sessionStorage中
						// delete this.loginForm.password;
						this.loginForm.studId = loginItem.id;

						sessionStorage.setItem("userInfo", JSON.stringify(this.loginForm));
						sessionStorage.setItem("menuActiveIndex", "0");
						// 跳转到欢迎页
						location.href = "welcome.html";
					}

				} else {
					alert("类型选择错误");

				}

			}
		}
	});
})()
