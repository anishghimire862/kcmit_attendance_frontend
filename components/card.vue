<template>
  <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-card-title> {{ title }} </v-card-title>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    }
  }
}
</script>
