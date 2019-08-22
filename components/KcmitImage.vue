<template>
  <div>
    <v-img
      :src="selectedImage"
      aspect-ratio="1"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      images: [
        { link: '/kcmit.jpg' },
        { link: '/kcmit1.jpeg' }
      ],
      selectedImage: ''
    }
  },
  created () {
    const id = Math.floor(Math.random() * this.images.length);
    this.selectedImage = this.images[id].link;
  }
}
</script>
