import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  chartdata: {
    labels: ['Male', 'Female', 'Total'],
    datasets: [{
      data: [100,200,300],
    }]
  },

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
