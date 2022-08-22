const Pagination = {
    // props: ["count", "num", "size"],
    props: {
        count: {
            type: Number,
            required: true,
        },
        num: {
            type: Number,
            default: 1,
        },
        size: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            pager: {
                size: this.size,
                num: this.num,
                count: this.count,
            },
        };
    },
    computed: {
        com_pager() {
            const { size, num, count } = this.pager;
            // const size = this.size,
            // 	num = this.num,
            // 	count = this.count;

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
        handler_num_change(val) {
            this.pager.num = val;
            this.$emit("num_change", val);
        },
    },
    watch: {
        "pager.size": function() {
            this.pager.num = 1
        }
    },
    template: `
        <div>
            <span>一共有{{pager.count}}条记录</span>
            <nav aria-label="Page navigation">
                <ul id="ul_pager" class="pagination">
                    <li @click="handler_num_change(com_pager.first)"><a href="#">首页</a></li>
                    <li @click="handler_num_change(com_pager.pre)"><a href="#">上一页</a></li>
                    <li @click="handler_num_change(item)" :class="{active: item == com_pager.num}" v-for="(item, index) in com_pager.total" :key="index"><a href="#" >{{item}}</a></li>
                    <li @click="handler_num_change(com_pager.next)"><a href="#">下一页</a></li>
                    <li @click="handler_num_change(com_pager.last)"><a href="#">尾页</a></li>
                </ul>
            </nav>
            <select id="pager_select" v-model="pager.size">
                <option>5</option>
                <option>10</option>
                <option>50</option>
            </select>
        </div>
    `,
};

// 注册组件
Vue.component("pagination", Pagination);