<template>
  <div>
    <div style="width:300px; height:300px">
      {{ options }}
      <DoughnutChart
        v-if="loaded"
        :chart-data="chartData"
        :options="options"
      ></DoughnutChart>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '~/components/chart/DoughnutChart.js'

export default {
  components: { DoughnutChart },

  data: () => ({
    loaded: false,
    chartData: null,
    items: [],
    labels: ['Present', 'Absent'],
    options: null
  }),

  async mounted () {
    let json = await this.$axios.get('/daily_report/7/6');

    let data = json.data.data

    for(let i=0; i<data.length; i++) {
      this.items.push(data[i].count)
    }

    this.chartData = {
      labels: this.labels,
      datasets: [{
        labels: 'Data One',
        data: JSON.stringify(this.items),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
        ],
      }],
    }

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }],
      xAxes: [{
        gridLines: {
          display: true
        },
      }]
    }
  }
  this.loaded = true
  },

  methods: {
  }

}
</script>
