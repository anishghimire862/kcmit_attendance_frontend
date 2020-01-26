import { Line } from 'vue-chartjs'

export default {
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
