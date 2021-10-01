<template>
  <div>
    <v-toolbar rounded dark>
      <v-btn icon @click="toggleView">
        <v-icon>mdi-view-{{ view === "list" ? "grid" : "list" }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="toggleSortDirection" icon>
        <v-icon>
          mdi-sort-{{ propertiesTypes[sortProperty] }}-{{ sortDirection }}
        </v-icon>
      </v-btn>
      <div style="width: 150px">
        <v-select
          v-model="sortProperty"
          :items="sortableProperties"
          hide-details
          dense
          solo
        ></v-select>
      </div>
      <v-spacer></v-spacer>
      <v-range-slider
        v-model="priceRange"
        :min="minBikePrice"
        :max="maxBikePrice"
        hide-details
        class="align-center"
      >
        <template v-slot:prepend>
          <v-text-field
            :value="priceRange[0]"
            @change="$set(priceRange, 0, $event)"
            type="number"
            hide-details
            single-line
            solo
            dense
            class="price-input"
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            :value="priceRange[1]"
            @change="$set(priceRange, 1, $event)"
            type="number"
            hide-details
            single-line
            solo
            dense
            class="price-input"
          ></v-text-field>
        </template>
      </v-range-slider>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-toolbar>
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
import { mapGetters } from "vuex";

const sortableProperties = [
  { text: "Name", value: "name" },
  { text: "Price", value: "price" },
  { text: "Groupset", value: "groupset" },
];

const propertiesTypes = {
  name: "alphabetical",
  price: "numeric",
  groupset: "alphabetical",
};

export default {
  name: "BikesList",
  components: {
    Bike,
  },
  data() {
    return {
      view: "list",
      priceRange: [0, 0],
      sortDirection: "ascending",
      sortProperty: "name",
      sortableProperties,
      propertiesTypes,
    };
  },
  computed: {
    ...mapGetters(["minBikePrice", "maxBikePrice"]),
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
  created() {
    this.priceRange = [this.minBikePrice, this.maxBikePrice];
  },
  methods: {
    toggleSortDirection() {
      this.sortDirection =
        this.sortDirection === "ascending" ? "descending" : "ascending";
    },
    toggleView() {
      this.view = this.view === "grid" ? "list" : "grid";
    },
  },
};
</script>

<style scoped>
.price-input {
  width: 80px;
}
.price-input >>> input {
  text-align: center;
}
.price-input >>> input {
  -moz-appearance: textfield;
}
.price-input >>> input::-webkit-outer-spin-button,
.price-input >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
