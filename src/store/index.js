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
    updateBike(state, bike) {
      // copy object and generate id if not provided
      bike = {
        ...bike,
        id: bike.id || Math.max(...state.bikes.map((b) => b.id)) + 1,
      };

      // add or replace if bike with this id exists
      state.bikes = [...state.bikes.filter((b) => b.id !== bike.id), bike];
    },
    removeBike(state, bikeId) {
      state.bikes = [...state.bikes.filter((b) => b.id !== bikeId)];
    },
  },
  actions: {},
  modules: {},
});
