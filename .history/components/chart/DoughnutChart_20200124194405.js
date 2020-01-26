import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  label: ['qq', 'ww', 'rr'],
  dataset: [100,200,300],
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
