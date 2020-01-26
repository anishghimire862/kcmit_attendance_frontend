import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data One',
      backgroundColor: '#f87979',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ],

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
