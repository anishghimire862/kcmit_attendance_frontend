import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female'],
      datasets: [
        {
          barPercentage: 10,
          label: 'Male',
          backgroundColor: 'red',
          data: '100'
        },
        {
          label: 'Female',
          backgroundColor: 'red',
          data: '200'
        }
      ]
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
