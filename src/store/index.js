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
  mutations: {
    addBike(state, bike) {
      state.bikes.push({
        ...bike,
        id: Math.max(...state.bikes.map((b) => b.id)) + 1,
      });
    },
  },
  actions: {},
  modules: {},
});
