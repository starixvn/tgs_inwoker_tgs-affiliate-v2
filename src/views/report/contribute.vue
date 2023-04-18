<template>
  <el-card shadow="never" class="table">
    <me-table
      ref="meTableRef"
      :data="data?.list"
      :pagination-options="paginationOptions"
      :custom-column="customColumn"
      :loading="loading"
      :header-cell-style="{ textAlign: 'center' }"
      :cell-style="{ textAlign: 'center' }"
      stripe
    >
      <el-table-column :label="t('地址') + t(' ') + t('详情')">
        <el-table-column prop="province" :label="t('省')" />
        <el-table-column prop="city" :label="t('市')" />
        <el-table-column prop="address" :label="t('地址')" />
        <el-table-column prop="zip" :label="t('邮政编码')"> </el-table-column>
      </el-table-column>

      <template #empty>
        {{ t('空空如也') }}
      </template>
    </me-table>
  </el-card>
</template>
<script setup lang="ts" name="Table">
import { listApi } from '@/api/table';
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
  size: 10,
});
const { loading, run, data, refresh } = listApi({ defaultParams: [searchForm], manual: false });
const getData = (page = searchForm.page, size = searchForm.size) => {
  run(Object.assign(searchForm, { page, size }));
};
const paginationOptions = reactive({
  currentPage: computed(() => searchForm.page),
  pageSize: computed(() => searchForm.size),
  total: computed(() => data.value?.count ?? 0),
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
