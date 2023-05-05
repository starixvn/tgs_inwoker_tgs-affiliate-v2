import request from '@/utils/request';

export interface LocalizationResult extends BaseResult {
  data: object;
}

export interface FeatureData {
  [key: string | number]: string;
}

interface FeatureResult {
  data: FeatureData;
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

export function getFeatures<T extends boolean = true>(brands: string, returnAxios: T = true as T, noLoading = false) {
  return request<FeatureResult, [], T>(
    () => ({
      url: 'https://app12.s3.ap-east-1.amazonaws.com/features_' + brands + '.json',
      method: 'get',
    }),
    { needAll: true },
    returnAxios,
  );
}
