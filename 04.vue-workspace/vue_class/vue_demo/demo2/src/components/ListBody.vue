<template>
  <div>
    <el-row v-for="(i,index) in list" :key="index" type="flex" justify="space-between" >
      <el-checkbox >{{i}}</el-checkbox>
      <el-button  type="danger" size="small">删除</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ListBody",
  data(){
    return{
      list:["打代码","吃饭","睡觉","看剧"]
    }
  }
};
</script>

<style scoped>

</style>