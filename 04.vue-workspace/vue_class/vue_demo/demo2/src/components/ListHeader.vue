<template>
  <el-row>
    <el-col>
      <!--
      elementUl中的输入框注意点：
        1.不能不支持修饰符
        2.支持的事件仅有5种：blur\focus\change\input\clear
      -->
      <el-input type="text" v-model.trim.lazy="input" @change="add"/>
    </el-col>
  </el-row>
</template>

<script>
import {nanoid} from 'nanoid';
export default {
  name: "ListHeader",
  data() {
    return {
      input: '',
    };
  },
  props:['receive_item'],
  methods: {
    add() {
      let addObj={id:nanoid(),title:this.input,state:false}
      this.input=''
      this.receive_item(addObj)
    },
  },
};
</script>

<style scoped>

</style>