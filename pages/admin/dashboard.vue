<template>
  <div>
    <v-card>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title>Today's Attendance Report</v-toolbar-title>
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
              <div style="width:300px; height:300px">
                <DoughnutChart
                  v-if="loaded"
                  :chart-data="chartData"
                  :options="options"
                ></DoughnutChart>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
    </v-tabs>
  </v-card>
  </div>
</template>

<script>
import DoughnutChart from '~/components/chart/DoughnutChart.js'

export default {
  components: { DoughnutChart },

  data: () => ({
    loaded: false,
    chartData: null,
    items: [],
    labels: ['Absent', 'Present'],
    options: null,
    subjects: []
  }),

  created() {
    this.getTodaysSubjects()
  },

  mounted () {
  //   let subjectId = this.subjects[0].subjectId
  //   let semester = this.subjects[0].semester
  //   let json = await this.$axios.get(`/daily_report/${subjectId}/${semester}`);

  //   let data = json.data.data

  //   for(let i=0; i<data.length; i++) {
  //     this.items.push(data[i].count)
  //   }

  //   this.chartData = {
  //     labels: this.labels,
  //     datasets: [{
  //       labels: 'Data',
  //       data: this.items,
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)'
  //       ],
  //     }],
  //   }

  //   this.options = {
  //     legend: {
  //       display: false
  //     },
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         },
  //         gridLines: {
  //           display: false
  //         }
  //       }],
  //     xAxes: [{
  //       gridLines: {
  //         display: false
  //       },
  //     }]
  //   }
  // }
  // this.loaded = true
  },

  methods: {
    getTodaysSubjects () {
      let self = this
      this.$axios.get('/todays_subjects')
        .then(function(response) {
          self.subjects = response.data.data
          self.getData()
        })
    },

    emitChange(value) {
      this.items = []
      this.loaded = false
      this.getData(value)
    },

    async getData (arrayIndex) {
      let subjectId = this.subjects[arrayIndex].subjectId
      let semester = this.subjects[arrayIndex].semester
      let json = await this.$axios.get(`/daily_report/${semester}/${subjectId}`);

      let data = json.data.data

      if(data.length == 1) {
        data[0].status == 1 ? this.items.unshift(0) : this.items.push(0)
      }

      for(let i=0; i<data.length; i++) {
        this.items.push(data[i].count)
      }

      this.renderChart()

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
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }],
        xAxes: [{
          gridLines: {
            display: false
          },
        }]
      }
    }
      this.loaded = true
    },

    nth (n) {
      return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"
    }
  }
}
</script>
