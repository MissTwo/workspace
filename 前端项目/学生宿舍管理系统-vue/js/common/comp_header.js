/**
 * 头部组件
 */

Vue.component("myheader", {
	data() {
		return {
			userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
		}
	},
	methods: {
		doLogout() {
			sessionStorage.clear();
			// 跳转到登录页面
			location.href = "/河池学院前端/学生宿舍管理系统-vue/login.html";
		}
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
	},
	template: `
		<!--    头部开始-->
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
					 aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">学生宿舍管理系统</a>
				</div>
		
				<ol class="breadcrumb">
					<li><a href="#">首页</a></li>
				</ol>
				<span> {{userInfo.account}} </span>
				<span class="text-red"> {{welcome}} </span>
		
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img
								 width="30" src="img/systemAdministrator.jpg" class="img-circle">
							</a>
		
							<ul class="dropdown-menu">
								<li><a href="#">个人信息</a></li>
								<li role="separator" class="divider"></li>
								<li @click="doLogout"><a href="#">注销</a></li>
							</ul>
						</li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
		<!--    头部结束-->
	`
});