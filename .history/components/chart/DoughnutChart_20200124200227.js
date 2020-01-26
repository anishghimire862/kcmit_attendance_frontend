import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  data: () => ({
  //   chartdata: {
  //     labels: ['Male', 'Female', 'Total'],
  //     datasets: [{
  //       data: [100,150,50 ],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //       ],
  //     }]
  //   },
  //   options: {

  //   },
  //   responsive: true,
  //   maintainAspectRatio: false
  // }),

  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
