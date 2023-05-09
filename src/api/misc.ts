import request from '@/utils/request';

interface Localization {
  [key: string]: string;
}

export interface LocalizationResult extends BaseResult {
  data: Localization;
}


interface FeatureResult {
  [key: string]: string;
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

export function getFeatures<T extends boolean = true>(returnAxios: T = true as T, noLoading = false) {
  return request<FeatureResult, [], T>(
    () => ({
      url: 'https://app12.s3.ap-east-1.amazonaws.com/features_' + process.env.BRAND + '.json',
      method: 'get',
    }),
    { needAll: true },
    returnAxios,
  );
}
