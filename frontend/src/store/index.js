import Vue from "vue";
import Vuex from "vuex";
import Clone from "../client";
import Environment from "./environment";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Clone, Environment },
});
