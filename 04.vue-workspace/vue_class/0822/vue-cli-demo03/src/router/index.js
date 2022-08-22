import Vue from "vue";
import VueRouter from "vue-router";
// import HelloWorld from "../components/HelloWorld.vue";
import Login from "../views/Login.vue";
import Welcome from "../views/Welcome.vue";
import AllPath from "../views/AllPath.vue";
import SuffixPath from "../views/SuffixPath.vue";

// 使用VueRouter插件
Vue.use(VueRouter);

// 路由对象配置RouteConfig
const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Welcome,
  },
  {
    path: "/restful/:id",
    name: "restful",
    component: Welcome,
  },
  {
    path: "/user-*",
    // component: SuffixPath,
    components: {
        sp: SuffixPath
    }
  },
  {
    path: "*",
    component: AllPath,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
