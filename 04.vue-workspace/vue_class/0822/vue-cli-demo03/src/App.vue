<template>
	<div id="root">
		<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
		<!-- 通过router-link -->
		<router-link to="/welcome">去到welcome</router-link>
		<hr />
		<router-link to="/">去到根路径</router-link>
		<hr />
		<router-link to="aaa">去到相对路径</router-link>
		<hr />
		<router-link :to="{ path: '/welcome' }"
			>对象写法去到welcome</router-link
		>
		<hr />
		<!-- <router-link :to="{ path: '/welcome', query: { a: 1, b: '10' } }"
			>带query参数的路径</router-link
		> -->
		<router-link :to="{ name: 'welcome', query: { a: 1, b: '10' } }"
			>带query参数的路径</router-link
		>
		<hr />
		<!-- <router-link :to="{path:'/welcome', params: {a: 1, b: '10' } }">带params参数的路径</router-link> -->
		<router-link :to="{ name: 'welcome', params: { a: 1, b: '10' } }"
			>带params参数的路径</router-link
		>
		<hr />
		<router-link :to="{ path: '/restful/1' }"
			>restful风格api传参</router-link
		>
		<!-- <router-view name="sp"></router-view> -->
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
};
</script>

<style>
#root {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100%;
}
</style>
