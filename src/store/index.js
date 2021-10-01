import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bikes: require("./initialBikes.json"),
  },
  getters: {
    minBikePrice: (state) => Math.min(...state.bikes.map((b) => b.price)),
    maxBikePrice: (state) => Math.max(...state.bikes.map((b) => b.price)),
  },
  mutations: {},
  actions: {},
  modules: {},
});
