import { Bar } from 'vue-chartjs'
const h1 = new Bar()
export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    h1.renderChart(this.chartdata, this.options)
  }
}
