<template>
  <div class="hello">
    <MySchool></MySchool>
    <el-row>
      <el-button>默认按钮</el-button>
    </el-row>
  </div>
</template>

<script>

import MySchool from "@/components/MySchool";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components:{
    MySchool
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
