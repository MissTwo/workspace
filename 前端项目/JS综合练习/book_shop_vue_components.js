/**
 * 使用Mock产生随机的测试数据
 */
function init_data() {
	let Random = Mock.Random;
	Random.extend({
		getBookName: function () {
			let array = [
				"Java",
				"JavaScript",
				"Mysql",
				"JQuery",
				"HTML",
				"CSS",
				"Bootstrap",
				"Vue",
				"NodeJS",
				"React",
				"Less",
				"Express",
			];
			return this.pick(array);
		},
	});
	return Mock.mock({
		"array|100": [
			{
				"id|+1": 1,
				name: "@getBookName 从入门到放弃",
				create_date: "@date",
				price: "@float(40, 200, 2, 2)",
				count: "@integer(1, 10)",
			},
		],
	});
}

let books = init_data().array;

const app = new Vue({
	el: "#app",
	data: {
		list: books,
		titles: ["序号", "名称", "单价", "日期", "数量", "操作"],
		editItemId: -1, //当前编辑的数据对象的id
		editItem: {},
		pageList: [], // 分页数据数组
		searchArgs: {
			minPrice: 0,
			maxPrice: 0,
			name: "",
		},
		pager: {
			size: 10,
			num: 1,
			count: books.length,
		},
		delete_ids: [],
		select_all: false, //判断是否全选
	},
	methods: {
		handler_add() {
			console.log(1111);
			this.pageList.push({id: 1000});
			// console.log(this.pageList);
		},
		handler_edit(item) {
			// this.editItem = item; // 是否会直接将数据写入到数组中
			// this.editItem = {...item}; // 浅复制
			this.editItem = _.cloneDeep(item);
			this.editItemId = item.id;
		},
		handler_save(item) {
			if (this.editItemId && this.editItem) {
				Object.assign(item, this.editItem);
				// item = {...item, ...this.editItem}
				(this.editItem = {}), (this.editItemId = -1);
			}
		},
		handler_count(val, item) {
			item.count += val;
			if (val < 0 && item.count < 0) {
				item.count = 0;
			}
		},
		handler_search() {
			this.list = books;
			const { name, minPrice, maxPrice } = this.searchArgs;
			if (name) {
				this.list = this.list.filter(
					(item) =>
						item.name.toLowerCase().indexOf(name.toLowerCase()) !=
						-1
				);
			}
			if (minPrice && minPrice >= 0) {
				this.list = this.list.filter((item) => item.price >= minPrice);
			}
			if (maxPrice && maxPrice > 0) {
				this.list = this.list.filter((item) => item.price <= maxPrice);
			}
			// this.pager.count = this.list.length;
		},
		handler_num_change(val) {
			console.log("handler_num_change", val);
			this.pager.num = val;
		},
		handler_del(item) {
			const { id } = item;
			// Vue.delete(this.list, this.list.findIndex(value => value.id == id));
			this.$delete(
				this.list,
				this.list.findIndex((value) => value.id == id)
			);
			this.$delete(
				books,
				books.findIndex((value) => value.id == id)
			);
			// this.list.splice(this.list.findIndex(value => value.id == id), 1);
			// this.list = this.list.filter(value => value.id != id);
			// this.pager.count = this.list.length;
		},
		handler_del_batch() {
			this.delete_ids.forEach((id) => {
				this.$delete(
					this.list,
					this.list.findIndex((value) => value.id == id)
				);
				this.$delete(
					books,
					books.findIndex((value) => value.id == id)
				);
			});
			this.delete_ids = [];
			// this.pager.count = this.list.length;
			this.select_all = false;
		},
		handler_select_all() {
			if (this.select_all) {
				this.delete_ids = this.pager_list.map((item) => item.id);
			} else {
				this.delete_ids = [];
			}
		},
	},
	filters: {
		// money_format(value) {
		// 	return "总价格：￥" + value.toFixed(2);
		// },
	},
	computed: {
		pager_list() {
			const { num, size } = this.pager;
			return this.list.filter(
				(item, index) => index >= (num - 1) * size && index < num * size
			);
		},
	},
	watch: {

	}
});
