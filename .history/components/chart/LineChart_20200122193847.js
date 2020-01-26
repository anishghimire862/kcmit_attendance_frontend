import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female', 'Total', 'aa', 'vv', 'vv'],
      datasets: [{
        barPercentage: 100,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        data: [10, 20, 30, 40, 50, 60, 70]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
