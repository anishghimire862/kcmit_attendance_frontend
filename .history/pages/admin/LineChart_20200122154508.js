import { Line } from 'vue-chartjs'

export default {
  mixins: [Line],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
