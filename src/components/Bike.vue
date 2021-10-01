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
      </div>
      <v-avatar tile size="125">
        <v-img contain :src="image"></v-img>
      </v-avatar>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Bike",
  props: {
    name: {
      type: String,
      required: true,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
};
</script>

<style scoped></style>
