<template>
  <div id="app">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <!--     问题：   子传父，数据父组件的数据不是实时更新的-->
        <ListHeader :receive_item="receive_item"/>
        <ListBody :list="list" :receive_delete="receive_delete" :check_item="check_item"/>
        <ListFooter
            :receive_select="receive_select"
            :list="list"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ListBody from "@/components/ListBody";
import ListFooter from "@/components/ListFooter";
import ListHeader from "@/components/ListHeader";

export default {
  name: "App",
  data() {
    return {
      state: false,
      list: [
        {id: "001", title: "打代码", state: false},
        {id: "002", title: "吃饭", state: true},
        {id: "003", title: "睡觉", state: false},
        {id: "004", title: "看剧", state: true},
      ],
    };
  },
  components: {
    ListBody,
    ListFooter,
    ListHeader,
  },
  methods: {
    receive_item(value) {
      this.list.unshift(value);
    },
    receive_select(x) {
      console.log(x);
      this.list.forEach(i => {
        i.state = x;
      });
      console.log(this.list);
    },
    receive_delete(id) {
      // filter不改变原数组，返回一个新数组
      this.list = this.list.filter(i => i.id !== id);
    },
    check_item(x) {
      this.list.forEach(i => {
        if (i.id === x) {
          i.state = !i.state;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>

.el-row {
  margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>