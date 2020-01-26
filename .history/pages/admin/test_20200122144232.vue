<template>
  <div>
    <my-line v-if="showLine" :data="lineData" :options="options">
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLine: false
    }
  },
  mounted () {
    this.showLine = true // showLine will only be true if on the client. This keeps the DOM-tree in sync
  },
  asyncData () {
    const data = {} // some data
    const options = {} // some options
  }
}
