import { request, RequestOptions } from '@/utils/request';

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

export type Result = BaseResult<{
  mainitems: {};
  subitems: ISubitems[];
  subtotal: {
    agentAdjustAmount: number;
    agentCoveredBonus: number;
    agentCoveredBonusAdjust: number;
    agentDividendAmount: number;
    betAmount: number;
    bonusAdjustAmount: number;
    bonusAmount: number;
    fromPlayerAgentDividendAmount: number;
    fromTeamAgentDividendAmount: number;
    netProfit: number;
    turnover: number;
    validBetAmount: number;
    winLossAmount: number;
  };
  subtotalcount: number
}>;
export function agentDividends(options: RequestOptions<Result, [BasePageParams]> = {}) {
  return request(
    (params) => ({
      url: "agentreport/agentdividends",
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, options),
  );
}
