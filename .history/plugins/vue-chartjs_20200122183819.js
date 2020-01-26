import Vue from 'vue'
import { Bar } from 'vue-chartjs'

Vue.component('v-chart', {
  extends: Bar,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
