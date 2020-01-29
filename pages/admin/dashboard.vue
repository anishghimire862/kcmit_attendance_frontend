<template>
  <div>
    <daily-report />
    <daily-report
      :yesterday="true"
      class="mt-3"
    />
  </div>
</template>

<script>
import DailyReport from '~/components/report/DailyReport.vue'

export default {
  components: { DailyReport },

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
