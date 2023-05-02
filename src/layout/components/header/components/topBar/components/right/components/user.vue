<template>
  <el-dropdown class="me-size-select" trigger="click" max-height="500px">
    <div class="flex-center pointer" v-bind="$attrs">
      <span v-if="!globalStore.isMobile" class="ellipsis-2">{{ userStore.user.username }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item divided @click="userStore.logOut()">
          {{ $t('logout') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts" name="User">
import { useGlobalStore, useUserStore } from '@/store';
const userStore = useUserStore();
const globalStore = useGlobalStore();
</script>
<style lang="scss" scoped>
.flex-center {
  max-width: 120px;
  padding: 0 10px;
  line-height: 120%;

  .avatar {
    margin-right: 5px;
    flex-shrink: 0;
  }
}
</style>
