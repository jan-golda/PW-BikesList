<template>
  <div>
    <BikeListControls
      :view.sync="view"
      :sort-direction.sync="sortDirection"
      :sort-property.sync="sortProperty"
      :price-range.sync="priceRange"
      :bike-add-open.sync="bikeAddOpen"
    />
    <v-expand-transition>
      <BikeAdd v-show="bikeAddOpen" class="mt-4" />
    </v-expand-transition>
    <v-row class="mt-4">
      <v-col
        v-for="bike in bikes"
        v-bind:key="bike.id"
        :cols="12"
        :sm="view === 'list' ? 12 : 6"
        :md="view === 'list' ? 12 : 4"
      >
        <Bike v-bind="bike" :horizontal="view === 'list'" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Bike from "./Bike";
import BikeListControls from "./BikeListControls";
import BikeAdd from "./BikeAdd";

export default {
  name: "BikeList",
  components: {
    Bike,
    BikeAdd,
    BikeListControls,
  },
  data() {
    return {
      view: "list",
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
};
</script>
