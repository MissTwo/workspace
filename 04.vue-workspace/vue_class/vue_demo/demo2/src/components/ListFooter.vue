<template>
  <el-row class="el-row" type="flex" justify="space-between" align="middle">
    <el-checkbox
        @change="send"
        v-model="isAll">已完成{{ complete }}/全部{{ total }}</el-checkbox>
    <el-button type="warning" size="small" >删除已经完成</el-button>
  </el-row>
</template>

<script>
export default {
  name: "ListFooter",
  // data() {
  //   return {
  //     allItem: false,
  //   };
  // },
  props:['list',"receive_select",],
  computed:{
    total() {
      return this.list.length;
    },
    complete() {
      let count = 0;
      this.list.forEach(i => {
        if (i.state) {
          count++;
        }
      });
      return count;
    },
    isAll() {
      console.log(this.total === this.complete);
      return this.total === this.complete;
    },
  },
  methods: {
    send() {
      this.receive_select(this.isAll);
    },
  },


};
</script>

<style scoped>
.el-row {
  margin: 5px;
}
</style>