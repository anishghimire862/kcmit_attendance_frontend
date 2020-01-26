import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: [{
    x: 10,
    y: 20
}, {
    x: 15,
    y: 10
}]


  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
