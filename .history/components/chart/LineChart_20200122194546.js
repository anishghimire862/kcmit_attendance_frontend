import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female', 'Total'],
      datasets: [{
        backgroundColor: 'red',
        borderColor: 'blue',
        borderWidth: 3,
        barPercentage: 100,
        barThickness: 100,
        maxBarThickness: 100,
        minBarLength: 2,
        data: [
          {x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}, 0
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
