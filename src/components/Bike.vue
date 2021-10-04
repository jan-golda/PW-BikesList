<template>
  <v-card class="bike-card">
    <div class="d-flex flex-no-wrap justify-space-between pa-3">
      <div>
        <v-card-title>
          {{ name }}
          <v-chip>{{ price }} EUR</v-chip>
        </v-card-title>
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text v-text="description"></v-card-text>
        <div class="pa-4 pt-0">
          <Tag name="Groupset" :value="groupset" />
          <Tag name="Brakes" :value="brakes" />
          <Tag name="Frame material" :value="frameMaterial" />
        </div>
      </div>
      <div class="d-flex flex-column justify-space-between">
        <v-avatar tile size="125">
          <v-img contain :src="image"></v-img>
        </v-avatar>
        <div class="text-center bike-card-on-hover">
          <v-btn
            fab
            x-small
            depressed
            class="ma-1"
            @click="editMode = !editMode"
          >
            <v-icon>
              {{ editMode ? "mdi-arrow-up-drop-circle" : "mdi-pencil" }}
            </v-icon>
          </v-btn>
          <v-btn fab x-small depressed class="ma-1" @click="removeBike">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <v-expand-transition>
      <BikeForm
        v-if="editMode"
        @submit="updateBike"
        :initial-data="$props"
        button-text="Update"
        style="border-top: lightgrey 1px solid"
      />
    </v-expand-transition>
  </v-card>
</template>

<script>
import Tag from "./Tag";
import BikeForm from "./BikeForm";

export default {
  name: "Bike",
  components: {
    Tag,
    BikeForm,
  },
  data() {
    return {
      editMode: false,
    };
  },
  props: {
    id: Number,
    name: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    price: Number,
    groupset: String,
    brakes: String,
    frameMaterial: String,
  },
  methods: {
    removeBike() {
      this.$store.commit("removeBike", this.id);
    },
    updateBike(bike) {
      this.$store.commit("updateBike", { ...bike, id: this.id });
    },
  },
};
</script>

<style scoped lang="scss">
.bike-card .bike-card-on-hover {
  opacity: 0;
  transition: opacity 0.2s;
}
.bike-card:hover .bike-card-on-hover {
  opacity: 1;
}
</style>
