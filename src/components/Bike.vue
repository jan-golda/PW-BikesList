<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between pa-3">
      <div>
        <v-card-title>
          {{ name }}
          <v-chip>{{ price }} PLN</v-chip>
        </v-card-title>
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text v-text="description"></v-card-text>
        <div class="pa-4 pt-0">
          <Tag name="Groupset" :value="groupset"/>
          <Tag name="Brakes" :value="brakes"/>
          <Tag name="Frame material" :value="frameMaterial"/>
        </div>
      </div>
      <v-avatar tile size="125">
        <v-img contain :src="image"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
import Tag from "./Tag";

export default {
  name: "Bike",
  components: {
    Tag
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    image: String,
    description: String,
    price: Number,
    groupset: String,
    brakes: String,
    frameMaterial: String,
  },
};
</script>

<style scoped></style>
