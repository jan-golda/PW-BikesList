<template>
  <v-app>
    <v-main>
      <v-container style="max-width: 1000px">
        <BikesList />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BikesList from "./components/BikesList";

export default {
  name: "App",
  components: {
    BikesList,
  },
};
</script>
