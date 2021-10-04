<template>
  <div class="d-flex pa-7">
    <div class="flex-grow-1 mr-7">
      <v-row>
        <v-col cols="8">
          <v-text-field
            outlined
            dense
            label="Name"
            v-model="bike.name"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            dense
            label="Price"
            suffix="EUR"
            type="number"
            class="no-spin"
            v-model.number="bike.price"
          />
        </v-col>
      </v-row>
      <v-textarea
        outlined
        no-resize
        rows="3"
        height="100"
        label="Description"
        v-model="bike.description"
      />
      <v-row>
        <v-col>
          <v-text-field
            outlined
            dense
            hide-details
            label="Groupset"
            v-model="bike.groupset"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            dense
            hide-details
            label="Brakes"
            v-model="bike.brakes"
          />
        </v-col>
        <v-col>
          <v-select
            outlined
            dense
            hide-details
            label="Frame material"
            :items="frameMaterials"
            v-model="bike.frameMaterial"
          />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex flex-column justify-space-between">
      <div class="image-picker">
        <v-avatar v-if="bike.image" tile size="125">
          <v-img :src="bike.image"></v-img>
        </v-avatar>
        <v-skeleton-loader
          v-else
          dark
          type="image"
          width="125"
          height="125"
        />
        <v-text-field
          outlined
          dense
          placeholder="Image URL"
          style="width: 125px"
          v-model="bike.image"
        />
      </div>
      <v-btn light width="125" @click="$emit('submit', bike)"> {{ buttonText }} </v-btn>
    </div>
  </div>
</template>

<script>
const frameMaterials = ["Steel", "Aluminium", "Carbon"];

export default {
  name: "BikeForm",
  props: {
    buttonText: {
      type: String,
      default: "Create"
    }
  },
  data() {
    return {
      bike: {
        name: null,
        description: null,
        price: null,
        image: null,
        groupset: null,
        brakes: null,
        frameMaterial: null,
      },
      frameMaterials,
    };
  },
  methods: {
    reset() {
      Object.keys(this.bike).forEach((k) => (this.bike[k] = null));
    },
  },
};
</script>

<style lang="scss">
.image-picker {
  input {
    text-align: center;
  }

  .v-text-field {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .v-skeleton-loader {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
