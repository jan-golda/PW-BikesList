<template>
  <div>
    <BikeListControls
      :sort-direction.sync="sortDirection"
      :sort-property.sync="sortProperty"
      :price-range.sync="priceRange"
      :bike-add-open.sync="bikeAddOpen"
    />
    <v-expand-transition>
      <v-card v-show="bikeAddOpen" dark rounded class="mt-4">
        <BikeForm @submit="createNewBike" ref="newBikeForm"/>
      </v-card>
    </v-expand-transition>
    <v-row class="mt-4">
      <v-col v-for="bike in bikes" v-bind:key="bike.id" cols="12">
        <Bike v-bind="bike" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Bike from "./Bike";
import BikeListControls from "./BikeListControls";
import BikeForm from "./BikeForm";

export default {
  name: "BikeList",
  components: {
    Bike,
    BikeForm,
    BikeListControls,
  },
  data() {
    return {
      priceRange: [0, 0],
      sortDirection: "ascending",
      sortProperty: "name",
      bikeAddOpen: false,
    };
  },
  computed: {
    bikes() {
      return this.$store.state.bikes
        .filter(
          (b) => this.priceRange[0] <= b.price && b.price <= this.priceRange[1]
        )
        .sort(
          (b1, b2) =>
            (b1[this.sortProperty] > b2[this.sortProperty] ? -1 : 1) *
            (this.sortDirection === "ascending" ? -1 : 1)
        );
    },
  },
  methods: {
    createNewBike(bike) {
      this.$store.commit("addBike", bike);
      this.$refs.newBikeForm.reset();
    },
  }
};
</script>
