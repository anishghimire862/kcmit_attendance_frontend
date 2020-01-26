<template>
  <v-card>
    <v-card-text>
      <v-alert
        dense
        text
        type="success"
      >
        Please make your selection in order to take attendance.
      </v-alert>

      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="computeFaculty"
                v-model="faculty"
                label="Faculty"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="computeSemester"
                v-model="semester"
                label="Semester"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="sections"
                v-model="section"
                label="Section"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-autocomplete
                label="Subject"
                :items="subjects"
                item-text="subject_name"
                item-value="id"
                v-model="subjectId"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div
                class="text-right"
              >
                <v-btn
                  class="ma-2"
                  outlined
                  color="indigo"
                  @click="submit($event)"
                >
                  Submit
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-snackbar/>
  </v-card>
</template>
<script>
import AutoComplete from "~/components/common/AutoComplete.vue"
export default {
  components: {
    AutoComplete
  },
  data () {
    return {
        semesters: [1,2,3,4,5,6,7,8],
        semester: null,
        sections: ['A', 'B'],
        section: null,
        faculties: ['BIM', 'BBA', 'BCA'],
        faculty: null,
        subjects: [],
        subjectId: ''
    }
  },

  mounted () {
    this.getSubjects()
  },

  computed: {
    filterSemester() {
      return this.genericFilter('semester', this.semesters)
    },
    filterFaculty() {
      return this.genericFilter('faculty', this.faculties)
    },

  },

  methods: {
    genericFilter(fieldName, existingArray) {
      let arrayToBePopulate = []
      this.subjects.map(x => {
        if(fieldName === 'semester')
          arrayToBePopulate.push(x.semester)
        if(fieldName === 'faculty')
          arrayToBePopulate.push(x.faculty)
      })

      let removeDublicates = [...new Set(arrayToBePopulate)]

      let mappedData = removeDublicates.map(x => {
        let filteredData = existingArray.filter(y =>  x == y)
        return filteredData
      })

      return mappedData
    },

    filterSubjects() {
      let selectedSemester = this.semester
      let selectedFaculty = this.faculty

      console.log(selectedSemester, selectedFaculty)
    },

    submit (event) {
      event.preventDefault()
      this.redirectToAttendancePage()
    },

    redirectToAttendancePage () {
      this.$router.push('/attendance/' + this.faculty + '/' + this.section + '/' + this.semester + '/' + this.subjectId + '/')
    },

    getSubjects () {
      const teacherId = this.getLoggedInUserId()
      const url = '/teacher_subjects/' +teacherId
      let self = this
      this.$axios.get(url)
        .then (function(response) {
           self.subjects = response.data.data
        })

      this.filterSubjects()
    },

    getLoggedInUserId () {
      return this.$auth.user.data[0].id
    }

  }
}
</script>
