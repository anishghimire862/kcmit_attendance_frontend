import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  datasets: [{
    data: [10, 20, 30]
  }],

  labels: [
    'Red',
    'Yellow',
    'Blue'
  ],

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
