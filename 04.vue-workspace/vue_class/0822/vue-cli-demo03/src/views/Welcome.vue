<template>
	<div class="container">
		<!-- <myheader></myheader> -->
		<!--    中间内容-->
		<div class="row flex-content">
			<!-- <mymenus></mymenus> -->
			<div
				class="col-md-9 col-sm-9 col-xs-9"
				style="flex: 1; margin: 0; padding: 0"
			>
				<div id="content_div" class="jumbotron">
					<h2>{{ welcome }}</h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Welcome",
	mounted() {
		console.log("Welcome--mounted", this.$route);
	},
	data() {
		return {
			welcome: "欢迎",
		};
	},
	methods: {},
};
</script>

<style></style>
