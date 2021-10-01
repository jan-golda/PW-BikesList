<template>
  <v-toolbar rounded dark>
    <v-btn icon @click="toggleView">
      <v-icon> mdi-view-{{ otherView }} </v-icon>
    </v-btn>
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
          class="price-input"
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
          class="price-input"
        />
      </template>
    </v-range-slider>
    <v-spacer />
    <v-btn icon @click="toggleBikeAddOpen">
      <v-icon>
        {{ bikeAddOpen ? "mdi-arrow-up-drop-circle" : "mdi-plus-circle"}}
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
];

const propertiesTypes = {
  name: "alphabetical",
  price: "numeric",
  groupset: "alphabetical",
};

export default {
  name: "BikeListControls",
  props: {
    view: String,
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
    otherView() {
      return this.view === "list" ? "grid" : "list";
    },
    otherSortDirection() {
      return this.sortDirection === "ascending" ? "descending" : "ascending";
    },
    ...mapGetters(["minBikePrice", "maxBikePrice"]),
  },
  methods: {
    toggleView() {
      this.$emit("update:view", this.otherView);
    },
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
