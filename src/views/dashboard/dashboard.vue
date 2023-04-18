<template>
  <div class="dashboard">
    <div class="title-holder">
      <div class="title">Welcome back!</div>
      <div class="subtitle">username here</div>
    </div>
    <total-panel></total-panel>
  </div>
</template>

<script setup lang="ts">
import TotalPanel from './components/totalPanel.vue';
import Charts from './components/charts.vue';
</script>
<style lang="scss" scoped>
.dashboard {
  padding: 100px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media only screen and (max-width: 500px) {
    padding: 20px;
  }
}

.title-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
}

.subtitle {
  font-size: 20px;
}
</style>
