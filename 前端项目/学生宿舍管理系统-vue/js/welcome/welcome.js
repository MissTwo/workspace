(function() {
	let app = new Vue({
		el: "#app",
		data: {
			userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
		},
		computed: {
			// 保存欢迎语句
			welcome() {
				if (this.userInfo.type == 0) {
					return "欢迎您，系统管理员";
				} else if (this.userInfo.type == 1) {
					return "欢迎您，宿舍管理员";
				} else if (this.userInfo.type == 2) {
					return "欢迎您，同学";
				} else {
					return "非法访问";
				}
			}
		}
	});
})();
