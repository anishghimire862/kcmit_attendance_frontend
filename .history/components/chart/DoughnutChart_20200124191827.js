import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
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
