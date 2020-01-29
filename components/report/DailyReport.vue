<template>
  <v-card>
    <v-toolbar flat color="#e0deda">
      <v-toolbar-title
        class="body-2"
        v-text="yesterday ? `Yesterday's Attendance Report` : `Today's Attendance Report`"
      ></v-toolbar-title>
      <v-spacer> </v-spacer>
      <a
        class="caption"
        @click="displayDoughnutChart()"
        v-text="doughnutView ? `Bar Chart` : `Doughnut Chart`"
      >
      </a>
    </v-toolbar>
    <v-tabs vertical @change="emitChange">
      <v-tab
        v-for="subject in subjects"
        :key="subject.id"
        class="caption"
      >
        <p class="text-left">
          {{ subject.subjectName }}
        </p>
      </v-tab>
      <v-tab-item
        v-for="subject in subjects" :key="subject.id"
      >
        <v-card flat>
          <v-card-text class="text-center caption grey--text">
            {{ subject.semester +''+  nth(subject.semester)+ ' semester section '+ subject.section + ' attendance taken by: ' + subject.teacherName }}
            <div
              v-if="!doughnutView"
              style="width:300px; height:300px"
            >
              <BarChart
                v-if="loaded"
                :chart-data="chartData"
                :options="options"
              ></BarChart>
              <p v-else>
                Loading...
              </p>
            </div>
            <div
              v-else
              style="width:300px; height:300px"
            >
              <DoughnutChart
                v-if="loaded"
                :chart-data="doughnutChartData"
              ></DoughnutChart>
              <p v-else>
                Loading...
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
import BarChart from '~/components/chart/BarChart.js'
import DoughnutChart from '~/components/chart/DoughnutChart.js'

export default {
  components: { BarChart, DoughnutChart },

  data: () => ({
    loaded: false,
    chartData: null,
    doughnutChartData: null,
    items: [],
    labels: ['Absent', 'Present'],
    options: null,
    subjects: [],
    yesterdaysSubjects: [],
    doughnutView: false
  }),

  props: {
    yesterday: Boolean,
    default: false
  },

  created() {
    this.getTodaysSubjects()
  },

  mounted () {
  },

  methods: {
    getTodaysSubjects () {
      let self = this
      if(!this.yesterday) {
        this.$axios.get('/todays_subjects')
          .then(function(response) {
            self.subjects = response.data.data
            self.getData()
         })
      } else {
          this.$axios.get('/yesterdays_subjects')
          .then(function(response) {
            self.subjects = response.data.data
            self.getData()
         })
      }

    },

    emitChange(value) {
      this.items = []
      this.loaded = false
      this.getData(value)
    },

    async getData (arrayIndex) {
      let subjectId = this.subjects[arrayIndex].subjectId
      let semester = this.subjects[arrayIndex].semester

      let json = null

      this.yesterday ? json = await this.$axios.get(`/yesterdays_report/${semester}/${subjectId}`) : json = await this.$axios.get(`/daily_report/${semester}/${subjectId}`)

      let data = json.data.data

      if(data.length == 1) {
        data[0].status == 1 ? this.items.unshift(0) : this.items.push(0)
      }

      for(let i=0; i<data.length; i++) {
        this.items.push(data[i].count)
      }

      !this.doughnutView ? this.renderChart() : this.displayDoughnutChart()

    },

    renderChart () {
      this.chartData = {
        labels: this.labels,
        datasets: [{
          labels: 'Data',
          data: this.items,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
        }],
      }

      this.options = {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
        xAxes: [{
          gridLines: {
            display: true
          },
        }]
      }
    }
      this.loaded = true
    },

    nth (n) {
      return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"
    },

    displayDoughnutChart () {
      this.doughnutChartData = {
        labels: this.labels,
        datasets: [{
          labels: 'Data',
          data: this.items,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
        }],
      }

      this.options = {

      }
      this.loaded = true
      this.doughnutView = !this.doughnutView
    }
  }
}
</script>
