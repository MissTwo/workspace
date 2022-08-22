const my_table = {
    props: {
        // 表格需要显示的数据，给多少显示多少，不考虑分页
        list: {
            type: Array,
            required: true,
            default: []
        },
        // 标题数组
        titles: {
            type: Array,
            required: true,
            default: []
        }
    },
    data() {
        return {
            select_all: false
        }
    },
    methods: {
        handler_select_all() {

        }
    },
    template: `
        <table
            id="table"
            class="table table-striped table-bordered table-hover"
        >
            <thead>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            v-model="select_all"
                            @change="handler_select_all"
                        />
                    </th>
                    <th v-for="(item, index) in titles" :key="index">
                        {{item}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- item和index是Vue中的变量 -->
                <tr v-for="(item, index) in list" :key="item.id">
                    <slot :item="item"></slot>
                </tr>
            </tbody>
        </table>
    `
}

Vue.component("my-table", my_table);