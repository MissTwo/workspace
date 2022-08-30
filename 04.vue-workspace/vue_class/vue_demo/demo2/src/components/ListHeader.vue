<template>
  <el-row >
    <el-col>
      <el-input v-model="input" @keyup.enter="handlde_add"></el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ListHeader",
  data() {
    return {
      input: '',
    };
  },
  methods:{
    handler_add(){

    }
  }
};
</script>

<style scoped>

</style>