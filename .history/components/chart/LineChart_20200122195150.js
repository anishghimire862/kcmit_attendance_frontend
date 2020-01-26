import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: 'Male',
          backgroundColor: 'red',
          data: '10'
        },
        {
          label: 'Male',
          backgroundColor: 'red',
          data: '10'
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
