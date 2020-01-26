import { Line } from 'vue-chartjs'

export default Line.extend ({
  name: 'test',
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
