import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female', 'Total'],
      datasets: [
        {
          label: 'Male',
          backgroundColor: '#f87979',
          data: [50]
        },
        {
          label: 'Female',
          backgroundColor: '#f87979',
          data: [50]
        },
        {
          label: 'Total',
          backgroundColor: '#f87979',
          data: [100]
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
