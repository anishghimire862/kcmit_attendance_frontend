import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female', 'aa'],
      datasets: [{
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,

        data: [
          {
            label: 'Male',
            backgroundColor: 'red',
            data: '100'
          },
          {
            label: 'Female',
            backgroundColor: 'green',
            data: '200'
          },
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
