<template>
  <el-card shadow="never" class="table">
    <el-row>
      <el-col :md="18" :sm="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="searchForm.Username" :placeholder="$t('agentusername')" size="large" clearable />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.Status" size="large" :placeholder="t('status')">
              <el-option :label="t('all')" value="" />
              <el-option v-for="(item, key) in statuses" :key="key" :label="t(item)" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btnsearch" size="large" @click="onSearch()">{{ $t('search') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :md="6" :sm="24">
        <el-form :inline="true">
          <el-form-item style="margin-right: 0px; float: right">
            <el-button
              type="primary"
              class="btnsearch"
              size="large"
              style="float: right"
              icon="mel-icon-plus"
              @click="addAgentDialogVisible = true"
              >{{ $t('addagent') }}</el-button
            >
            <!-- <el-button type="primary" icon="mel-icon-filter" size="large"/> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border>
          <el-table-column :label="t('username')" prop="username" />
          <el-table-column :label="t('type')" prop="type" :formatter="translateAgentType" />
          <el-table-column :label="t('profitSharePT')" prop="dividendpercentage" />
          <el-table-column :label="t('teamnumber')" prop="teamnumber" />
          <el-table-column align="right" :label="t('balance')" prop="balance" :formatter="formatPrice" />
          <el-table-column :label="t('status')" prop="status" :formatter="formatStatus" />
          <el-table-column :label="t('setting')" align="center">
            <template #default="scope">
              <el-button type="primary" icon="mel-icon-search" size="small" @click="onViewClick(scope.row.id)" />
              <el-button type="primary" icon="mel-icon-edit" size="small" @click="onEditClick(scope.row.id)" />
            </template>
          </el-table-column>
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
    <el-dialog v-model="addAgentDialogVisible" :title="t('addagent')" :fullscreen="globalStore.isMobile">
      <el-form label-position="right" label-width="25%" style="width: 100%">
        <el-form-item :label="t('username')">
          <el-input v-model="addAgentParams.userName" size="large" :placeholder="$t('enterUsername')" clearable />
        </el-form-item>
        <el-form-item :label="t('password')">
          <el-input
            v-model="addAgentParams.password"
            size="large"
            :placeholder="$t('enterPassword')"
            clearable
            type="password"
          />
        </el-form-item>
        <el-form-item :label="t('confirmPassword')">
          <el-input
            v-model="addAgentParams.confirmPassword"
            size="large"
            :placeholder="$t('reEnterPassword')"
            clearable
            type="password"
          />
        </el-form-item>
        <el-form-item :label="t('realName')">
          <el-input v-model="addAgentParams.realname" size="large" :placeholder="$t('enterRealName')" clearable />
        </el-form-item>
        <el-form-item :label="t('profitSharePT')">
          <el-input v-model="addAgentParams.dividendPercentage" size="large" :placeholder="$t('enterProfitSharePT')">
            <template #append>%</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('remarks')">
          <el-input v-model="addAgentParams.remarks" size="large" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onRegister()">
            {{ t('registerNow') }}
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="viewAgentDialogVisible" :title="t('addagent')" width="80%" :fullscreen="globalStore.isMobile">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane :label="t('agent')" name="first">
          <el-row>
            <el-col :lg="12" :md="12" :xs="24">
              <el-form label-position="right" label-width="150px">
                <el-form-item :label="t('agentusername') + ':'">
                  {{ agentDetails.username }}
                </el-form-item>
                <el-form-item :label="t('realName') + ':'">
                  {{ agentDetails.realname }}
                </el-form-item>
                <el-form-item :label="t('registeredOn') + ':'">
                  {{ formatDateTime2(agentDetails.registeredon) }}
                </el-form-item>
                <el-form-item :label="t('balance') + ':'">
                  {{ agentDetails.balance }}
                </el-form-item>
                <el-form-item :label="t('status') + ':'">
                  {{ agentDetails.status }}
                </el-form-item>
                <el-form-item :label="t('type') + ':'">
                  {{ agentDetails.type }}
                </el-form-item>
                <el-form-item :label="t('profitSharePT') + ':'">
                  {{ agentDetails.dividendpercentage }}
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :lg="12" :md="12" :xs="24">
              <el-form label-position="right" label-width="150px">
                <el-form-item :label="t('email') + ':'">
                  {{ agentDetails.email }}
                </el-form-item>
                <el-form-item :label="t('phone') + ':'">
                  {{ agentDetails.phone }}
                </el-form-item>
                <el-form-item :label="t('password') + ':'">
                  <el-button type="primary">{{ t('resetPassword') }}</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :label="t('balanceChangeRecord')" name="second">
          <el-row style="margin-bottom: 0px">
            <el-col :span="24">
              <el-form :inline="true">
                <el-form-item>
                  <el-select
                    v-model="accountChange.searchForm.transactiontype"
                    size="large"
                    style="width: 100%"
                    :placeholder="$t('transactionType')"
                  >
                    <el-option :label="$t('all')" value="" />
                    <el-option
                      v-for="(value, propertyName) in accountChange.transactionTypeList"
                      :key="propertyName"
                      :label="$t(value)"
                      :value="propertyName"
                    />
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form :inline="true">
                <el-form-item>
                  <el-radio-group v-model="accountChange.dateType" size="large" @change="onDateTypeChange">
                    <el-radio-button label="today">{{ t('today') }}</el-radio-button>
                    <el-radio-button label="yesterday">{{ t('yesterday') }}</el-radio-button>
                    <el-radio-button label="thisWeek">{{ t('thisWeek') }}</el-radio-button>
                    <el-radio-button label="lastWeek">{{ t('lastWeek') }}</el-radio-button>
                    <el-radio-button label="thisMonth">{{ t('thisMonth') }}</el-radio-button>
                    <el-radio-button label="lastMonth">{{ t('lastMonth') }}</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-date-picker v-model="accountChange.searchForm.From" type="date" size="large" />

                  <el-date-picker v-model="accountChange.searchForm.To" type="date" size="large" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="btnsearch" size="large" @click="onSearchAccountChange()">{{
                    t('search')
                  }}</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="accountChange.tableData" stripe>
                <el-table-column
                  :label="t('time')"
                  prop="recordedOn"
                  align="center"
                  :formatter="formatAgentChangeDateTime"
                >
                </el-table-column>
                <el-table-column
                  prop="transactionType"
                  :label="t('transactionType')"
                  align="center"
                  :formatter="formatTransactionType"
                />

                <el-table-column prop="amount" :label="t('amount')" align="right" :formatter="formatPrice" />
                <el-table-column prop="balance" :label="t('balance')" align="right" :formatter="formatPrice" />

                <template #empty>
                  {{ t('noRecord') }}
                </template>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <div class="demo-pagination-block">
              <el-pagination
                v-model:current-page="accountChange.searchForm.page"
                v-model:page-size="accountChange.searchForm.rows"
                :page-sizes="[10, 50, 200]"
                layout="sizes, prev, pager, next"
                :total="accountChange.totalRowCount"
                @size-change="handleAccountChangeSizeChange"
                @current-change="handleAccountChangeCurrentChange"
              />
            </div>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import { useGlobalStore } from '@/store';
import type { TableColumnCtx } from 'element-plus';
import {
  getAgentList,
  getAgentStatusesApi,
  AgentStatusesData,
  GetAgentListParams,
  AgentData,
  getAgentDetailsApi,
  AgentDetailsData,
} from '@/api/reports';
import {
  accountChangesApi,
  AccountChangesItems,
  AccountChangesParams,
  getTransactionTypeApi,
  TransactionTypeData,
} from '@/api/agentreport';
import { AddAgentParams, addAgentApi } from '@/api/agent';

export default defineComponent({
  name: 'MyComponent',
  setup() {
    const { t } = useI18n();
    const globalStore = useGlobalStore();
    return {
      t,
      globalStore,
    };
  },

  data() {
    return {
      accountChange: {
        tableData: reactive<AccountChangesItems[]>([]),
        transactionTypeList: reactive<TransactionTypeData>({}),
        totalRowCount: 0,
        searchForm: reactive<AccountChangesParams>({
          From: '',
          To: '',
          page: 1,
          rows: 10,
          desc: true,
          sort: 'recordedOn',
          all: false,
          transactiontype: '',
          id: '',
        }),
        dateType: 'today',
      },
      showAgent: false,
      tableData: reactive<AgentData[]>([]),
      statuses: reactive<AgentStatusesData>({}),
      totalRowCount: 0,
      activeName: 'first',
      addAgentDialogVisible: false,
      viewAgentDialogVisible: false,
      agentDetails: reactive<AgentDetailsData>({
        accumulatedprofitsharing: 0,
        agentdividendtype: '',
        agentdomains: '',
        agentlevel: 0,
        brandUrl: '',
        dividendconditions: '',
        email: '',
        invitationCode: '',
        issetpaypassword: false,
        parentusername: '',
        phone: '',
        playernumber: 0,
        qq: '',
        realname: '',
        wechat: '',
        agentstatus: '',
        balance: 0,
        cardgamerebatepercentage: 0,
        commissionpercentage: 0,
        dividendpercentage: 0,
        id: '',
        leveltype: '',
        livedealerrebatepercentage: 0,
        lotteryrebatepercentage: 0,
        registeredon: '',
        slotrebatepercentage: 0,
        sportsrebatepercentage: 0,
        status: '',
        teamnumber: 1,
        type: '',
        username: '',
        virtualsportsrebatepercentage: 0,
      }),
      addAgentParams: reactive(new AddAgentParams()),
      searchForm: reactive<GetAgentListParams>({
        page: 1,
        rows: 10,
        desc: false,
        sort: '',
        all: false,
        Status: '',
        Username: '',
      }),
    };
  },
  beforeMount() {
    this.getItems();
    this.getStatuses();
    this.onDateTypeChange();
    this.getTransactionType();
  },

  methods: {
    async getItems() {
      const response = await getAgentList();
      const result = await response.runAsync(this.searchForm);
      this.tableData = [...result.data.items];
      this.totalRowCount = result.data.totalCount;
    },

    async getStatuses() {
      const status = await getAgentStatusesApi();
      const statusResult = await status.runAsync();

      this.statuses = statusResult.data;
    },
    async getTransactionType() {
      const response = await getTransactionTypeApi();
      const result = await response.runAsync();
      this.accountChange.transactionTypeList = result.data;
    },
    formatStatus(row: any, column: TableColumnCtx<AgentData>) {
      return this.t(row[column.property]);
    },

    translateAgentType(row: any, column: TableColumnCtx<AgentData>) {
      return this.t(row[column.property]);
    },
    formatDateTime(row: any, column: TableColumnCtx<AgentData>) {
      return this.formatDateTime2(row[column.property]);
    },
    formatAgentChangeDateTime(row: any, column: TableColumnCtx<AccountChangesItems>) {
      return this.formatDateTime2(row[column.property]);
    },
    formatTransactionType(row: any, column: TableColumnCtx<AccountChangesItems>) {
      const transactionType = this.accountChange.transactionTypeList[row[column.property]];
      return this.$t(transactionType.toString());
    },
    formatDateTime2(value: string) {
      return moment(value).format('YYYY-MM-DD HH:mm:ss');
    },
    formatPrice(row: any, column: TableColumnCtx<AgentData>) {
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
    onDateTypeChange() {
      if (this.accountChange.dateType == 'today') {
        this.accountChange.searchForm.From = moment().format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'yesterday') {
        this.accountChange.searchForm.From = moment().subtract(1, 'days').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().subtract(1, 'days').format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'thisWeek') {
        this.accountChange.searchForm.From = moment().startOf('week').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().endOf('week').format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'lastWeek') {
        this.accountChange.searchForm.From = moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'thisMonth') {
        this.accountChange.searchForm.From = moment().startOf('month').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().endOf('month').format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'lastMonth') {
        this.accountChange.searchForm.From = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'thisYear') {
        this.accountChange.searchForm.From = moment().startOf('year').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().endOf('year').format('YYYY-MM-DD');
      } else if (this.accountChange.dateType == 'lastYear') {
        this.accountChange.searchForm.From = moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD');
        this.accountChange.searchForm.To = moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD');
      }
      this.accountChange.searchForm.page = 1;
      //this.getItems();
    },
    onStatusChange(value: string) {
      this.searchForm.Status = value;
    },
    onSearch() {
      this.getItems();
    },
    onSearchAccountChange() {
      this.getAccountChange();
    },
    async onViewClick(id: string) {
      const response = await getAgentDetailsApi();
      const result = await response.runAsync(id);
      this.agentDetails = result.data;
      this.viewAgentDialogVisible = true;
    },
    onEditClick(id: string) {
      return '';
    },
    async onRegister() {
      const res = await addAgentApi()(this.addAgentParams);
      this.getItems();
      this.resetAddAgent();
      this.addAgentDialogVisible = false;
    },
    resetAddAgent() {
      this.addAgentParams = new AddAgentParams();
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
    handleAccountChangeSizeChange(val: number) {
      this.accountChange.searchForm.rows = val;
      this.accountChange.searchForm.page = 1;
      this.getAccountChange();
    },
    handleAccountChangeCurrentChange(val: number) {
      this.accountChange.searchForm.page = val;
      this.getAccountChange();
    },
    async getAccountChange() {
      this.accountChange.searchForm.id = this.agentDetails.id;
      let searchForm = { ...this.accountChange.searchForm };
      searchForm.From = moment(searchForm.From).add(-8, 'hours').format('YYYY-MM-DD HH:mm:ss');

      searchForm.To = moment(searchForm.To).add(1, 'days').add(-8, 'hours').format('YYYY-MM-DD HH:mm:ss');
      const response = await accountChangesApi();
      const result = await response.runAsync(searchForm);
      this.accountChange.tableData = result.data.items;
      console.log(this.accountChange.tableData);
      this.accountChange.totalRowCount = result.data.totalcount;
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
