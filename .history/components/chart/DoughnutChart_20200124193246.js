import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data: [10,23, 30],

  labels: [
    'Red',
    'Yellow',
    'Blue'
  ],

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
