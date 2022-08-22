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
		editItemId: -1, //当前编辑的数据对象的id
		editItem: {},
		list: books, //list和books指向同一个地址
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
	created() {
		// 计算属性不是响应式，比如给返回结果为数组的计算属性中添加一条记录，没有反应
		this.pageList = this.pager_list;
	},
	// beforeUpdate() {
	// 	console.log(this.pageList);
	// },
	computed: {
		total_price() {
			// 如果不理解reduce，就使用for处理
			return this.list.reduce(
				(pre, cur) => pre + cur.price * cur.count,
				0
			);
		},
		pager_list() {
			const { num, size } = this.pager;
			return this.list.filter(
				(item, index) => index >= (num - 1) * size && index < num * size
			);
		},
		com_pager() {
			const { size, num, count } = this.pager;

			let total = Math.ceil(count / size);
			let next = num + 1;
			const last = total;
			if (next >= last) next = total;
			const first = 1;
			let pre = num - 1;
			if (pre <= first) pre = first;
			return {
				total,
				count,
				first,
				last,
				num,
				size,
				pre,
				next,
			};
		},
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
		money_format(value) {
			return "总价格：￥" + value.toFixed(2);
		},
	},
	watch: {
		list: function (val) {
			console.log("list 监听", val.length);
			this.pager.count = val.length;
		},
		"pager.num": function (val) {
			console.log("pager.num 监听");
			this.delete_ids = [];
			this.select_all = false;
		},
	},
});
console.log(app);
