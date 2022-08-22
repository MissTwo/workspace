<template>
  <div>
    <button>
      <router-link to="/"> HelloWord</router-link>
    </button>
    <button>
      <router-link to="/MySchool">MySchool</router-link>
    </button>
    <router-view></router-view>
  </div>
</template>

<script>
// 引入组件
// import MySchool from "./components/MySchool";
// import MyStudent from "./components/MyStudent";

export default {
  name: "App",
  // components: {
  //   MyStudent,
  // },
};
</script>


