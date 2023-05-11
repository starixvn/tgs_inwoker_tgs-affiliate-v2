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
export interface AddAgentData {
  agentId: string;
  isNew: boolean;
  message: string;
}

export interface AddAgentResult extends BaseResult {
  data: AddAgentData;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ForgotPasswordResult extends BaseResult {
  data: string;
}

export interface ChangePasswordParams {
  newpwd: string;
  securitykey: string;
  validatecode: string;
}

export interface ChangePasswordResult extends BaseResult {
  data: string;
}

export interface UpdatePasswordParams {
  newpwd: string;
  oldpwd: string;
}

export interface UpdatePasswordResult extends BaseResult {
  data: string;
}

export interface GetWithdrawalPasswordVerificationCodeResult extends BaseResult {
  data: string;
}
export interface GetEmailVerificationCodeResult extends BaseResult {
  data: string;
}
export class GetEmailVerificationCodeParams  {
  email = '';
  
}

export interface UpdateWithdrawalPasswordParams {
  newpwd: string;
  securitykey: string;
  validatecode: string;
}

export interface UpdateWithdrawalPasswordResult extends BaseResult {
  data: string;
}

export function addAgentApi<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<AddAgentResult, [AddAgentParams], T>(
    (params) => ({
      url: 'agent/create',
      method: 'post',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

export function requestVerificationCode<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<ForgotPasswordResult, [ForgotPasswordParams], T>(
    (params) => ({
      url: 'agent/password/forgot',
      method: 'post',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

//this one is forgot password
export function performChangePassword<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<ChangePasswordResult, [ChangePasswordParams], T>(
    (params) => ({
      url: 'agent/password/reset',
      method: 'post',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

//this one is for change password
export function performUpdatePassword<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<UpdatePasswordResult, [UpdatePasswordParams], T>(
    (params) => ({
      url: 'agent/password',
      method: 'put',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

export function performGetChangeWithdrawalPasswordVerificationCode<T extends boolean = true>(
  returnAxios: T = true as T,
  noLoading = false,
) {
  return request<GetWithdrawalPasswordVerificationCodeResult, [], T>(
    () => ({
      url: 'pay/password/validate-code',
      method: 'post',
      data: {},
    }),
    { noLoading },
    returnAxios,
  );
}

export function performGetChangeEmailVerificationCode<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<GetEmailVerificationCodeResult, [GetEmailVerificationCodeParams], T>(
    (params) => ({
      url: 'agent/email',
      method: 'post',
      data: params,
    }),
    { noLoading },
    returnAxios,
  );
}

export function performUpdateWithdrawalPassword<T extends boolean = true>(
  returnAxios: T = true as T,
  noLoading = false,
) {
  return request<UpdateWithdrawalPasswordResult, [UpdateWithdrawalPasswordParams], T>(
    (params) => ({
      url: 'pay/password',
      method: 'PATCH',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}

export class VerifyEmailCodeParams  {
  securitykey = '';
  validatecode = '';
}
export interface VerifyEmailCodeResult extends BaseResult {
  data: string;
}
export function verifyEmailCode<T extends boolean = true>(
  returnAxios: T = true as T,
  noLoading = false,
) {
  return request<VerifyEmailCodeResult, [VerifyEmailCodeParams], T>(
    (params) => ({
      url: 'agent/email',
      method: 'put',
      data: params,
    }),
    { needAll: true },
    returnAxios,
  );
}
