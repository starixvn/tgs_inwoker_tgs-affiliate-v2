<template>
  <el-card shadow="never" class="table">
    <el-row>
      <el-col :md="18" :sm="24">
        <el-form :inline="true">
          <el-form-item>
            <el-input :placeholder="$t('playerUsername')" size="large" v-model="searchForm.Username" clearable />
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
              @click="addPlayerDialogVisible = true"
              style="float: right"
              icon="mel-icon-plus"
              >{{ $t('addPlayer') }}</el-button
            >
            <el-button type="primary" icon="mel-icon-filter" size="large" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border>
          <el-table-column :label="t('username')" prop="username" />
          <el-table-column :label="t('viplevel')" prop="viplevel" />
          <el-table-column :label="t('registeredtime')" prop="registeredtime" :formatter="formatDateTime" />
          <el-table-column :label="t('balance')" align="center">
            <template #default="scope">
              <el-popover trigger="click" placement="left" :width="200">
                <template #reference>
                  <el-button link type="primary" size="small" @click="onClickBalance(scope.row)">
                    [{{ t('viewBalance') }}]
                  </el-button>
                </template>
                <div>
                  <el-row style="margin-bottom: 0px">
                    <el-col :span="24">
                      <span class="title">{{ t('balance') }}</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 0px">
                    <el-col :span="24">
                      <el-form :label-width="80" label-position="left">
                        <el-form-item :label="t('username') + ':'" class="balance-item">
                          {{ playerBalance.username }}
                        </el-form-item>
                        <el-form-item :label="t('balance') + ':'" class="balance-item">
                          {{ playerBalance.balance }}
                        </el-form-item>
                        <el-form-item :label="t('wagering') + ':'" class="balance-item">
                          {{ playerBalance.wagering }}
                        </el-form-item>
                      </el-form>
                    </el-col>
                  </el-row>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column :label="t('status')" prop="status" :formatter="formatStatus" />

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
    <el-dialog v-model="addPlayerDialogVisible" :title="t('addPlayer')" :fullscreen="globalStore.isMobile">
      <el-form label-position="right" label-width="25%" style="width: 100%">
        <el-form-item :label="t('username')">
          <el-input size="large" :placeholder="$t('enterUsername')" v-model="addPlayerParams.username" clearable />
        </el-form-item>
        <el-form-item :label="t('password')">
          <el-input
            size="large"
            :placeholder="$t('enterPassword')"
            v-model="addPlayerParams.password"
            clearable
            type="password"
          />
        </el-form-item>
        <el-form-item :label="t('confirmPassword')">
          <el-input
            size="large"
            :placeholder="$t('reEnterPassword')"
            v-model="addPlayerParams.confirmPassword"
            clearable
            type="password"
          />
        </el-form-item>
        <el-form-item :label="t('phone')">
          <el-input size="large" v-model="addPlayerParams.phone" :placeholder="t('enterPhoneNumber')">
            <template #prepend>
              <el-select v-model="addPlayerParams.areaCode" placeholder="Select" style="width: 100px" size="large">
                <el-option label="+86" value="86" />
                <el-option label="+852" value="+852" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item :label="t('email')">
          <el-input size="large" :placeholder="$t('enterEmail')" v-model="addPlayerParams.email" clearable />
        </el-form-item>
        <div class="tnc">
          <div class="tnc-checkbox">
            <el-checkbox v-model="addPlayerParams.tnc" size="large" />
          </div>

          <div class="tnc-content">
            {{ t('registerPlayerCondition') }}
          </div>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="onAddPlayer()"
            :disabled="
              addPlayerParams.username === '' ||
              addPlayerParams.password === '' ||
              addPlayerParams.confirmPassword !== addPlayerParams.password ||
              addPlayerParams.phone === '' ||
              addPlayerParams.tnc === false
            "
          >
            {{ t('registerNow') }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import moment from 'moment';
import type { TableColumnCtx } from 'element-plus';
import {
  getPlayerList,
  getPlayerStatuses,
  PlayerStatusData,
  PlayerData,
  GetPlayerListParams,
  getPlayerBalanceApi,
  getPlayerWageringApi,
  AddPlayerParams,
  CheckConditionParams,
  AddPlayerPhoneParams,
  checkConditionApi,
  addPlayerApi,
  addPlayerPhoneApi,
} from '@/api/player';
import formatNumber from 'format-number';
import { useGlobalStore } from '@/store';
export default defineComponent({
  name: 'MyComponent',
  setup() {
    const globalStore = useGlobalStore();
    const { t } = useI18n();

    return {
      t,
      globalStore,
    };
  },

  data() {
    return {
      showAgent: false,
      tableData: reactive<PlayerData[]>([]),
      statuses: reactive<PlayerStatusData>({}),
      totalRowCount: 0,
      addPlayerDialogVisible: false,
      addPlayerParams: reactive(new AddPlayerParams()),
      playerBalance: {
        balanceVisible: false,
        username: '--',
        balance: '0.00',
        wagering: '0.00',
      },
      searchForm: reactive<GetPlayerListParams>({
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
    async onAddPlayer() {
      let param = new CheckConditionParams();
      param.username = this.addPlayerParams.username;
      param.data.areacode = this.addPlayerParams.areaCode;
      param.data.email = this.addPlayerParams.email;
      param.data.phone = this.addPlayerParams.phone;
      const res = await checkConditionApi()(param);
      if (res.data === true) {
        const resCreate = await addPlayerApi()(this.addPlayerParams);
        if (resCreate.err === 0) {
          let paramAddPhone = new AddPlayerPhoneParams();
          paramAddPhone.areaCode = this.addPlayerParams.areaCode;
          paramAddPhone.playercode = resCreate.data;
          paramAddPhone.phone = this.addPlayerParams.phone;
          const resAddPhone = await addPlayerPhoneApi()(paramAddPhone);
          if (resAddPhone.err === 0) {
            this.addPlayerDialogVisible = false;
          }
        }
      }
    },
    async onClickBalance(playerData: PlayerData) {
      this.playerBalance.wagering = '0.00';
      this.playerBalance.balance = '0.00';
      this.playerBalance.username = '--';
      const res = await getPlayerBalanceApi();
      const result = await res.runAsync(playerData.playercode);
      this.playerBalance.balance = formatNumber({ truncate: 2, padRight: 2 })(result.data);
      const res2 = await getPlayerWageringApi();
      const result2 = await res2.runAsync(playerData.playercode);
      this.playerBalance.wagering = formatNumber({ truncate: 2, padRight: 2 })(result2.data);
      this.playerBalance.username = playerData.username;
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

<style>
.balance-item {
  margin-bottom: 0px;
}
.balance-item .el-form-item__label {
  height: 25px;
  line-height: 25px;
}
.balance-item .el-form-item__content {
  height: 25px;
  line-height: 25px;
}
</style>

<style lang="scss" scoped>
.tnc {
  display: flex;
  .tnc-checkbox {
    padding-right: 16px;
    width: 25%;
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .tnc-content {
    width: 75%;
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding-right: 20px;
  }
}
.title {
  font-weight: bold;
  line-height: 30px;
}

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
