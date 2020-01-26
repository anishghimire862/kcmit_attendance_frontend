<template>
  <div>
    <div style="width:300px; height:300px">
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
  mounted () {
    this.getData()
    // this.loaded = false
    // let self = this
    // try {
    //   // const { userlist } = await fetch('daily_report/7/6')
    //   // this.chartdata = userlist
    //   // this.loaded = true
    //   // console.log(this.chartdata)
    // } catch (e) {
    //   console.error(e)
    // }
  },

  methods: {
    getData () {
      this.$axios.get('daily_report/7/6')
        .then (function(response) {
          let data = response.data.data
          let count = {}
          for(i in data) {
            count.push(data[i].count)
          }
          console.log(data.data.data)
          self.chartdata = count
          self.loaded = true
        })
      }
  }

}
</script>
