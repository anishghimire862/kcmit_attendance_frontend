<template>
  <div>
    <div style="width:300px; height:300px">
      ss
      {{ chartdata }}
      <DoughnutChart
        v-if="loaded"
        :chartdata="chartdata"
      ></DoughnutChart>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '~/components/chart/DoughnutChart.js'

export default {
  components: { DoughnutChart },
  data: () => ({
    loaded: false,
    chartdata: null
  }),
  async mounted () {
    // this.getData()
    this.loaded = false
    try {
      const { userlist } = await fetch('http://localhost:8001/daily_report/7/6')
      console.log(userlist)
      this.chartdata = userlist
      this.loaded = true
      console.log(this.chartdata)
    } catch (e) {
      console.error(e)
    }
  },

  methods: {
    // getData () {
    //   this.$axios.get('daily_report/7/6')
    //     .then (function(response) {
    //       let data = response.data.data
    //       let count = []
    //       for(let i=0; i<data.length; i++) {
    //         count.push(data[i].count)
    //       }
    //       console.log(count)
    //       self.chartdata = count
    //       self.loaded = true
    //     })
    //   }
  }

}
</script>
