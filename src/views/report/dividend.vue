<template>
  <el-card shadow="never" class="table">
    <el-row>
      <el-col :span="24">
        <div>
          <el-radio-group v-model="searchForm.dateType" size="large">
            
            <el-radio-button label="1" >Today</el-radio-button> 
            <el-radio-button label="2" >Yesterday</el-radio-button> 
            <el-radio-button label="3" >This Week</el-radio-button> 
            <el-radio-button label="4" >Last Week</el-radio-button> 
            <el-radio-button label="5" >This Month</el-radio-button> 
            <el-radio-button label="6" >Last Month</el-radio-button> 
            <div  class="datefrom">
              <el-date-picker
             
             v-model="searchForm.From"
             type="date"

             size="large"
           />
           <el-date-picker
             v-model="searchForm.To"
             type="date"

             size="large"
           />
            </div>
            <el-button type="primary" class="btnsearch" size="large" @click="onSearch()">SEARCH</el-button>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      :row-class-name="getRowClassName"
      stripe
    > 
      <el-table-column :label="t('agent')" prop="username">
       
      </el-table-column>

      <el-table-column prop="agentDividendPercentage" :label="t('p/t')" align="right" :formatter="formatPrice"/>
      <el-table-column :label="t('bonus')" >
        <el-table-column prop="bonusAmount" :label="t('total')" align="right" :formatter="formatPrice"/>
        <el-table-column prop="agentCoveredBonus" :label="t('agent')" align="right" :formatter="formatPrice"> </el-table-column>

      </el-table-column> 
    
      <el-table-column :label="t('bonusAdjust')" >
        <el-table-column prop="bonusAdjustAmount" :label="t('total')" align="right" :formatter="formatPrice"/>
        <el-table-column prop="agentCoveredBonusAdjust" :label="t('agent')" align="right" :formatter="formatPrice"> </el-table-column>

      </el-table-column> 
      <el-table-column prop="betAmount" :label="t('betAmount')" align="right" :formatter="formatPrice"/>
      <el-table-column prop="validBetAmount" :label="t('validBet')" align="right" :formatter="formatPrice"/>
      <el-table-column prop="winLossAmount" :label="t('winloss')" align="right" :formatter="formatPrice"/>
      <el-table-column prop="netProfit" :label="t('netProfit')" align="right" :formatter="formatPrice"/>
      <el-table-column :label="t('contribution')" >
        <el-table-column prop="fromPlayerAgentDividendAmount" :label="t('player')" align="right" :formatter="formatPrice"/>
        <el-table-column prop="fromTeamAgentDividendAmount" :label="t('team')" align="right" :formatter="formatPrice"> </el-table-column>

      </el-table-column> 
      <el-table-column prop="agentAdjustAmount" :label="t('agentAdjustAmount')" align="right" :formatter="formatPrice"/>
      <el-table-column prop="agentDividendAmount" :label="t('agentDividendAmount')" align="right" :formatter="formatPrice"/>
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
import { defineComponent,ref,reactive } from 'vue'
import { useI18n } from 'vue-i18n';
import { agentDividends } from '@/api/agentreport'
import type { TableColumnCtx } from 'element-plus'
import { number } from '@intlify/core-base';
interface ISubitems {
  agentAdjustAmount: number
  agentCoveredBonus: number
  agentCoveredBonusAdjust: number
  agentDividendAmount?: number
  agentDividendPercentage: number
  betAmount: number
  bonusAdjustAmount: number
  bonusAmount: number
  fromPlayerAgentDividendAmount: number
  fromTeamAgentDividendAmount: number
  id: string
  netProfit: number
  turnover: number
  username: string
  validBetAmount: number
  winLossAmount: number
}
interface SpanMethodProps {
  row: ISubitems
  column: TableColumnCtx<ISubitems>
  rowIndex: number
  columnIndex: number
}
interface ISearchForm {
        dateType:string
        From:string
        To:string
        page:number
        rows:number
        desc:boolean
        sort:string
        all:boolean
}
export default defineComponent({
  name: 'MyComponent',
 
  data() {
    return {
      tableData: reactive<any[]>([
      ]),
      totalRowCount:0,
      searchForm: reactive<ISearchForm>({
        dateType:"1",
        From:'2023-04-01',
        To:'2023-04-16',
        page:1,
        rows:10,
        desc:true,
        sort:'',
        all:false
      })
    };
  },
  methods: {
    async getItems (){
 
        const response = await agentDividends();
        const result = await response.runAsync(this.searchForm);

        const emptyRow = {username:"Direct Agent", id: ""} as ISubitems;
        const subtotalRow = result.data.subtotal;
        subtotalRow.username = "Total";
        this.tableData = [...result.data.mainitems ,...[emptyRow], ...result.data.subitems, ...[subtotalRow]];
        this.totalRowCount = result.data.subtotalcount;

    },
    arraySpanMethod  ({
      row,
      column,
      rowIndex,
      columnIndex,
    }: SpanMethodProps) {
        if (rowIndex === 1) {
          return [1, 12]
        }
     
        if(row.username == 'Total'){

          if(columnIndex == 0){

            return [1, 2]
          }
          if(columnIndex == 1){

          return [0, 0]
          }

        }
    },
    getRowClassName({ row, rowIndex }: { row: any; rowIndex: number }) {

      if (rowIndex === 1) {
        return 'empty-row';
      } 
      if(row.username == "Total"){
        return 'subtotal-row';

      }
    },
    formatPrice(row: any, column: TableColumnCtx<ISubitems>) {
      if(!isNaN(row[column.property])){
        let percentage = "%" as string;
        if(column.property !== 'agentDividendPercentage'){

          percentage = '';
        }
        return row[column.property].toFixed(2) + percentage;
      }else{
        return "";
      }
      
    },
    onSearch(){
        this.getItems();

    },
    handleSizeChange(val: number){
      this.searchForm.rows = val;
      this.searchForm.page = 1;
      this.getItems();
    },
    handleCurrentChange(val: number){
      this.searchForm.page = val;
      this.getItems();
    }
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
.el-row {
  margin-bottom: 20px;
}
.datefrom{
  margin-left: 10px;
}
.btnsearch{
  margin-left: 10px;
}
.empty-row{
    background-color: #000000;

  }
.subtotal-row{
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
