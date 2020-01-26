import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Male', 'Female', 'aa'],
      barPercentage: 0.5,
      barThickness: 6,
      maxBarThickness: 8,
      minBarLength: 2,
      datasets: [
        // {
        //   label: 'Male',
        //   backgroundColor: 'red',
        //   data: '100'
        // },
        // {
        //   label: 'Female',
        //   backgroundColor: 'green',
        //   data: '200'
        // },
        {
        data: [10, 20, 30]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
