<template>
  <div class="right">
    <div></div>
    <me-locale-select v-if="localeConfig.localeList.length > 1" class="item"></me-locale-select>
    <me-size-select v-if="themeConfig.showSize" class="item"></me-size-select>
  </div>
</template>
<script setup lang="ts" name="Right">
import { localeConfig } from '@/config';
import { useSettingStore } from '@/store';
const { themeConfig } = useSettingStore();
</script>
<style lang="scss" scoped>
.right {
  font-size: 14px;
  height: 100%;
  display: flex;

  .item {
    height: 100%;
  }

  .item:hover {
    background-color: var(--el-fill-color);
  }

  .no-hover:hover {
    background-color: unset;
  }

  &:deep(.el-space__item) {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
