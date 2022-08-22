/**
 * 分页组件
 */
Vue.component('mypager', {
	data() {
		return {
			num: this.pageNum, // 当前页码 
			size: this.pageSize, // 页面大小，如果页面大小会改变，不建议直接修改props，应该使用data中的变量
			total: 0, // 一共有多少页
			first: 1, // 第一页
			last: 0, // 最后一页,
		};
	},
	computed: {
		// 计算分页参数
		helper: function() {
			this.total = Math.ceil(this.count / this.size);
			this.last = this.total;
			this.first = 1;
			if(this.num > this.total) {
				this.num = this.total;
				this.$emit('pagenum-change', this.num);
				// this.$emit('pagesize-change', this.size);
			}
			let pre = this.pageNum - 1;
			if (pre <= this.first) pre = this.first;
			let next = this.pageNum + 1;
			if (next >= this.total) next = this.last;
			return {
				count: this.count,
				total: this.total,
				first: this.first,
				last: this.last,
				pre,
				next,
			};
		},
	},
	props: {
		pageNum: {
			type: Number,
			default: 1,
		},
		pageSize: {
			type: Number,
			default: 10,
		},
		count: {
			type: Number,
			default: 0,
			required: true,
		},
		options: {
			type: Array,
			default: [10, 20, 50],
			required: false,
		},
	},
	methods: {
		pageNumChange(val) {
			if(this.num == val) return;
			console.log("val");
			this.num = val;
			this.$emit('pagenum-change', this.num);
		},
		pageSizeChange() {
			this.num = 1;
			// console.log("this.size", this.size);
			this.$emit('pagesize-change', this.size, this.num);
		},
	},
	template: `
			<div style="display: flex;justify-content: space-between;align-items: center;">
				<div>
					共<span id="pager_div_span" class="label label-danger">{{count}}</span>条记录
				</div>
				<nav>
					<ul id="pager_ul" class="pagination">
						<li @click="pageNumChange(helper.first)" :class="{disabled: helper.first == num}"><a href="#">首页</a></li>
						<li @click="pageNumChange(helper.pre)" :class="{disabled: helper.first == num}"><a href="#">上一页</a></li>
						<li v-for="i in helper.total" @click="pageNumChange(i)" :class="[num == i ? 'active' : '']"><a
							 href="#">{{ i }}</a></li>
						<li @click="pageNumChange(helper.next)" :class="{disabled: helper.last == num}"><a href="#">下一页</a>
						</li>
						<li @click="pageNumChange(helper.last)" :class="{disabled: helper.last == num}"><a href="#">尾页</a></li>
					</ul>
				</nav>
				<select id="pager_select" class="form-control" v-model="size" @change="pageSizeChange" style="width: auto;">
					<option v-for="item in options" :value="item">{{item}}</option>
				</select>
			</div>
		`,
});
