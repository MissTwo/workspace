import Vue from 'vue';
import VueRouter from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import MySchool from "@/components/MySchool";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: HelloWorld},
    {path: '/MySchool', component: MySchool},
];
const router = new VueRouter({
    routes,
});
export default router;