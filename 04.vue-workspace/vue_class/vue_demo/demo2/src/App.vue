<template>
  <div id="app">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" >
      <el-col :span="6">
        <ListHeader/>
        <ListBody/>
        <ListFooter/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ListBody from "@/components/ListBody";
import ListFooter from "@/components/ListFooter";
import ListItem from "@/components/ListItem";
import ListHeader from "@/components/ListHeader";

export default {
  name: "App",
  components: {
    ListBody,
    ListFooter,
    ListItem,
    ListHeader
  },
};
</script>
<style scoped>

.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>