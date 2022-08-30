<template>
  <el-row>
    <el-checkbox>已完成{{ complete }}/全部{{ total }}</el-checkbox>
  </el-row>
</template>

<script>
export default {
  name: "ListFooter",
  props: {
    complete: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },

};
</script>

<style scoped>

</style>