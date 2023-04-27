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
export interface AccountChangesParams extends BasePageParams {
  transactiontype: string
  id: string
  From: string;
  To: string;
}
export interface AgentDividendsParams extends BasePageParams {
  From: string;
  To: string;
}
export interface AgentContributeParams extends BasePageParams {
  From: string;
  To: string;
}
export interface AccountChangesItems {
  amount: number;
  balance: number;
  recordedOn: string;
  transactionId: string;
  transactionType: number;
}
interface AccountChangesResult extends BaseResult {
  data: {
    items: AccountChangesItems[];
    totalcount: number;
  };
}
export interface TransactionTypeResult extends BaseResult {
  data: TransactionTypeData;
}
export interface TransactionTypeData  {
  [key: string]: string;
}
export function agentDividends(options: RequestOptions<IResult, [AgentDividendsParams]> = {}) {
  return request(
    (params) => ({
      url: 'agentreport/agentdividends',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: false }, options),
  );
}

export function agentContribute(options: RequestOptions<ContributeResult, [AgentContributeParams]> = {}) {
  return request(
    (params) => ({
      url: 'agentreport/contributions',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: false }, options),
  );
}
export function accountChangesApi(options: RequestOptions<AccountChangesResult, [AccountChangesParams]> = {}) {
  return request(
    (params) => ({
      url: 'agentreport/accountchanges',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: false }, options),
  );
}
export function getTransactionTypeApi<T extends boolean = false>(returnAxios: T = false as T, noLoading = false) {
  return request<TransactionTypeResult, [], T>(
    () => ({
      url: 'agentreport/accountchanges/transactiontypes',
      method: 'get',
    }),
    { noLoading },
    returnAxios,
  );
}
