<template>
  <div>
  <v-card>
    {{ isUser }}
    <v-card-text>
      <v-alert
        dense
        text
        type="success"
      >
        Please make your selection to view attendance.
      </v-alert>
      <v-form>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="faculties"
                v-model="faculty"
                label="Faculty"
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-select
                :items="semesters"
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
                item-value="subject_code"
                v-model="subjectId"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="3"
            >
              <v-dialog
                ref="dialog"
                v-model="fromModal"
                :return-value.sync="fromDate"
                persistent
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="fromDate"
                    label="From"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="fromDate" scrollable>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="fromModal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.dialog.save(fromDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col
              cols="12"
              md="3"
            >
              <v-dialog
                ref="toDialog"
                v-model="toModal"
                :return-value.sync="toDate"
                persistent
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="toDate"
                    label="To"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="toDate" scrollable>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="toModal = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.toDialog.save(toDate)">OK</v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
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
      </v-form>
    </v-card-text>
    <v-snackbar/>
  </v-card>
  <v-col v-if="loadCalendar" class="pa-0 ma-0 pt-3">
    <v-card>
      <v-card-actions>
        <v-btn
          text
          outlined
          @click="exportExcelSheet"
        >
          Export Report
        </v-btn>
      </v-card-actions>
      <v-sheet height="600">
        <v-btn
          class="ma-2"
          outlined
          color="indigo"
          v-if="showBackButton"
          @click="back"
        >
            Back
          </v-btn>
          <v-calendar
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            :type="type"
            full-width
            offset-x
            >
              <v-card
                color="grey lighten-4"
                min-width="350px"
                flat
              >
                <v-toolbar
                  :color="selectedEvent.status == 1 ? 'primary' : 'red'"
                >
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <div class="flex-grow-1"></div>
                </v-toolbar>
                <v-card-text>
                  <span>
                    <span
                      v-if="selectedEvent.status === '1'"
                    >
                      {{ selectedEvent.name }} was present on this day.
                    </span>
                    <span
                      v-else
                    >
                      {{ selectedEvent.name }} was marked as absent on this day.
                    </span>
                    <div
                      class="caption"
                    >
                      The attendance was submitted by: {{ selectedEvent.teacherName }}
                    </div>
                  </span>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="secondary"
                    @click="selectedOpen = false"
                  >
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
        </v-sheet>
      </v-card>
  </v-col>
  </div>
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
        subjectId: null,
        fromDate: new Date().toISOString().substr(0,10),
        toDate: new Date().toISOString().substr(0,10),
        fromMenu: false,
        toMenu: false,
        toModal: false,
        fromModal: false,
        events: [],
        splittedEvents: [],
        loadCalendar: false,
        focus: '',
        type: 'month',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        showBackButton: false
    }
  },
  created () {
    this.focus = this.fromDate
  },
  mounted () {
    this.getSubjects()
  },
  watch: {
    fromDate: function(val) {
      this.focus = val
    }
  },
  methods: {
    submit (event) {
      event.preventDefault()
      const url = '/attendance_sheet/'
        let self = this
        this.$axios.get(url +this.semester + '/' + this.section + '/' + this.faculty + '/' + this.subjectId + '/' + this.fromDate + '/' +  this.toDate)
          .then (function(response) {
            self.events = response.data.data
          })
      this.loadCalendar = true
    },
    exportExcelSheet () {
      let fileName = 'Excel.xlsx'
      const url = '/excel/'
        let self = this
        this.$axios.get(url +this.semester + '/' + this.section + '/' + this.faculty + '/' + this.subjectId + '/' + this.fromDate + '/' +  this.toDate)
          .then (function(response) {
            // let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats' }),
            // link = window.URL.createObjectURL(blob)
            // window.open(link)

const data = URL.createObjectURL(new Blob([response.data], {
        type: 'application/vnd.ms-excel'
    }))
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()

          })
    },
    getSubjects () {
      const url = '/subjects/'
      let self = this
      this.$axios.get(url)
        .then (function(response) {
          self.subjects = response.data.data
        })
    },
    showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
        this.showBackButton = true
      },
      back () {
        this.type = 'month'
        this.showBackButton = false
      },
      getEventColor(event) {
        return event.status == 1 ? 'primary' : 'red'
      }
  }
}
</script>
