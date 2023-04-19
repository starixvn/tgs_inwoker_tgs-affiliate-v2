import request from '@/utils/request';

const enum Api {
  LOGIN = 'agent/login',
  USER_INFO = 'agent/info',
}

// 登录
export class LoginParams {
  username = 'aaronxiao';
  password = '1q2w3e4r';
  platformtype = 1;
}
export interface LoginResult {
  err: number;
  errmsg: string;
  errmsgid: any;
  logintime: number;
  token: string;
}
export function loginApi<T extends boolean = true>(returnAxios: T = true as T) {
  return request<LoginResult, [LoginParams], T>(
    (params) => ({
      url: Api.LOGIN,
      method: 'post',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

// 获取用户详细信息
export type UserInfoResult = BaseResult<{
  agentdomains: string[]; // 权限
  accumulatedprofitsharing: string; // 备注
  agentdividendtype: string; // 头像
  agentlevel: string; // 名称
  balance: string; // 用户名
}>;
export function userInfoApi<T extends boolean = false>(returnAxios: T = false as T, noLoading = true) {
  return request<UserInfoResult, [], T>(
    () => ({
      url: Api.USER_INFO,
      method: 'get',
    }),
    { noLoading },
    returnAxios,
  );
}
