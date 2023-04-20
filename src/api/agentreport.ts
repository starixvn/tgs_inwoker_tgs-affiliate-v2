import { request, RequestOptions } from '@/utils/request';

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
interface IResult extends BaseResult {
  data: {
    mainitems: ISubitems[];
    subitems: ISubitems[];
    subtotal: ISubitems;
    subtotalcount: number;
  };
}

interface ContributeSubitems {
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

interface ContributeResult extends BaseResult {
  data: {
    items: ContributeSubitems[];
    total: ContributeSubitems;
    totalcount: number;
  };
}

export function agentDividends(options: RequestOptions<IResult, [BasePageParams]> = {}) {
  return request(
    (params) => ({
      url: 'agentreport/agentdividends',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, options),
  );
}

export function agentContribute(options: RequestOptions<ContributeResult, [BasePageParams]> = {}) {
  return request(
    (params) => ({
      url: 'agentreport/contributions',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, options),
  );
}
