/**
 * 表格组件
 */

Vue.component("mytable", {
	data() {
		return {
			cbSelectAll: false
		}
	},
	methods: {
		doSelectAll() {
			this.$emit("select-all", this.cbSelectAll)
		}
	},
	props: {
		titles: {
			type: Array,
			required: true
		}
	},
	template: `
		<table id="table" class="table table-striped table-bordered table-hover">
			<thead>
				<tr>
					<th><input type='checkbox' v-model="cbSelectAll" @change='doSelectAll()' name='cb_select_all'></th>
					<th v-for="(item, index) in titles" :key="index">{{item}}</th>
				</tr>
			</thead>
			<tbody>
				<slot></slot>
			</tbody>
		</table>
	`
})