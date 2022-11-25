import Vue from "vue";
import VueRouter from "vue-router";
import Router from "vue-router";
import HomeView from "../views/HomeView";
import EnvironmentView from "../views/Environment";
import { FRONTEND_URL } from "../config/index";

Vue.use(VueRouter);
Vue.use(Router);

export default new Router({
  //mode: "history",
  base: FRONTEND_URL,
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/environments",
      component: EnvironmentView,
    },
  ],
});

const router = new VueRouter({
  mode: "history",
  base: FRONTEND_URL,
});
