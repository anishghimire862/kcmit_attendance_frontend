<template>
  <div>
    <div style="width:300px; height:300px">
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
    this.loaded = false
    try {
      this.$axios.get('daily_report/7/66')
        .then (function(response) {
          console.log(response)
      })
      // const { userlist } = await fetch('daily_report/7/6')
      // this.chartdata = userlist
      // this.loaded = true
      // console.log(this.chartdata)
    } catch (e) {
      console.error(e)
    }
  }

}
</script>
