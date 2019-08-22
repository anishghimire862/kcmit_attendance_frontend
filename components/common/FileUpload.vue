<template>
  <div class="py-3">
    <v-layout>
      <v-flex>
        <v-btn @click="$refs.file.click()">
          Upload Image
        </v-btn>
      </v-flex>
      <v-flex
        text-truncate
        ma-auto
      >
        <p v-if="fileName">
          {{ fileName }}
        </p>
        <p v-else>
          {{ imageName }}
        </p>
      </v-flex>
    </v-layout>
    <input
      ref="file"
      type="file"
      class="hidden-lg-and-down"
      @change="sendPreview"
    >
  </div>
</template>
<script>
export default {
  name: "FileUpload",
  props: {
    urlLink: {
      type: String,
      required: true
    },
    imageName: {
      type: String
    }
  },
  data: function () {
    return {
      fileName: ''
    }
  },
  methods: {
    sendPreview: function (event) {
      let file = event.target.files[0]
      this.fileName = file.name
      this.imageName = file.name
      this.$emit('preview', file)
    }
  }
}
</script>
