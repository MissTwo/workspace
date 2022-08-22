/**
 * 菜单组件
 */

Vue.component("mymenus", {
	data() {
		return {
			userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
			// menus: JSON.parse(sessionStorage.getItem("menus")),
			menuActiveIndex: sessionStorage.getItem("menuActiveIndex") | 0,
			list: [{
					title: "首页",
					href: "welcome.html",
					type: "0,1,2"
					// sort: 1 // 排序
				},
				{
					title: "宿舍楼管理员管理",
					href: "dormAdminsManager.html",
					type: "0"
				},
				{
					title: "学生管理",
					href: "studentsManager.html",
					type: "0,1"
				},
				{
					title: "宿舍楼管理",
					href: "dormsManager.html",
					type: "0,1"
				},
				{
					title: "缺勤记录管理",
					href: "queqinManager.html",
					type: "0,1,2"
				},
				{
					title: "修改密码",
					href: "updatePassword.html",
					type: "0,1,2"
				}
			]
		}
	},
	methods: {
		doMenuChange(index = 0, item) {
			this.menuActiveIndex = index;
			sessionStorage.setItem("menuActiveIndex", index);
			sessionStorage.setItem("menuActiveTitle", item.title);
		}
	},
	computed: {
		menus() {
			return this.list.filter(item => item.type.indexOf(this.userInfo.type) != -1);
		}
	},
	template: `
		<!--        左边菜单开始-->
		<div class="col-md-2" style="width: 210px;">
			<div class="list-group">
				<a v-for="(item, index) in menus" @click="doMenuChange(index, item)" :key="index" :href="item.href" :class="{active: menuActiveIndex == index}"
				 class="list-group-item">
					{{item.title}} <span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
				</a>
			</div>
		</div>
		<!--        左边菜单结束-->
	`
})
