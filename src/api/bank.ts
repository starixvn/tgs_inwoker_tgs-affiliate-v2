import request from '@/utils/request';

const enum Api {
  BANK_INFO = 'bankinfo',
  WITHDRAWAL = 'withdraw',
}
export interface IBankInfoDataDetails {
  bankAccount: string;
  bankBranch: string;
  bankName: string;
  name: string;
  address: string;
}
export interface IBankInfoData extends BaseResult {
  banktype: string;
  id: string;
  paymentchannelid: string;
  detail: IBankInfoDataDetails;
}

interface IBankInfoResult extends BaseResult {
  data: IBankInfoData[];
}

export class WithdrawalParams {
  amount = '';
  bankinfoid = '';
  paypassword = '';
}
interface IWithdrawalResult extends BaseResult {
  data: string;
}
export function bankInfoApi<T extends boolean = false>(returnAxios: T = false as T, noLoading = true) {
  return request<IBankInfoResult, [], T>(
    () => ({
      url: Api.BANK_INFO,
      method: 'get',
    }),
    { noLoading },
    returnAxios,
  );
}
export function withdrawal<T extends boolean = true>(returnAxios: T = true as T) {
  return request<IWithdrawalResult, [WithdrawalParams], T>(
    (params) => ({
      url: Api.WITHDRAWAL,
      method: 'post',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}
