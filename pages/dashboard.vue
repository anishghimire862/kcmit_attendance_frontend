<template>
  <div>
    <daily-report />
    <daily-report
      :yesterday="true"
      class="mt-3"
    />
    <WeeklyReport
      class="mt-3"
    />
  </div>
</template>

<script>
import DailyReport from '~/components/report/DailyReport.vue'
import WeeklyReport from '~/components/report/WeeklyReport.vue'

export default {
  components: { DailyReport, WeeklyReport },

  data: () => ({
  }),

  created() {
  },

  mounted () {
  },

  methods: {
  }
}
</script>
