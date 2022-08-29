<template>
  <div class="student">
    <h5>{{ msg }}</h5>
    <h5>你好我是{{ name }}</h5>
    <h5>年龄是：{{ age + 1 }}</h5>
    <h6>组件年龄{{myAge}}</h6>
    <button @click="handler_add">点我年龄增加</button>
  </div>
</template>

<script>
export default {
  name: 'MyStudent',
  data() {
    return {
      msg: "学生个人信息",
      myAge: this.age,
    };
  },
  methods: {
    handler_add(){
      this.myAge++
    }
  },
  // 简单声明接收
  // props:["name","age"]

  // 接收的同时对类型进行限制
  // props: {
  //   name: String,
  //   age: Number,
  // },

  // 接收的同时对类型进行限制,默认值的指定，必要值的限制
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 18,
    },
  },
};
</script>

<style>
.student {
  background-color: orange;
  color: blueviolet;
}
</style>