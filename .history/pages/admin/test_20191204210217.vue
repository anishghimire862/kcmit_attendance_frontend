<template>
  <no-ssr>
    <div>
      <h1>Chart Demo</h1>

      <div class="grid">
        <ChartBar />
      </div>
    </div>
  </no-ssr>
</template>

<script>
import ChartBar from "@/components/ChartBar";

export default {
  components: {
    ChartBar
  }
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  row-gap: 2rem;
}
</style>
