import request from '@/utils/request';

export interface LocalizationResult extends BaseResult {
  data: object;
}

export function getLocalization<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<LocalizationResult, [], T>(
    () => ({
      url: 'localization',
      method: 'get',
    }),
    { needAll: true },
    returnAxios,
  );
}
