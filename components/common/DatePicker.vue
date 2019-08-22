<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
    >
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
  export default {
    name: "DatePicker",
    props: {
      label: {
        type: String,
        required: true
      },
      miti: {
        type: String,
        required: false
      }
    },
    mounted () {
      this.date = this.miti || new Date().toISOString().substr(0, 10)
    },
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        menu: false
      }
    }
  }
</script>
