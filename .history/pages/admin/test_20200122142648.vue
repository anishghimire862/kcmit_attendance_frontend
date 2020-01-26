<template>
  <div>
    jj
    <v-chart v-if="showLine" :options="options"/>
  </div>
</template>

<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data () {

  },

  props: ['options'],
  mounted() {
    this.showLine = true
  },


}
</script>
