import { request, RequestOptions } from '@/utils/request';

export interface ISubitems {
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
interface IResult extends BaseResult {
  data:{  
    mainitems: ISubitems[];
    subitems: ISubitems[];
    subtotal: ISubitems;
    subtotalcount: number
  }
}

export function agentDividends(options: RequestOptions<IResult, [BasePageParams]> = {}) {
  return request(
    (params) => ({
      url: "agentreport/agentdividends",
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, 
      options),
  );
}
