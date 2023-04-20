import request from '@/utils/request';

const enum Api {
  BANK_INFO = 'bankinfo',
}
interface IBankInfoDataDetails extends BaseResult {

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
    detail:IBankInfoDataDetails
}

interface IBankInfoResult extends BaseResult {
  data:IBankInfoData[]
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
