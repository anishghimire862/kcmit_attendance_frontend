<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="apiDataStudents"
      v-model="status"
      item-key="id"
      hide-default-footer
      ref="att"
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
          v-model="item.status"
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
    <v-snackbar/>
  </v-card>
</template>
<script>
  export default {
    data () {
      return {
        headers: [
          { text: 'Image', value: 'image', sortable: false },
          { text: 'Name', value: 'name', sortable: true },
          { text: 'Status', value: 'status', sortable: false }
        ],
        apiDataStudents: [],
        status: false,
        faculty: null,
        section: null,
        semester: null,
        subjectId: null,
        status: [],
      }
    },
    mounted () {
      this.faculty = this.$route.params.faculty
      this.semester = this.$route.params.semester
      this.section = this.$route.params.section
      this.subjectId = this.$route.params.subject
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
        let studentsData = this.$refs.att.items
        let studentsAttendanceData = []
        for(var key in studentsData) {
          if(studentsData[key].status === false || !studentsData[key].status) {
            studentsAttendanceData.push({
              status: false,
              student_id: studentsData[key].student_id,
              student_semester_id: studentsData[key].student_semester_id,
              subject_code: this.subjectId
            })
          }
          else {
            studentsAttendanceData.push({
              status: true,
              student_id: studentsData[key].student_id || null,
              student_semester_id: studentsData[key].student_semester_id,
              subject_code: this.subjectId
            })
          }
        }
        const url = '/attendance/'
        let self = this
        this.$axios.post(url, studentsAttendanceData)
          .then(function (response) {
            self.$toast('Attendance submitted successfully.')
          })
          .catch(function (error) {
            self.$toast.error('There was an error, please try again.')
          })
      },
    }
  }
</script>
<style scoped>
  .adjust-height {
    margin-top: 5px;
    margin-bottom: -15px;
  }
</style>
