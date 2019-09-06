<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="apiDataStudents"
      v-model="selected"
      item-key="id"
      hide-default-footer
      @current-items="allStudentsList"
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
      <template
        v-slot:item.status="{ item }"
      >
        <v-checkbox
          value
          indeterminate
          class="adjust-height"
          v-model="item.selected"
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
        status: false,
        faculty: null,
        section: null,
        semester: null,
        selected: [],
        obj: {}
      }
    },
    mounted () {
      this.faculty = this.$route.params.faculty
      this.semester = this.$route.params.semester
      this.section = this.$route.params.section
      this.getData()
    },
    methods: {
      getData () {
        const url = '/attendance/'
        let self = this
        this.$axios.get(url +this.faculty + '/' + this.section + '/' + this.semester + '/')
          .then (function(response) {
            self.apiDataStudents = response.data.students
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
        // console.log(this.selected)
      },
      allStudentsList (event) {
        for(var key in event) {
          if(event[key].selected == true) {
            this.obj = {
              status: true,
              student_semester_id: event[key].student_semester_id,
              subject_id: '1'
            }
          }
          else {
            this.obj = {
              status: false,
              student_semester_id: event[key].student_semester_id,
              subject_id: '1'
            }
          }
        }
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
