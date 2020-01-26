import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['male', 'female'],
      datasets: [{
        backgroundColor: 'red',
        borderColor: 'blue',
        borderWidth: 3,
        barPercentage: 100,
        barThickness: 100,
        maxBarThickness: 100,
        minBarLength: 2,
        data: [
          200,
          100
        ]
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
