<template>
  <div>
    <h1 ref="title">{{ title }}</h1>
    <button @click="show_info">点我打印上部标签</button>
    <p ref="paragraphs">我是段落</p>
  </div>
</template>

<script>
export default {
  name: "MySchool",
  data() {
    return {
      title: '欢迎学习',
    };
  },
  methods:{
    show_info(){
      console.log(this.$refs.title);
      console.log("---------------");
      console.log(this.$refs.paragraphs);
    }
}
};
</script>

<style scoped>

</style>