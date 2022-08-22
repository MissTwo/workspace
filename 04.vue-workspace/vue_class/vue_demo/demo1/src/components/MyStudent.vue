<template>
  <div class="student">
    <h5>你好我是{{ name }}</h5>
    <h5>年龄是：{{ age }}</h5>
  </div>
</template>

<script>
export default {
  name: 'MyStudent',
  data() {
    return {
      name: 'jack',
      age: 18,
    };
  },
};
</script>

<style>
.student {
  background-color: orange;
  color: blueviolet;
}
</style>