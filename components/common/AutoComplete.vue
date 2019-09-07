<template>
  <v-autocomplete
    :label="autoCompleteLabel"
    :items="modelItems"
    :item-text="autoCompleteText"
    :item-value="itemValue"
    v-model="modelName"
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
      },
      itemText: {
        type: String,
        required: false
      },
      itemValue: {
        type: String,
        required: false
      }
    },
    data () {
      return {
        autoCompleteLabel: '',
        autoCompleteItems: [],
        autoCompleteName: '',
        autoCompleteText: '',
      }
    },
    computed: {
      modelName () {
        this.autoCompleteName = this.name
        return this.autoCompleteName
      },
      modelItems () {
        this.autoCompleteItems = this.items
        return this.autoCompleteItems
      }
    },
    mounted () {
      this.autoCompleteLabel = this.label
      this.autoCompleteText = this.itemText
    },
    methods: {
    }
  }
</script>
