<template>
  <div class="hello">
    <h1>111</h1>
    <button @click="handler_content">点我打印混入语句</button>
    <button @click="handler_demo">点我打印混入语句</button>
    <h2>{{gender}}</h2>
  </div>
</template>

<script>
// import {mixin1,mixin2} from "@/mixin";

export default {
  name: 'HelloWorld',
  // 局部的混入
  // mixins:[mixin1,mixin2],


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello{
  color: #4cae4c;
  h2{
    color: red;
  }
}
</style>
