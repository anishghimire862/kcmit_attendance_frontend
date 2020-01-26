import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  // data: () => ({
  //   chartdata: {
  //     labels: ['Male', 'Female', 'Total'],
  //     datasets: [{
  //       label: '# total students',
  //       data: [100,200,300],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255,99,132,1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //       ],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     },
  //     responsive: true,
  //     maintainAspectRatio: false
  //   }
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
