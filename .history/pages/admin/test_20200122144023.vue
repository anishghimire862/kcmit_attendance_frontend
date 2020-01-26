<template>
  <div>
    <my-line :data="lineData" :options="options">
  </div>
</template>

<script>
export default {
  asyncData () {
    const data = {} // some data
    const options = {} // some options
    return { data, options }
  }
}
</script>
