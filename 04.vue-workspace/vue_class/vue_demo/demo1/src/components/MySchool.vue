<template>
  <div class="demo">
    <h3>学校名字{{ name }}</h3>
    <h3>学校地址{{ address }}</h3>
    <h3>n:{{ n }}</h3>
    <button @click="handler_add">点我n自增</button>
    <MyStudent></MyStudent>
  </div>
</template>

<script>
import MyStudent from "@/components/MyStudent";
export default {
  name: 'MySchool',
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
  components:{
    MyStudent
  }
};
</script>


<style>
/*组件的样式*/
.demo {
  background-color: antiquewhite;
  height: 200px;
  color: aquamarine;
}
</style>