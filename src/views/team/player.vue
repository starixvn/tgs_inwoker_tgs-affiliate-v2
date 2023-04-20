<template>
  <el-card shadow="never" class="table">
    <el-row>
      <div class="button-form">
        <el-select v-model="searchForm.Status" size="large" :placeholder="t('status')">
          <el-option v-for="(item, key) in statuses" :key="key" :label="t(item)" :value="item" />
        </el-select>

        <el-input placeholder="Please input" size="large" v-model="searchForm.Username" /><el-button
          type="primary"
          class="btnsearch"
          size="large"
          @click="onSearch()"
          >SEARCH</el-button
        >
      </div>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" stripe>
          <el-table-column :label="t('username')" prop="username" />
          <el-table-column :label="t('viplevel')" prop="viplevel" />
          <el-table-column :label="t('registeredtime')" prop="registeredtime" :formatter="formatDateTime" />
          <el-table-column :label="t('balance')" prop="balance" />
          <el-table-column :label="t('status')" prop="status" :formatter="formatStatus" />

          <template #empty>
            {{ t('No Record') }}
          </template>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="searchForm.page"
          v-model:page-size="searchForm.rows"
          :page-sizes="[10, 50, 200]"
          layout="sizes, prev, pager, next"
          :total="totalRowCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import type { TableColumnCtx } from 'element-plus';
import { getPlayerList, getPlayerStatuses, PlayerStatusData, PlayerData, SearchForm } from '@/api/reports';

export default defineComponent({
  name: 'MyComponent',
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },

  data() {
    return {
      showAgent: false,
      tableData: reactive<PlayerData[]>([]),
      statuses: reactive<PlayerStatusData>({}),
      totalRowCount: 0,
      searchForm: reactive<SearchForm>({
        BeginRegisteredOn: '',
        EndRegisteredOn: '',
        RegisterHost: '',
        Status: '',
        Username: '',
        VipId: '',
        page: 1,
        rows: 10,
        desc: true,
        sort: '',
        all: false,
      }),
    };
  },
  beforeMount() {
    this.getItems();
    this.getStatuses();
  },

  methods: {
    async getItems() {
      const response = await getPlayerList();
      const result = await response.runAsync(this.searchForm);
      this.tableData = result.data.items;
      this.totalRowCount = result.data.totalcount;
    },

    async getStatuses() {
      const status = await getPlayerStatuses();
      const statusResult = await status.runAsync();

      this.statuses = statusResult.data;
    },

    formatStatus(row: any, column: TableColumnCtx<PlayerData>) {
      if (this.statuses[row[column.property]]) {
        return this.t(this.statuses[row[column.property]]);
      } else {
        return '';
      }
    },

    formatDateTime(row: any, column: TableColumnCtx<PlayerData>) {
      if (row[column.property]) {
        return moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '';
      }
    },

    formatPrice(row: any, column: TableColumnCtx<PlayerData>) {
      if (!isNaN(row[column.property])) {
        let percentage = '%' as string;
        if (column.property !== 'agentDividendPercentage') {
          percentage = '';
        }
        return row[column.property].toFixed(2) + percentage;
      } else {
        return '';
      }
    },

    onSearch() {
      this.getItems();
    },

    handleSizeChange(val: number) {
      this.searchForm.rows = val;
      this.searchForm.page = 1;
      this.getItems();
    },
    handleCurrentChange(val: number) {
      this.searchForm.page = val;
      this.getItems();
    },
  },
});
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.datefrom {
  margin-left: 10px;
}
.btn {
  background: transparent;
  color: var(--el-input-border-color);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  border: none;
}
.empty-row {
  background-color: #000000;
}
.subtotal-row {
  background-color: #000000;
}

.button-form {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.table {
  .search {
    margin-bottom: -18px;

    :deep(.el-input) {
      width: 319px;
    }
  }
}
</style>
