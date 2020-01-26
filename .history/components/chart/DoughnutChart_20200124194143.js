import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: [10,20,30],
  label: ['qq', 'ww', 'rr'],

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
