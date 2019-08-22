<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md=4
            >
              <v-select
                :items="faculties"
                v-model="faculty"
                label="Select Faculty"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-select
                :items="semesters"
                v-model="semester"
                label="Select Semester"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-select
                :items="sections"
                v-model="section"
                label="Select Section"
              ></v-select>
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
  </v-card>
</template>
<script>
export default {
  data () {
    return {
        semesters: [1,2,3,4,5,6,7,8],
        semester: null,
        sections: ['A', 'B'],
        section: null,
        faculties: ['BIM', 'BBA', 'BCA'],
        faculty: null,
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      this.getStudents()
    },
    getStudents () {
        this.$router.push({ path: '/attendant/', query: {faculty: this.faculty, semester: this.semester, section: this.section} })
      }
  }
}
</script>
