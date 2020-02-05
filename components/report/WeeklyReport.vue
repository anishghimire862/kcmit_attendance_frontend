<template>
  <v-card>
    <v-toolbar flat color="#e0deda">
      <v-toolbar-title
        class="body-2"
        v-text="'Weekly Attendance Report'"
      ></v-toolbar-title>
      <v-spacer> </v-spacer>
    </v-toolbar>
    <v-tabs
      v-if="subjects"
      vertical
      @change="emitChange"
    >
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
                v-if="loaded"
                style="width:300px; height:300px"
              >
                <LineChart
                  :chart-data="chartData"
                />
              </div>
              <div
                v-else
                align="center"
              >
                <v-img
                  :src="loadingImage"
                  aspect-ratio="1"
                  max-width="500"
                  max-height="300"
                />
              </div>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <div
      v-else
      align="center"
    >
      <v-img
        :src="noResultImage"
        aspect-ratio="1"
        max-width="500"
        max-height="300"
      />
    </div>
  </v-card>
</template>

<script>
import LineChart from '~/components/chart/LineChart.js'

export default {
  components: { LineChart },

  data: () => ({
    loaded: false,
    chartData: null,
    options: null,
    absentData: [],
    presentData: [],
    absentDays: [],
    presentDays: [],
    subjects: [],
    noResultImage: require('@/static/no_result.gif'),
    loadingImage: require('@/static/loadiing.gif'),
    mergedArray: [],
    uniqueLabels: []
  }),

  created() {
  },

  mounted () {
    this.$nextTick(() => {
      this.getWeeklySubjects()
    })
  },

  methods: {
    getWeeklySubjects () {
      let self = this
      this.$axios.get('/weekly_subjects')
        .then(function(response) {
          self.subjects = response.data.data
        })
    },

    async getData (arrayIndex) {
      let subjectId = this.subjects[arrayIndex].subjectId
      let semester = this.subjects[arrayIndex].semester

      let json =await this.$axios.get(`/weekly_report/${semester}/${subjectId}`)

      let data = json.data.data

      for(let i=0; i<data.length; i++) {
        if(i%2==0) {
          this.absentData.push(data[i].count)
          this.absentDays.push(data[i].day)
        } else {
          this.presentData.push(data[i].count)
          this.presentDays.push(data[i].day)
        }
      }

      let dataLength = data.length-1
      if(dataLength % 2 == 0 && dataLength > 1) {
        if(data[dataLength].status == 1) {
          // this.presentData.push(data[dataLength].count)
          // this.presentDays.push(data[dataLength].day)
          // this.absentData.push(0)
          // this.absentDays.push(data[dataLength].day)
        } else {
          // this.absentData.push(data[dataLength].count)
          // this.absentDays.push(data[dataLength].day)
          // this.presentData.push(0)
          // this.presentDays.push(data[dataLength].day)
        }
      }

      console.log('presentDays'+ this.presentDays)
      console.log('presentData'+ this.presentData)
      console.log('absentDays'+ this.absentDays)
      console.log('absentData'+ this.absentData)

      // this.mergedArray = [...this.presentDays, ...this.absentDays]
      // console.log()
      // this.uniqueLabels = new Set([...this.mergedArray])

      // console.log(this.presentData + ' '+ this.absentData )
      // console.log(this.presentDays + ' '+ this.absentDays )

      this.renderChart()

    },

    renderChart () {
      this.chartData = {
        labels: this.presentDays  ,
        datasets: [{
          label: 'Present',
          data: this.presentData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)'
        },
        {
          label: 'Absent',
          data: this.absentData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        }
        ]
      }
      this.loaded = true
    },

    emitChange(value) {
      this.absentData = []
      this.presentData = []
      this.absentDays = []
      this.presentDays = []
      this.loaded = false
      this.getData(value)
    },

    nth (n) {
      return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"
    },

  }
}
</script>
