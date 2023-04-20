import { request, RequestOptions } from '@/utils/request';

export interface PlayerData {
  areacode: string;
  phone: string;
  playercode: string;
  registeredtime: string;
  registerhost: string;
  status: number;
  username: string;
  viplevel: number;
}
interface PlayeListResult extends BaseResult {
  data: {
    items: PlayerData[];
    totalcount: number;
  };
}

interface AgentData {
  agentstatus: string;
  balance: number;
  cardgamerebatepercentage: number;
  commissionpercentage: number;
  dividendpercentage: number;
  id: string;
  leveltype: string;
  livedealerrebatepercentage: number;
  lotteryrebatepercentage: number;
  registeredon: string;
  slotrebatepercentage: number;
  sportsrebatepercentage: number;
  status: string;
  teamnumber: 1;
  type: string;
  username: string;
  virtualsportsrebatepercentage: number;
}

interface AgentListResult extends BaseResult {
  data: {
    items: AgentData[];
    totalCount: number;
    valid: boolean;
    message: string;
  };
}
export interface SearchForm extends BasePageParams{
  BeginRegisteredOn: string;
  EndRegisteredOn: string;
  RegisterHost: string;
  Status: string;
  Username: string;
  VipId: string;
  desc: boolean;
  sort: string;
  all: boolean;
}
export interface PlayerStatusData {
  [key: string|number]: string
}
interface PlayerStatusResult {
  data:PlayerStatusData
}

export function getPlayerList(options: RequestOptions<PlayeListResult, [SearchForm]> = {}) {
  return request(
    (params) => ({
      url: 'player/list',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, options),
  );
}
export function getPlayerStatuses<T extends boolean = false>(returnAxios: T = false as T, noLoading = true) {
  return request<PlayerStatusResult, [], T>(
    () => ({
      url: 'player/list/statuses',
      method: 'get',
    }),
    { noLoading },
    returnAxios,
  );
}


export function getAgentList(options: RequestOptions<AgentListResult, [BasePageParams]> = {}) {
  return request(
    (params) => ({
      url: 'agent/list',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, options),
  );
}

export function getAgentStatuses(options: RequestOptions<BaseResult, [string]> = {}) {
  return request(
    (params) => ({
      url: 'agent/list/statuses',
      method: 'get',
      params: { params },
    }),
    Object.assign({ noLoading: true }, options),
  );
}
