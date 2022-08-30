import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {Button,Input,Checkbox,Row,Col} from "element-ui";

Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Row)
Vue.use(Col)



Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
