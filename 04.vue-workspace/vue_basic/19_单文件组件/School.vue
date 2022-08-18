<template>
  <!--  组件的结构-->
  <div class="demo">
    <h3>学校名字{{ name }}</h3>
    <h3>学校地址{{ address }}</h3>
    <h3>n:{{ n }}</h3>
    <button @click="handler_add">点我n自增</button>
  </div>
</template>

<!--
重点es6模块化：
  1.分别暴露
    export const xxxx
  2.统一暴露
    export {变量名字}

  以上两种引入方式：
    import {名字} from 地址

  3.默认暴露(一般用这个，因为只有一个东西都用这个)
    export default 变量名字

  引入方式：
      import 名字 from 地址
-->
<script>
// 组件交互相关代码(数据、方法等等)
// 1.export const School
// 2.export {School}
// 3.export default Vue.extend({}) 简写  export default{}

export default {
  name: 'School',
  data() {
    return {
      name: '尚硅谷',
      address: "北京",
      n: 0,
    };
  },
  methods: {
    handler_add() {
      this.n++;
    },
  },
};
</script>


<style>
/*组件的样式*/
.demo {
  background-color: antiquewhite;
  width: 100px;
  height: 100px;
  color: aquamarine;
}
</style>