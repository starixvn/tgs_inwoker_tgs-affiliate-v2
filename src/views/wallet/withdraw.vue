<template>
  <div>
    <div class="big-title">{{ $t('withdraw') }}</div>
    <el-row :gutter="20">
      <el-col :xl="6" :lg="6" :md="8" :sm="8" :xs="24">
        <div class="balance boxshadow"></div>
      </el-col>
      <el-col :xl="12" :lg="12" :md="8" :sm="16" :xs="24">
          <div class="sub-title">Withdraw</div>
          <el-form :model="formWithdraw" label-width="auto" label-position="left" style="margin-top:10px">
            <el-form-item :label="t('bankCard')">
              <el-select size="large" >
    
              </el-select>
            </el-form-item>
            <el-space fill>

            <el-form-item :label="t('amount')" class="withdraw-amount-item">
              <el-input size="large" :placeholder="'Enter withdraw amount'" clearable> </el-input>
            </el-form-item>
            <el-alert type="info" show-icon :closable="false" class="withdraw-amount-alert">
              <p>"Full Name" label is automatically attached to the input:</p>
            </el-alert>
          </el-space>
           


            <el-form-item :label="t('withdrawalPassword')">
              <el-input size="large" :placeholder="'Enter withdrawal password'" clearable> </el-input>
          
            </el-form-item>
            <el-button type="primary" @click="onSubmit" size="large" style="width:100%">Submit</el-button>
          </el-form>
         
 

      </el-col>
      <el-col :xl="6" :lg="6" :md="8" :sm="24" :xs="24">
        <div class="bank-details">

        </div>
      
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="24">
        <div class="sub-title">{{ $t('manageBankCard') }}</div>
      </el-col>
    </el-row>
    <el-space wrap style="margin-top:10px">
      <div  v-for="bankInfo in bankInfoList" class="bank-card boxshadow">
        <div class="bank-card-header">
          <span>{{ bankInfo.banktype }}</span>
          <el-button class="delete-btn" type="danger" icon="mel-icon-delete" circle />
        </div>
        <div class="bank-card-body">
          <div v-if="bankInfo.banktype == 'Bank'">
            <div class="text item">{{ bankInfo.detail.bankName }} - {{ bankInfo.detail.bankBranch }}</div>
            <div class="text item">{{ bankInfo.detail.name }}</div>
            <div class="text item">
              Ending in
              {{
                bankInfo.detail.bankAccount.substring(
                  bankInfo.detail.bankAccount.length - 4,
                  bankInfo.detail.bankAccount.length,
                )
              }}
            </div>
          </div>
          <div v-if="bankInfo.banktype == 'Crypto'">
            <div class="text item">Ending in {{ bankInfo.detail.address }}</div>
          </div>
        </div>
      </div>
      <div class="bank-card addnew">
        <div class="add">
          <el-button class="add-btn" type="primary" icon="mel-icon-plus" circle size="large" />
          {{ t('addBankCard') }}
        </div>
      </div>
    </el-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { bankInfoApi, IBankInfoData } from '@/api/bank';
import type { TableColumnCtx } from 'element-plus';

export default defineComponent({
  name: 'MyComponent',

  data() {
    return {
      bankInfoList: reactive<IBankInfoData[]>([]),
    };
  },
  methods: {
    async getItems() {
      const response = await bankInfoApi();
      const result = await response.runAsync();
      this.bankInfoList = result.data;
    },

    onSearch() {
      this.getItems();
    },
  },
  beforeMount() {
    this.getItems();
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
.balance {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  box-shadow: 3px 3px #c9c9c9;
}
.subtitle {
    font-weight: bold;
    font-size: 20px;
}
.withdraw-amount-item{
  margin-bottom: 0;
}
.withdraw-amount-alert{
  margin-bottom: 18px;
  height: 42px;
}
.bank-details{
  width:100%;
  height:300px;
  border:solid 2px var(--el-color-primary);
  
}
.boxshadow {
  background: rgb(181, 181, 181);
  border: solid 1px transparent;
  background: linear-gradient(146deg, rgba(181, 181, 181, 1) 0%, rgba(255, 255, 255, 1) 65%);
}
.bank-card-container {
  margin-top:10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;
  justify-content: left;
  
}
.bank-card.addnew{
  border: dashed 1px var(--el-color-primary);
}
.bank-card {
    width: 250px;
    height: 130px;
    padding: 10px;
    box-shadow: 3px 3px #c9c9c9;
    
    border-radius: 10px;

    .bank-card-header {
      font-weight: bold;
      padding: 5px 0px 10px;
      .delete-btn {
        float: right;
      }
    }
    .bank-card-body {
      .text.item {
        margin-bottom: 5px;
      }
    }
    .add {
      display: grid;
      justify-items: center;
      align-items: center;
      height: 100%;
      padding: 10px 0;
      .add-btn {
        width: 50px;
        height: 50px;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
</style>
