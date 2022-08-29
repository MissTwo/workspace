<template>
  <div class="hello">
    <h3>我是n:{{ $store.state.count }}</h3>
    <button @click="increment">点我n++</button>
    <hr>
    <h3>{{num}}</h3>
  </div>
</template>

<script>
// import {names} from "@/store";
// import {mapState} from "vuex"

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  computed:{
    // count:{...mapState([names.state_count])},
    num(){
      return this.$store.state.count
    }
  },
  methods:{
    increment(){
      // 调用vuex中所配置的方法
      this.$store.commit('increment');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
