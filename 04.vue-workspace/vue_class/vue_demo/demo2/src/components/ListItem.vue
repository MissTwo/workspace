<template>
  <el-row class="item-row" type="flex" justify="space-between" align="middle">
    <el-checkbox class="el-checkbox" :checked="item.state"  @change="handleCheck(item.id)">{{ item.title }}</el-checkbox>
<!--    如下代码也能实现功能但是违背修改props值的原则-->
<!--    <el-checkbox v-model="item.state" >{{ item.title }}</el-checkbox>-->
    <el-button v-show="true" class="el-button" type="danger" size="small" @click="delete_i(item.id)">删除</el-button>
  </el-row>
</template>

<script>
export default {
  name: "ListItem",
  props: ["item","delete_item","check_item"],
  methods: {
    handleCheck(x){
      this.check_item(x)
    },
    delete_i(id) {
      if(confirm("确定要删除吗？")){
        this.delete_item(id)
      }
      // this.delete_item()

    },
  },
};
</script>

<style lang="less" scoped>
.item-row {
  padding: 5px;
  height: 42px;
  .el-button{
    display: none;
  }
}
.item-row:hover{
  background-color: #9acfea;
}
.item-row:hover .el-button{
  display: block;
}

</style>