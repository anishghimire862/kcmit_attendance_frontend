import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
