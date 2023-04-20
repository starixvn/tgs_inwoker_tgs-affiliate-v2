<template>
     <div class="big-title">{{ $t('withdraw') }}</div>
    <el-row>
        <el-col :span="6">
            <div class="balance boxshadow"  >

                </div>
        </el-col>
        <el-col :span="12">
            <div class="middle">
        <div class="subtitle">Withdraw</div>
        <div class="items">
          <div>Bank Card</div>

          <el-dropdown class="me-size-select fullwidth" trigger="click" max-height="500px">
            <div class="pointer" v-bind="$attrs" style="width: 100%">
              <div class="dropdown">123</div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item> something here </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="items">
          <div>Amount</div>
          <el-input size="large" :placeholder="'Enter withdraw amount'" clearable> </el-input>
        </div>
        <div class="items">
          <div>Withdrawal Password</div>
          <el-input size="large" :placeholder="'Enter withdrawal password'"  clearable> </el-input>
        </div>
        <div class="button">Submit</div>
      </div>
        </el-col>
        <el-col :span="6">

        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <div class="sub-title">{{ $t('manageBankCard') }}</div>
        </el-col>

    </el-row>
    <div class="bank-card-container">
        <div class="bank-card boxshadow"  v-for="bankInfo in bankInfoList">
             
             <div class="bank-card-header">
                 <span>{{bankInfo.banktype}}</span>
                 <el-button class="delete-btn" type="danger" icon="mel-icon-delete" circle />

             </div>
             <div class="bank-card-body">
                 <div v-if="bankInfo.banktype == 'Bank'">
                     <div  class="text item">{{ bankInfo.detail.bankName }} - {{ bankInfo.detail.bankBranch }}</div>
                     <div  class="text item">{{ bankInfo.detail.name }}</div>
                     <div  class="text item">Ending in {{ bankInfo.detail.bankAccount.substring(bankInfo.detail.bankAccount.length-4, bankInfo.detail.bankAccount.length) }}</div>
                 </div>
                 <div v-if="bankInfo.banktype == 'Crypto'">
                     <div  class="text item">Ending in {{ bankInfo.detail.address }} </div>
                 
                 </div>
             </div>
            
         </div>
         <div class="bank-card">
                <div class="add">
                    <el-button class="add-btn" type="primary" icon="mel-icon-plus" circle size="large" />
                    {{t("addBankCard")}}
  
                </div>
               
         
               
            </div>
        </div>

  </template>
  
  <script lang="ts" >
  import { defineComponent,ref,reactive } from 'vue'
  import { useI18n } from 'vue-i18n';
  import { bankInfoApi,IBankInfoData } from '@/api/bank'
  import type { TableColumnCtx } from 'element-plus'

  export default defineComponent({
    name: 'MyComponent',

    data() {
      return {
        bankInfoList: reactive<IBankInfoData[]>([
        ])
      };
    },
    methods: {
      async getItems (){
   
          const response = await bankInfoApi();
          const result = await response.runAsync();
          this.bankInfoList = result.data;
      },
      
      
      onSearch(){
          this.getItems();
  
      },
     
    },
    beforeMount() {
      this.getItems();
    },
    setup() {
  
  
      const { t } = useI18n();
   
  
      return {
        t
      }
  
    },
  })
  
  </script>
  
  <style lang="scss" scoped>
  .balance{
    width: 220px;
    height: 250px;
    border-radius: 20px;
    box-shadow: 3px 3px #c9c9c9;
  }
  .withdraw{
    .title{
        font-weight: bold;
    }
  }
  .boxshadow{
    background: rgb(181,181,181);
    border: solid 1px transparent;
    background: linear-gradient(146deg, rgba(181,181,181,1) 0%, rgba(255,255,255,1) 65%);
  }
  .bank-card-container{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
    justify-content: left;
    .bank-card{
    width:250px;
    height: 130px;
    padding:10px;
    box-shadow: 3px 3px #c9c9c9;
    border: dashed 1px var(--el-color-primary);
    border-radius: 10px;

   
    .bank-card-header{
        font-weight: bold;
        padding: 5px 0px 10px;
        .delete-btn{
            float: right;
        }
    }
    .bank-card-body{

        .text.item{
            margin-bottom: 5px;
        }
    }
    .add{
        display: grid;
        justify-items: center;
        align-items: center; 
        height: 100%;
        padding:10px 0;
        .add-btn{
        width:50px;
        height:50px;
        font-size: 30px;
    font-weight: bold;
    }
    }
   
  }

  }
  
  
  
  </style>
  
