<template>
  <v-form ref="form" class="d-flex pa-7 pb-1">
    <div class="flex-grow-1 mr-7">
      <v-row>
        <v-col cols="8">
          <v-text-field
            outlined
            dense
            label="Name"
            v-model="bike.name"
            :rules="[rules.required]"
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
            :rules="[rules.required]"
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
        :rules="[rules.required]"
      />
      <v-row>
        <v-col>
          <v-text-field
            outlined
            dense
            label="Groupset"
            v-model="bike.groupset"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col>
          <v-text-field
            outlined
            dense
            label="Brakes"
            v-model="bike.brakes"
            :rules="[rules.required]"
          />
        </v-col>
        <v-col>
          <v-select
            outlined
            dense
            label="Frame material"
            :items="frameMaterials"
            v-model="bike.frameMaterial"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
    </div>
    <div class="d-flex flex-column justify-space-between pb-7">
      <div class="image-picker">
        <v-avatar v-if="bike.image" tile size="125">
          <v-img :src="bike.image"></v-img>
        </v-avatar>
        <v-skeleton-loader v-else type="image" width="125" height="125" />
        <v-text-field
          outlined
          dense
          placeholder="Image URL"
          style="width: 125px"
          v-model="bike.image"
          :rules="[rules.required]"
        />
      </div>
      <v-btn light width="125" @click="submit">
        {{ buttonText }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
const frameMaterials = ["Steel", "Aluminium", "Carbon"];
const rules = {
  required: (value) => !!value || "Required",
};

export default {
  name: "BikeForm",
  props: {
    buttonText: {
      type: String,
      default: "Create",
    },
    initialData: Object,
  },
  data() {
    let bike = {
      name: null,
      description: null,
      price: null,
      image: null,
      groupset: null,
      brakes: null,
      frameMaterial: null,
    };

    if (this.initialData) bike = { ...this.initialData };

    return {
      bike,
      frameMaterials,
      rules,
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.$refs.form.validate()) this.$emit("submit", this.bike);
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
