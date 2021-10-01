<template>
  <div class="d-inline pr-4 tag">
    <v-chip small dark>{{ name }}</v-chip>
    <v-chip small outlined>{{ value }}</v-chip>
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    name: String,
    value: String,
  }
};
</script>

<style>
.tag > .v-chip:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.tag > .v-chip:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
