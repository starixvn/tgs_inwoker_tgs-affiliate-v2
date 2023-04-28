<template>
  <div class="total-panel">
    <el-row :gutter="30">
      <el-col v-for="(item, index) in list" :key="index" :xs="12" :sm="12" :lg="6">
        <div class="card" @click="navigateTo(item.path)">
          <div class="card-icon">
            <img :src="getImgUrl(item.title)" style="width: 50%" />
          </div>
          <div>
            {{ t(item.title) }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { useLocalesI18n } from '@/locales/i18n';
import { router } from '@/router';

let { t } = useLocalesI18n({}, [(locale) => import(`../lang/${locale}.json`), 'dashboard']);

function getImgUrl(pic: string) {
  return 'src/assets/images/' + pic + '.svg';
}

function navigateTo(path: string) {
  console.log(path);
  router.push(path);
}

const list = reactive([
  {
    title: 'addagent',
    icon: 'mel-icon-platform',
    path: '/team/agent',
  },
  {
    title: 'addplayer',
    icon: 'mel-icon-user-filled',
    path: '/team/player',
  },
  {
    title: 'dashboard',
    icon: 'mel-icon-user-filled',
    path: '/dashboard',
  },
  {
    title: 'changepassword',
    icon: 'mel-icon-user-filled',
    path: '/account/index',
  },
  {
    title: 'wallet',
    icon: 'mel-icon-user-filled',
    path: '/wallet/withdraw',
  },
  {
    title: 'referrallink',
    icon: 'mel-icon-user-filled',
    path: '/dashboard',
  },
  {
    title: 'winlossreport',
    icon: 'mel-icon-user-filled',
    path: '/report/round',
  },
  {
    title: 'helpcenter',
    icon: 'mel-icon-user-filled',
    path: '/helpcenter/index',
  },
]);
</script>
<style lang="scss" scoped>
.card {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 9px 18px rgba(0, 0, 0, 0.1), 0 15px 12px rgba(0, 0, 0, 0.02);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #07b5bc;
    color: #fff;
  }
}

.card-icon {
  height: 100px;
  width: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
