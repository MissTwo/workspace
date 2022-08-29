<template>
  <div class="demo">
    <h3>n:{{ n }}</h3>
    <button @click="handler_add">点我n自增</button>
    <h3>组件实例中传递值</h3>
    <MyStudent name="tom" :age="22" />
    <h3>父组件的data中传递值</h3>
    <MyStudent v-for="p in person" :key="p.id" :name="p.name" :age="p.age" />

  </div>
</template>

<script>
import MyStudent from "@/components/MyStudent";

export default {
  name: 'MySchool',
  data() {
    return {
      n: 1,
      person: [
        {id: 1, name: "lucy", age: 18},
        {id: 2, name: "bob", age: 25},
        {id: 3, name: "jack", age: 24},
      ],
    };
  },
  methods: {
    handler_add() {
      this.n++;
    },
  },
  components: {
    MyStudent,
  },
};
</script>


<style>
/*组件的样式*/
.demo {
  background-color: antiquewhite;
  color: aquamarine;
}
</style>