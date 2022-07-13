let TableHelper = (function () {
	let temp_keys = {
		prop: 'prop',
		title: 'title',
		class_name: 'class_name',
		render: 'render',
		edit_render: 'edit_render',
	};
	window.temp_keys = temp_keys;
	// 所有列模板的检验规则
	let temp_rules = new Map();
	temp_rules.set(temp_keys.prop, { required: true, type: 'string' });
	temp_rules.set(temp_keys.title, { required: false, type: 'string' });
	temp_rules.set(temp_keys.class_name, { required: false, type: 'string' });
	temp_rules.set(temp_keys.render, { required: false, type: 'function' });
	temp_rules.set(temp_keys.edit_render, { required: false, type: 'function' });

	/**
	 * 检测单元格式模拟是否符合要求
	 * @param column_template
	 */
	function check_column_template(column_template) {
		column_template.forEach((item) => {
			// 遍历item中的每个key是否符合要求
			temp_rules.forEach((rule, key) => {
				if (rule.required) assert(item.hasOwnProperty(key), `${key} 是必填参数`);
				if (item.hasOwnProperty(key)) {
					let _val = item[key];
					assert(typeof _val === rule.type, `${key} 必须是一个${rule.type}的类型，当前值为${_val}`);
				}
			});
		});
	}

	// 默认的列模板
	let default_template = {
		/**
		 * 属性名称
		 */
		[temp_keys.prop]: '',
		/**
		 * 列标题名称
		 */
		[temp_keys.title]: '',
		/**
		 * td样式名称
		 */
		[temp_keys.class_name]: '',
		/**
		 * 列的渲染函数，自定义单元格内容
		 * @param item  当前行对应的数据对象
		 */
		[temp_keys.render]: function (item) {},
		/**
		 * 添加和编辑模式的单元格内容
		 * @param item  当前行对应的数据对象
		 */
		[temp_keys.edit_render]: function (item) {},
	};

	// Vuex源码中的工具函数，断言函数
	function assert(condition, msg) {
		if (!condition) {
			throw new Error(`[TableHelper] ${msg}`);
		}
	}

	/**
	 * 将数组对象转换为Map对象
	 * @param {Array} array
	 * @param {Map} map
	 * @param {string} id_key   map的key，该key必须是数组中的对象的属性
	 */
	function array2Map(array, map, id_key = 'id') {
		assert(array instanceof Array, 'array 参数必须是一个数组');
		// assert(array.length, 'array 参数长度不能为0');
		assert(map instanceof Map, 'map 参数必须是一个Map键值对');
		map.clear();
		array.forEach((item, index) => {
			assert(item.hasOwnProperty(id_key), `当前对象没有找到名为${id_key}的属性`);
			map.set(item[id_key], item);
		});
	}

	return class {
		/**
		 * 构造函数
		 * @param data  数据源数组，必须是一个对象数组
		 * @param id_key    数据源数组中的对象唯一值，默认取id
		 * @param selector  表格元素选择器
		 * @param column_template  单元格模板数组，模板参考default_template
		 */
		constructor(data = [], id_key = 'id', selector = {}, column_template = []) {
			assert(data instanceof Array, 'data 参数必须是一个数组');
			this.data = data;
			assert(typeof id_key === 'string', 'id_key 参数必须是字符串');
			this.id_key = id_key;
			assert(typeof selector === 'object', 'selector 参数必须是对象');
			this.selector = selector;
			this.table = document.querySelector(selector.table);
			assert(this.table, `${selector.table} 该选择器无法获取到页面元素`);
			assert(this.table.nodeName !== 'table', `${this.table} 不是一个表格元素`);
			let tbody = this.table.querySelector('tbody');
			if (tbody) {
				this.tbody = tbody;
			} else {
				// console.log(this.table);
				this.tbody = this.table.createTBody();
			}
			assert(column_template instanceof Array, 'column_template 参数必须是一个数组');
			check_column_template(column_template);
			this.column_template = column_template;
			array2Map(this.data, this.map_data, id_key);

			this.bind_events();
		}

		/**
		 * 清空指定元素的子节点
		 * @param element
		 */
		empty(element) {
			console.log(element, this.isDomElement(element));
			assert(this.isDomElement(element), 'element 参数的类型必须是DOM节点');
			while (element.hasChildNodes()) {
				element.firstChild.remove();
			}
		}

		isDomElement(element) {
			return typeof element === 'object' && element.nodeType === 1;
		}

		render_table() {
			this.empty(this.tbody);
			this.init_map_tr();
			// this.map_tr.set(1, this.render_tr(this.map_tr.get(1), this.map_data.get(1), 0));
			this.map_tr.forEach((item, key) => {
				this.tbody.appendChild(item);
			});
		}

		// 将数据源数组转换为map结构数据，key为每个对象的唯一属性
		map_data = new Map();
		map_tr = new Map(); //保存所有的tr元素对象
		/**
		 * 渲染表格行函数
		 */
		init_map_tr() {
			this.map_tr.clear();
			this.map_data.forEach((value, key) => {
				console.log(value, key);
				let tr = this.render_tr(null, value, 0);
				this.bind_btn_edit(null, tr);
				this.bind_btn_del(null, tr);
				this.map_tr.set(value.id, tr);
			});
		}

		/**
		 * 搜索功能，将过滤之后的数组传给到table中
		 * @param {Array} array
		 */
		do_search(array= []) {
			console.log("do_search", array)
			assert(Array.isArray(array), 'array 参数必须是一个数组');
			array2Map(array, this.map_data);
			console.log("this.map_data", this.map_data);
			this.render_table();
		}

		/**
		 * 创建tr标签，根据column_template中的配置处理每一个td单元格
		 * @param tr    对应的行对象
		 * @param obj   对应的数据对象，如果obj为null则是添加
		 * @param type  0：只是演示
		 */
		render_tr(tr, obj, type) {
			if (!tr) {
				tr = document.createElement('tr');
			} else {
				this.empty(tr);
			}
			let inputs = []; // 保存每一行的input输入框
			this.column_template.forEach((item, index) => {
				let td = document.createElement('td');
				if (obj != null && item.hasOwnProperty(temp_keys.prop)) {
					td.textContent = obj[item[temp_keys.prop]];
				}
				if (item.hasOwnProperty(temp_keys.class_name)) {
					td.className = item[temp_keys.class_name];
				}
				if (item.hasOwnProperty(temp_keys.render)) {
					let render = item[temp_keys.render];
					assert(typeof render === 'function', 'render 必须是一个函数');
					td.innerHTML = item[temp_keys.render].call(this, obj);
				}
				if (type !== 0 && item.hasOwnProperty(temp_keys.edit_render)) {
					let edit_render = item[temp_keys.edit_render];
					assert(typeof edit_render === 'function', 'edit_render 必须是一个函数');
					td.innerHTML = item[temp_keys.edit_render].call(this, obj);
					inputs.push(td.firstChild);
				}
				tr.appendChild(td);
			});

			tr.inputs = inputs;

			return tr;
		}

		/**
		 * 删除和批量删除
		 * @param id_keys   删除的主键字段值
		 */
		remove(...id_keys) {
			assert(id_keys, `id_keys 必须要传值，当前为${id_keys}`);
			if (confirm(`确认删除${id_keys}，这么些记录吗？`)) {
				id_keys.forEach((item) => {
					this.map_data.delete(item);
					this.map_tr.delete(item);
				});
				this.render_table();
			}
		}

		/**
		 * 绑定所有按钮事件
		 */
		bind_events() {
			this.bind_add();
			this.bind_del_batch();
			this.bind_select_all();
		}

		/**
		 * 绑定添加按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_select_all(selector, parent) {
			this.get_ele_by_selector(selector, 'cb_select_all').onchange = (e) => {
				let cbs = document.querySelectorAll(`${this.selector.cb_select}`);
				cbs.forEach((item) => (item.checked = e.target.checked));
			};
		}

		/**
		 * 绑定添加按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_add(selector, parent) {
			this.get_ele_by_selector(selector, 'btn_add').onclick = () => this.add();
		}

		/**
		 * 绑定批量删除按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_del_batch(selector, parent) {
			this.get_ele_by_selector(selector, 'btn_del_batch').onclick = () => {
				let cbs = document.querySelectorAll(`${this.selector.cb_select}:checked`);
				let ids = Array.from(cbs).map((item) => parseInt(item.value));
				this.remove(...ids);
			};
		}

		/**
		 *  绑定编辑按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_btn_edit(selector, parent) {
			this.get_ele_by_selector(selector, 'btn_edit', parent).onclick = (e) => {
				let id = e.target.getAttribute('data-id'); // 获取绑定在按钮上的id属性
				this.edit(parseInt(id));
			};
		}

		/**
		 *  绑定删除按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_btn_del(selector, parent) {
			this.get_ele_by_selector(selector, 'btn_del', parent).onclick = (e) => {
				let id = e.target.getAttribute('data-id'); // 获取绑定在按钮上的id属性
				this.remove(id);
			};
		}

		/**
		 *  绑定保存按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_btn_save(selector, parent) {
			this.get_ele_by_selector(selector, 'btn_save', parent).onclick = (e) => {
				this.save();
			};
		}

		/**
		 *  绑定取消按钮
		 * @param selector
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		bind_btn_cancel(selector, parent) {
			this.get_ele_by_selector(selector, 'btn_cancel', parent).onclick = (e) => {
				this.cancel();
			};
		}

		/**
		 * 获取元素
		 * @param selector  传入的选择器，如果没有则使用prop从初始的selector对象中查找
		 * @param prop  元素的选择器名称对应的属性
		 * @param parent  父元素对象，如果有则从父元素对象中查找
		 */
		get_ele_by_selector(selector, prop, parent) {
			let ele = null;
			if (!selector) {
				selector = this.selector[prop];
			}
			if (!parent) {
				parent = document;
			}
			ele = parent.querySelector(selector);
			assert(ele != null, `${selector} 无法获取元素`);
			return ele;
		}

		/**
		 * 添加
		 */
		add() {
			this.edit_tr = this.render_tr(null, null);
			this.bind_btn_save(null, this.edit_tr);
			this.bind_btn_cancel(null, this.edit_tr);
			this.tbody.appendChild(this.edit_tr);
			this.edit_item = null;
		}

		edit_tr = null; //当前正在编辑的行对象
		edit_item = null; //当前正在编辑的数据对象
		/**
		 * 编辑功能
		 * @param id
		 */
		edit(id) {
			this.cancel();
			this.edit_tr = this.map_tr.get(id);
			this.edit_item = this.map_data.get(id);
			this.edit_tr = this.render_tr(this.edit_tr, this.edit_item);
			this.bind_btn_save(null, this.edit_tr);
			this.bind_btn_cancel(null, this.edit_tr);
		}

		/**
		 * 编辑和添加保存功能
		 */
		save() {
			if (this.edit_item && this.edit_tr) {
				this.edit_tr.inputs.forEach((item) => {
					let prop = item.name;
					let val = item.value;
					let old_val = this.edit_item[prop];
					if (val != old_val) {
						if (typeof old_val === 'number') {
							val = Number(val);
						}
						this.edit_item[prop] = val;
					}
				});
				// 编辑
				this.edit_item = null;
				this.edit_tr = null;
			} else {
				// 添加
				this.edit_item = {};
				this.edit_tr.inputs.forEach((item) => {
					let prop = item.name;
					let val = item.value;
					let type = item.type;
					if (type === 'number') {
						val = Number(val);
					}
					this.edit_item[prop] = val;
				});
				this.edit_item.id = this.getMaxId() + 1;
				// this.data.push(this.edit_item);
				this.map_data.set(this.edit_item.id, this.edit_item);
			}
			this.render_table();
		}

		/**
		 * 取消功能
		 */
		cancel() {
			this.render_table();
		}

		/**
		 * 返回最大id
		 * @returns {*}
		 */
		getMaxId() {
			return this.data.reduce((pre, cur) => {
				if (pre < cur.id) pre = cur.id;
				return pre;
			}, -1);
		}
	};
})();
