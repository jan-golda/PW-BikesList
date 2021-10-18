<template>
  <v-toolbar rounded dark>
    <v-icon>mdi-bike</v-icon>
    <v-spacer />
    <v-btn icon @click="toggleSortDirection">
      <v-icon>
        mdi-sort-{{ propertiesTypes[sortProperty] }}-{{ sortDirection }}
      </v-icon>
    </v-btn>
    <div style="width: 150px">
      <v-select
        :items="sortableProperties"
        :value="sortProperty"
        @input="changeSortProperty"
        hide-details
        dense
        solo
      />
    </div>
    <v-spacer />
    <v-range-slider
      :value="priceRange"
      @input="changePriceRange"
      :min="minBikePrice"
      :max="maxBikePrice"
      hide-details
      class="align-center"
    >
      <template v-slot:prepend>
        <v-text-field
          :value="priceRange[0]"
          @change="changePriceRange([$event, priceRange[1]])"
          type="number"
          hide-details
          single-line
          solo
          dense
          class="price-input no-spin"
        />
      </template>
      <template v-slot:append>
        <v-text-field
          :value="priceRange[1]"
          @change="changePriceRange([priceRange[0], $event])"
          type="number"
          hide-details
          single-line
          solo
          dense
          class="price-input no-spin"
        />
      </template>
    </v-range-slider>
    <v-spacer />
    <v-btn icon @click="toggleBikeAddOpen">
      <v-icon>
        {{ bikeAddOpen ? "mdi-arrow-up-drop-circle" : "mdi-plus-circle" }}
      </v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

const sortableProperties = [
  { text: "Name", value: "name" },
  { text: "Price", value: "price" },
  { text: "Groupset", value: "groupset" },
  { text: "Brakes", value: "brakes" },
  { text: "Frame material", value: "frameMaterial" },
];

const propertiesTypes = {
  name: "alphabetical",
  price: "numeric",
  groupset: "alphabetical",
  brakes: "alphabetical",
  frameMaterial: "alphabetical",
};

export default {
  name: "BikeListControls",
  props: {
    sortDirection: String,
    sortProperty: String,
    priceRange: Array,
    bikeAddOpen: Boolean,
  },
  data() {
    return {
      sortableProperties,
      propertiesTypes,
    };
  },
  computed: {
    otherSortDirection() {
      return this.sortDirection === "ascending" ? "descending" : "ascending";
    },
    ...mapGetters(["minBikePrice", "maxBikePrice"]),
  },
  methods: {
    toggleSortDirection() {
      this.$emit("update:sortDirection", this.otherSortDirection);
    },
    changeSortProperty(value) {
      this.$emit("update:sortProperty", value);
    },
    changePriceRange(value) {
      this.$emit("update:priceRange", value);
    },
    toggleBikeAddOpen() {
      this.$emit("update:bikeAddOpen", !this.bikeAddOpen);
    },
  },
  mounted() {
    this.$emit("update:priceRange", [this.minBikePrice, this.maxBikePrice]);
  },
  watch: {
    minBikePrice(val) {
      if (val > this.priceRange[0])
        this.changePriceRange([val, this.priceRange[1]]);
    },
    maxBikePrice(val) {
      if (val < this.priceRange[1])
        this.changePriceRange([this.priceRange[0], val]);
    },
  },
};
</script>

<style lang="scss">
.price-input {
  width: 80px;

  input {
    text-align: center;
  }
}
</style>
