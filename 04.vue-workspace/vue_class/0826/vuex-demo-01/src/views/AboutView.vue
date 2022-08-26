<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{$store.state.count}}----{{$store.state.msg}}----{{$store.state.module_a.count}}----{{$store.getters['module_a/get_count']}}</h1>
    <button @click="add_count">增加count</button>
    <button @click="sub_count">减少count</button>
    <button @click="$store.dispatch('login', {
      account: 'admin',
      password: '123456',
      type: 0,
    })">发起请求</button>
    <button @click="$store.commit('module_a/add_count', 10)">模块中的mutations</button>
  </div>
</template>

<script>
  export default {
    methods: {
      add_count() {
        // this.$store.state.count++ // 不推荐直接通过state修改数据
        // 推荐通过mutations中的方法，payload是一个数值5
        this.$store.commit("add_count", 5, 10); //只能写两个参数，多个使用对象写法
        // this.$store.commit("add_count", {}); //只能写两个参数，多个使用对象写法
      },
      sub_count() {
        // this.$store.state.count++ // 不推荐直接通过state修改数据
        // 推荐通过mutations中的方法
        // payload是一个对象
        this.$store.commit({
          type: "sub_count",
          val: 5
        });
      }
    },
  }
</script>