<template>
  <el-card shadow="never" class="table">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true">
          <el-form-item>
            <el-radio-group v-model="searchForm.dateType" size="large" @change="onDateTypeChange">
              <el-radio-button label="today">{{ t('today') }}</el-radio-button>
              <el-radio-button label="yesterday">{{ t('yesterday') }}</el-radio-button>
              <el-radio-button label="thisWeek">{{ t('thisWeek') }}</el-radio-button>
              <el-radio-button label="lastWeek">{{ t('lastWeek') }}</el-radio-button>
              <el-radio-button label="thisMonth">{{ t('thisMonth') }}</el-radio-button>
              <el-radio-button label="lastMonth">{{ t('lastMonth') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="searchForm.From" type="date" size="large" />

            <el-date-picker v-model="searchForm.To" type="date" size="large" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btnsearch" size="large" @click="onSearch()">{{ t('search') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" :span-method="arraySpanMethod" :row-class-name="getRowClassName" stripe>
          <el-table-column :label="t('username')" prop="username" />
          <el-table-column :label="t('type')" prop="type" />
          <el-table-column :label="t('depositAmount')" prop="depositAmount" :formatter="formatPrice" />
          <el-table-column :label="t('withdrawalAmount')" prop="withdrawalAmount" :formatter="formatPrice" />
          <el-table-column :label="t('bonusAmount')" prop="bonusAmount" :formatter="formatPrice" />
          <el-table-column :label="t('bonusAdjustAmount')" prop="bonusAdjustAmount" :formatter="formatPrice" />
          <el-table-column :label="t('agentAdjustAmount')" prop="agentAdjustAmount" :formatter="formatPrice" />
          <el-table-column :label="t('betAmount')" prop="betAmount" :formatter="formatPrice" />
          <el-table-column :label="t('validBetAmount')" prop="validBetAmount" :formatter="formatPrice" />
          <el-table-column :label="t('turnover')" prop="turnover" :formatter="formatPrice" />
          <el-table-column :label="t('winLossAmount')" prop="winLossAmount" :formatter="formatPrice" />
          <el-table-column :label="t('netProfit')" prop="netProfit" :formatter="formatPrice" />

          <template #empty>
            {{ t('noRecord') }}
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
import { defineComponent, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { agentContribute } from '@/api/agentreport';
import type { TableColumnCtx } from 'element-plus';
import moment from 'moment';

interface ISubitems {
  agentAdjustAmount: number;
  betAmount: number;
  bonusAdjustAmount: number;
  bonusAmount: number;
  companyAdjustAmount: number;
  depositAmount: number;
  depositHandlingFee: number;
  netProfit: number;
  turnover: number;
  type: number;
  username: string;
  validBetAmount: number;
  winLossAmount: number;
  withdrawalAmount: number;
}
interface SpanMethodProps {
  row: ISubitems;
  column: TableColumnCtx<ISubitems>;
  rowIndex: number;
  columnIndex: number;
}
interface ISearchForm {
  dateType: string;
  From: string;
  To: string;
  page: number;
  rows: number;
  desc: boolean;
  sort: string;
  all: boolean;
}
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
      tableData: reactive<any[]>([]),
      totalRowCount: 0,
      searchForm: reactive<ISearchForm>({
        dateType: 'today',
        From: '',
        To: '',
        page: 1,
        rows: 10,
        desc: true,
        sort: '',
        all: false,
      }),
    };
  },
  beforeMount() {
    this.onDateTypeChange();
    this.getItems();
  },

  methods: {
    async getItems() {
      let searchForm = { ...this.searchForm };
      searchForm.From = moment(searchForm.From).add(-8, 'hours').format('YYYY-MM-DD HH:mm:ss');
      searchForm.To = moment(searchForm.To).add(1, 'days').add(-8, 'hours').format('YYYY-MM-DD HH:mm:ss');
      const response = await agentContribute();
      const result = await response.runAsync(searchForm);
      const totalPlaceholder = { username: this.t('total') + ':' };

      const total = { ...totalPlaceholder, ...result.data.total };

      this.tableData = [total, ...result.data.items];
      this.totalRowCount = result.data.totalcount;
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }: SpanMethodProps) {
      if (row.username == 'Total') {
        if (columnIndex == 0) {
          return [1, 2];
        }
        if (columnIndex == 1) {
          return [0, 0];
        }
      }
    },
    getRowClassName({ row, rowIndex }: { row: any; rowIndex: number }) {
      if (rowIndex === 1) {
        return 'empty-row';
      }
      if (row.username == 'Total') {
        return 'subtotal-row';
      }
    },
    formatPrice(row: any, column: TableColumnCtx<ISubitems>) {
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

    onDateTypeChange() {
      if (this.searchForm.dateType == 'today') {
        this.searchForm.From = moment().format('YYYY-MM-DD');
        this.searchForm.To = moment().format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'yesterday') {
        this.searchForm.From = moment().subtract(1, 'days').format('YYYY-MM-DD');
        this.searchForm.To = moment().subtract(1, 'days').format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'thisWeek') {
        this.searchForm.From = moment().startOf('week').format('YYYY-MM-DD');
        this.searchForm.To = moment().endOf('week').format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'lastWeek') {
        this.searchForm.From = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
        this.searchForm.To = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'thisMonth') {
        this.searchForm.From = moment().startOf('month').format('YYYY-MM-DD');
        this.searchForm.To = moment().endOf('month').format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'lastMonth') {
        this.searchForm.From = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
        this.searchForm.To = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'thisYear') {
        this.searchForm.From = moment().startOf('year').format('YYYY-MM-DD');
        this.searchForm.To = moment().endOf('year').format('YYYY-MM-DD');
      } else if (this.searchForm.dateType == 'lastYear') {
        this.searchForm.From = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD');
        this.searchForm.To = moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD');
      }
      this.searchForm.page = 1;
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
  margin-right: 10px;
}

.empty-row {
  background-color: #000000;
}
.subtotal-row {
  background-color: #000000;
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
