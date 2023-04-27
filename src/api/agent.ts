import request from '@/utils/request';


// 登录
export class AddAgentParams {
  userName = '';
  password = '';
  confirmPassword = '';
  realname = '';
  phone = '';
  email = '';
  remarks = '';
  cardGameRebatePercentage = 0;
  dividendPercentage = 0;
  liveDealerRebatePercentage = 0;
  lotteryRebatePercentage = 0;
  slotRebatePercentage = 0;
  sportsRebatePercentage = 0;
  virtualSportsRebatePercentage = 0;
}
export interface AddAgentData{
  agentId: string;
  isNew: boolean;
  message: string;
}
export interface AddAgentResult extends BaseResult {
  data: AddAgentData
}
export function addAgentApi<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<AddAgentResult, [AddAgentParams], T>(
    (params) => ({
      url: "agent/create",
      method: 'post',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

