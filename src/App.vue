<template>
  <el-config-provider>
    <router-view v-slot="{ Component }">
      <me-component :is="Component" done-progress close-loading="layout"></me-component>
    </router-view>
    <set-el-globel v-if="showSetElGlobel"></set-el-globel>
  </el-config-provider>
</template>
<script setup lang="ts">
import { useGlobalStore, useSettingStore } from '@/store';
import { getLocalization, getFeatures } from '@/api/misc';
import { SizeEnum } from '@/dict/configEnum';
import SetElGlobel from './setElGlobel';
import { settingConfig } from '@/config';
const settingStore = useSettingStore();
const htmlDom = document.getElementsByTagName('html')[0];
watchEffect(() => {
  Object.entries(SizeEnum).forEach(([key, value]) => {
    htmlDom.classList.remove('me-' + value);
  });
  htmlDom.classList.add('me-' + settingStore.themeConfig.size);
});
const showSetElGlobel = ref(true);
watch(
  () => [settingStore.elLocale, settingStore.themeConfig.size],
  () => {
    showSetElGlobel.value = !showSetElGlobel.value;
    new Promise<void>((reactive) => reactive()).then(() => (showSetElGlobel.value = !showSetElGlobel.value));
  },
);

var globalStore = useGlobalStore();

function getJsonData() {
  return fetch(
    'https://app12.s3.ap-east-1.amazonaws.com/features_' +
      //get data from .env file value BRANDS
      settingConfig.brands +
      '.json',
  )
    .then((response) => response.json())
    .then((responseJson) => {
      globalStore.setFeatures(responseJson.agent || []);
    })
    .catch((error) => {
      console.error(error);
    });
}

const init = async () => {
  const res = await getLocalization()();
  globalStore.setLocalization(res.data);

  const res2 = await getFeatures(settingConfig.brands)();

  console.log(res2);
};

onMounted(() => {
  init();
});
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
