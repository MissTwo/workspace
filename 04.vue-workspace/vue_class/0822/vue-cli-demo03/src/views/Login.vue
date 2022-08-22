<template>
	<div id="root" class="container-fluid">
		<div class="row">
			<div
				class="col-md-6 col-md-offset-3 col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2"
			>
				<form class="login-form text-center">
					<h1>欢迎使用宿舍管理系统</h1>
					<div class="form-group">
						<input
							type="text"
							class="form-control"
							v-model.trim="loginForm.account"
							name="account"
							placeholder="账号"
						/>
						<input
							type="password"
							class="form-control"
							v-model.trim="loginForm.password"
							name="password"
							placeholder="密码"
						/>
					</div>
					<div class="form-group">
						<label class="radio-inline">
							<input
								type="radio"
								name="type"
								v-model="loginForm.type"
								value="0"
							/>
							系统管理员
						</label>
						<label class="radio-inline">
							<input
								type="radio"
								name="type"
								v-model="loginForm.type"
								value="1"
							/>
							宿舍管理员
						</label>
						<label class="radio-inline">
							<input
								type="radio"
								name="type"
								v-model="loginForm.type"
								value="2"
							/>
							学生
						</label>
					</div>
					<div class="form-group">
						<label class="checkbox-inline">
							<input
								type="checkbox"
								v-model="loginForm.rem"
								value="1"
							/>
							记住密码
						</label>
					</div>
					<div class="form-group">
						<button
							type="button"
							class="btn btn-primary btn-block"
							@click="handler_login"
						>
							登录
						</button>
					</div>
					<div class="form-group btns-other">
						<button type="button" class="btn btn-default">
							注册
						</button>
						<button type="reset" class="btn btn-default">
							重置
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			loginForm: {},
		};
	},
	methods: {
		handler_login() {
            console.log("this.$router", this.$router);
            console.log("this.$route", this.$route);
        },
	},
};
</script>

<style scoped>
/* 加了scoped那么里面的样式只能影响该的标签 */
#root {
	background-image: url("../assets/bg.jpg");
	background-repeat: no-repeat;
	background-size: 100% 100%;
    height: 100%;
    width: 100%;
}

input[name="account"] {
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}

input[name="password"] {
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

.btns-other {
	display: flex;
	justify-content: space-between;
}

.btns-other > button {
	/*flex: 1;*/
	width: 49%;
}

.login-form {
	background-color: white;
	border-radius: 10px;
	padding: 10px;
	margin-top: 100px;
	opacity: 0.8;
}
</style>
