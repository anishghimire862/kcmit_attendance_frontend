<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="faculties"
                v-model="faculty"
                label="Select Faculty"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="semesters"
                v-model="semester"
                label="Select Semester"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="sections"
                v-model="section"
                label="Select Section"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-autocomplete
                label="Select Subject"
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
  methods: {
    submit (event) {
      event.preventDefault()
      this.redirectToAttendancePage()
    },
    redirectToAttendancePage () {
      this.$router.push('/attendance/' + this.faculty + '/' + this.semester + '/' + this.section + '/' + this.subjectId + '/')
    },
    getSubjects () {
      const url = '/subjects/'
      let self = this
      this.$axios.get(url)
        .then (function(response) {
           self.subjects = response.data.data
        })
    }
  }
}
</script>
