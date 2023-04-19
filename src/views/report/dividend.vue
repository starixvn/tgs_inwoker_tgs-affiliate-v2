<template>
  <el-card shadow="never" class="table">
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
  </el-card>
</template>
<script lang="ts">
import { defineComponent,ref,reactive } from 'vue'
import { useI18n } from 'vue-i18n';
import { agentDividends } from '@/api/agentreport'
import type { TableColumnCtx } from 'element-plus'
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
export default defineComponent({
  name: 'MyComponent',
 
  data() {
    return {
      tableData: reactive<any[]>([
      ]),
      searchForm: reactive<any>({
        From:'2023-04-01T16:00:00.000Z',
        To:'2023-04-16T16:00:00.000Z',
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
        const data = await response.runAsync(this.searchForm);
        const emptyRow = {username:"Direct Agent", id: ""} as ISubitems;
        this.tableData = [...data?.mainitems ,...[emptyRow], ...data?.subitems];

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
    },
    getRowClassName(row: any) {

      if (row.rowIndex === 1) {
        return 'empty-row';
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
.table {
  .search {
    margin-bottom: -18px;

    :deep(.el-input) {
      width: 319px;
    }
  }
  .el-table tr.empty-row{
    background-color: #000000;

  }

}

</style>
