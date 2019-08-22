<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="apiDataStudents"
      hide-default-footer
    >
      <template v-slot:item.name="{ item }">
        <span
          class=""
          v-text="item.name"
        >
        </span>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar class="" size="25">
          <img src="/icon.png" />
        </v-avatar>
      </template>
      <template v-slot:item.count="{ item }">
        <v-chip
          :color="getColor(item.count)"
          dark
        >
          {{ item.count }}
        </v-chip>
      </template>
      <template
        v-slot:item.status="{ item }"
      >
        <v-checkbox
          value
          indeterminate
          class="adjust-height"
          v-model="status"
        >
        </v-checkbox>
      </template>
      <template v-slot:footer>
        <div
          class="text-right"
        >
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            @click="submitData"
          >
            Submit Attendance
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: true,
            value: 'id',
          },
          { text: 'Image', value: 'image', sortable: false },
          { text: 'Name', value: 'name', sortable: true },
          { text: 'Status', value: 'status', sortable: false }
        ],
        apiDataStudents: [],
        status: false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      clicked (event) {
        console.log(event)
      },
      getColor(count) {
        return count > 10 ? 'green' : 'red'
      },
      getData () {
        const url = '/students/'
        // for reference inside promise
        let self = this
        this.$axios.get(url)
          .then (function(response) {
            self.apiDataStudents = response.data.data
          })
      },
      submitData () {
        // const url = '/attendance/'
        // let self = this
        // this.$axios.post(url, this.editedItem)
        //   .then(function (response) {
        //     console.log('Submitted')
        //   })
        //   .catch(function (error) {
        //     console.log(error)
        //   })
        console.log(this.status)
        alert('')
      }
    }
  }
</script>
<style scoped>
  .adjust-height {
    margin-top: 5px;
    margin-bottom: -15px;
  }
</style>
