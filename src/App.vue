<template>
  <v-app>
    <v-main>
      <v-container class="my-10" style="max-width: 1000px">
        <BikeList />
      </v-container>
    </v-main>
    <v-footer dark padless>
      <v-col class="text-center">
        Jan Gołda | Project 2 | Advanced web applications | Warsaw University of
        Technology | 2021
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import BikeList from "./components/BikeList";

export default {
  name: "App",
  components: {
    BikeList,
  },
};
</script>
