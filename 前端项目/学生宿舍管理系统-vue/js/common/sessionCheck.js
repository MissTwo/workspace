/**
 * 验证session，是否有登录标识
 */

(function() {
	let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	if(!userInfo) {
		// 没有登录过，跳转到登录页面
		alert("非法访问，请先登录");
		// 跳转登录页面
		location.href = "/河池学院前端/学生宿舍管理系统-vue/login.html";
	}
})();