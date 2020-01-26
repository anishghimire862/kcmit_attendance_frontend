import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female', 'Total'],
      datasets: [{
        data: [100,150,50],
      }]
    },
    options: {
    },
    responsive: true,
    maintainAspectRatio: false
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
