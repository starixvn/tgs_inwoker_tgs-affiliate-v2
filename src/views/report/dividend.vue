<template>
  <el-card shadow="never" class="table">
    <me-table
      ref="meTableRef"
      :data="data"
      :pagination-options="paginationOptions"
      :custom-column="customColumn"
      :loading="loading"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      stripe
    >
      <el-table-column :label="t('agent')">
       
      </el-table-column>

      <el-table-column prop="province" :label="t('p/t')" />
      <el-table-column :label="t('bonus')" >
        <el-table-column prop="Total" :label="t('total')" />
        <el-table-column prop="Agent" :label="t('agent')"> </el-table-column>

      </el-table-column> 
    
      <el-table-column :label="t('bonusAdjust')" >
        <el-table-column prop="Total" :label="t('total')" />
        <el-table-column prop="Agent" :label="t('agent')"> </el-table-column>

      </el-table-column> 
      <el-table-column prop="province" :label="t('betAmount')" />
      <el-table-column prop="province" :label="t('validBet')" />
      <el-table-column prop="province" :label="t('winloss')" />
      <el-table-column prop="province" :label="t('netProfit')" />
      <el-table-column :label="t('contribution')" >
        <el-table-column prop="Total" :label="t('player')" />
        <el-table-column prop="Agent" :label="t('team')"> </el-table-column>

      </el-table-column> 
      <el-table-column prop="province" :label="t('agentAdjust')" />
      <template #empty>
        {{ t('空空如也') }}
      </template>
    </me-table>
  </el-card>
</template>
<script setup lang="ts" name="Table">
import { agentDividends } from '@/api/agentreport';
import { useLocalesI18n } from '@/locales/i18n';
import { FormInstance } from 'element-plus';
const meTableRef = ref<MeTableInstance>();
const customColumn = ref(true);
const { t } = useLocalesI18n({}, [(locale: string) => import(`./lang/${locale}.json`), 'tableLang']);
const canDel = ref(true);
const searchForm = reactive({
  search: '',
  name: '',
  type: undefined,
  date: '',
  address: '',
  zip: '',
  page: 1,
  rows: 10,
});
const { loading, run, data, refresh } = agentDividends({ defaultParams: [searchForm], manual: false });
const getData = (page = searchForm.page, size = searchForm.rows) => {
  run(Object.assign(searchForm, { page, size }));
};
const paginationOptions = reactive({
  currentPage: computed(() => searchForm.page),
  pageSize: computed(() => searchForm.rows),
  tota:100,
  // total: computed(() => data.value?.count ?? 0),
  layout: 'sizes, prev, pager, next, jumper, ->, total',
  change: getData,
});
</script>
<style lang="scss" scoped>
.table {
  .search {
    margin-bottom: -18px;

    :deep(.el-input) {
      width: 319px;
    }
  }
}
</style>
