import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],

  props: {
    chartData: {
      type: Object,
      required: false
    },
    options: {
      type: Object,
      default: null
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
