<template>
  <v-autocomplete
    :label="label"
    :items="items"
    v-model="name"
  ></v-autocomplete>
</template>
<script>
  export default {
    name: "AutoComplete",
    props: {
      label: {
        type: String,
        required: true
      },
      items: {
        type: Array,
        required: true
      },
      name: {
        type: String,
        required: false
      }
    }
  }
</script>
