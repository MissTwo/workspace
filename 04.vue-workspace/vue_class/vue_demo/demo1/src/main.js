// 该文件是整个项目的入口文件

// 引入vue
import Vue from 'vue'
// 引入app组件，他是所有组件的父组件
import App from './App.vue'
import router from "./router";

Vue.config.productionTip = false

// 创建vue实例对象
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
