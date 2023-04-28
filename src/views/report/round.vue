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
            <el-date-picker v-model="searchForm.ClosedFrom" type="date" size="large" />
            <el-date-picker v-model="searchForm.ClosedTo" type="date" size="large" />
          </el-form-item>
          <el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.Username" size="large" :placeholder="$t('username')" clearable />
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchForm.RoundId" size="large" :placeholder="$t('roundId')" clearable
            /></el-form-item>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchForm.ExternalRoundId"
              size="large"
              :placeholder="$t('externalRoundId')"
              clearable
            />
          </el-form-item>

          <el-form-item>
            <el-select v-model="searchForm.Status" size="large" :placeholder="t('status')">
              <el-option :label="t('all')" value="" />
              <el-option v-for="(item, key) in gameproviders" :key="key" :label="t(item.name)" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.Status" size="large" :placeholder="t('status')">
              <el-option :label="t('all')" value="" />
              <el-option v-for="(item, key) in statuses" :key="key" :label="t(item)" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="btnsearch" size="large" @click="onSearch()">{{ t('search') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" :row-class-name="getRowClassName" stripe>
          <el-table-column :label="t('username')" prop="username"> </el-table-column>
          <el-table-column prop="externalRoundId" :label="t('externalRoundId')" align="right" />
          <el-table-column prop="roundId" :label="t('roundId')" align="right" />
          <el-table-column prop="betTime" :label="t('betTime')" align="right" />
          <el-table-column prop="closeTime" :label="t('closeTime')" align="right" />
          <el-table-column prop="brandProvider" :label="t('brandProvider')" align="right" />
          <el-table-column prop="childBrandProvider" :label="t('childBrandProvider')" align="right" />
          <el-table-column prop="status" :label="t('status')" align="right" />
          <el-table-column prop="currency" :label="t('currency')" align="right" />
          <el-table-column prop="betAmount" :label="t('betAmount')" align="right" />
          <el-table-column prop="effectiveBet" :label="t('effectiveBet')" align="right" />
          <el-table-column prop="turnover" :label="t('turnover')" align="right" />
          <el-table-column prop="payout" :label="t('payout')" align="right" />
          <el-table-column prop="winLose" :label="t('winLose')" align="right" />

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
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { getGameProviderApi, roundReportApi } from '@/api/agentreport';
import type { TableColumnCtx } from 'element-plus';
import moment from 'moment';
interface ISubitems {
  agentAdjustAmount: number;
  agentCoveredBonus: number;
  agentCoveredBonusAdjust: number;
  agentDividendAmount?: number;
  agentDividendPercentage: number;
  betAmount: number;
  bonusAdjustAmount: number;
  bonusAmount: number;
  fromPlayerAgentDividendAmount: number;
  fromTeamAgentDividendAmount: number;
  id: string;
  netProfit: number;
  turnover: number;
  username: string;
  validBetAmount: number;
  winLossAmount: number;
}

interface SpanMethodProps {
  row: ISubitems;
  column: TableColumnCtx<ISubitems>;
  rowIndex: number;
  columnIndex: number;
}
interface ISearchForm {
  dateType: string;
  page: number;
  rows: number;
  desc: boolean;
  sort: string;
  all: false;
  Username: string;
  RoundId: string;
  ExternalRoundId: string;
  GameProviderId: string;
  Status: string;
  From: string;
  To: string;
  ClosedFrom: string;
  ClosedTo: string;
}
export default defineComponent({
  name: 'MyComponent',

  data() {
    return {
      tableData: reactive<any[]>([]),
      totalRowCount: 0,
      gameproviders: [],
      searchForm: reactive<ISearchForm>({
        dateType: 'today',
        page: 1,
        rows: 10,
        desc: true,
        sort: '',
        all: false,
        Username: '1101test',
        RoundId: '',
        ExternalRoundId: '',
        GameProviderId: '',
        Status: '',
        From: '',
        To: '',
        ClosedFrom: '2022-10-27T16:00:00.000Z',
        ClosedTo: '2023-04-28T16:00:00.000Z',
      }),
    };
  },
  methods: {
    async getGameProviderId() {
      const res = await getGameProviderApi();
      const result = await res.runAsync();
      this.gameproviders = result.data;
    },

    async getItems() {
      let searchForm = { ...this.searchForm };
      searchForm.ClosedFrom = moment(searchForm.ClosedFrom).add(-8, 'hours').format('YYYY-MM-DD HH:mm:ss');
      searchForm.ClosedTo = moment(searchForm.ClosedTo).add(1, 'days').add(-8, 'hours').format('YYYY-MM-DD HH:mm:ss');
      const response = await roundReportApi();
      const result = await response.runAsync(searchForm);

      const emptyRow = { username: 'directAgent', id: '' } as ISubitems;
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

        //return check if column.property can be .toFixed(2) or not
        return (row[column.property] as number).toFixed(2) + percentage;
      } else {
        return '';
      }
    },
    onDateTypeChange() {
      if (this.searchForm.dateType == 'today') {
        this.searchForm.ClosedFrom = moment().toISOString();

        this.searchForm.ClosedTo = moment().toISOString();
      } else if (this.searchForm.dateType == 'yesterday') {
        this.searchForm.ClosedFrom = moment().subtract(1, 'days').toISOString();
        this.searchForm.ClosedTo = moment().subtract(1, 'days').toISOString();
      } else if (this.searchForm.dateType == 'thisWeek') {
        this.searchForm.ClosedFrom = moment().startOf('week').toISOString();
        this.searchForm.ClosedTo = moment().endOf('week').toISOString();
      } else if (this.searchForm.dateType == 'lastWeek') {
        this.searchForm.ClosedFrom = moment().subtract(1, 'weeks').startOf('week').toISOString();
        this.searchForm.ClosedTo = moment().subtract(1, 'weeks').endOf('week').toISOString();
      } else if (this.searchForm.dateType == 'thisMonth') {
        this.searchForm.ClosedFrom = moment().startOf('month').toISOString();
        this.searchForm.ClosedTo = moment().endOf('month').toISOString();
      } else if (this.searchForm.dateType == 'lastMonth') {
        this.searchForm.ClosedFrom = moment().subtract(1, 'months').startOf('month').toISOString();
        this.searchForm.ClosedTo = moment().subtract(1, 'months').endOf('month').toISOString();
      } else if (this.searchForm.dateType == 'thisYear') {
        this.searchForm.ClosedFrom = moment().startOf('year').toISOString();
        this.searchForm.ClosedTo = moment().endOf('year').toISOString();
      } else if (this.searchForm.dateType == 'lastYear') {
        this.searchForm.ClosedFrom = moment().subtract(1, 'years').startOf('year').toISOString();
        this.searchForm.ClosedTo = moment().subtract(1, 'years').endOf('year').toISOString();
      }
      this.searchForm.page = 1;
    },
    onSearch() {
      this.getItems();
    },

    customRowFormatter(row: any, column: TableColumnCtx<ISubitems>) {
      if (row.username === 'directAgent') {
        return this.$t('directAgent');
      } else if (row.username === 'Total') {
        return this.$t('total');
      } else {
        return row[column.property];
      }
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
  beforeMount() {
    this.getItems();
    this.getGameProviderId();
  },
  setup() {
    const { t } = useI18n();

    return {
      t,
    };
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
.btnsearch {
  margin-left: 10px;
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
