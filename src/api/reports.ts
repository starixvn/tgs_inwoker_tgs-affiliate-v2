import { request, RequestOptions } from '@/utils/request';

interface PlayerData {
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

export function getPlayerList(options: RequestOptions<PlayeListResult, [BasePageParams]> = {}) {
  return request(
    (params) => ({
      url: 'player/list',
      method: 'get',
      params: params,
    }),
    Object.assign({ noLoading: true }, options),
  );
}

export function getPlayerStatuses(options: RequestOptions<BaseResult, [string]> = {}) {
  return request(
    (params) => ({
      url: 'player/list/statuses',
      method: 'get',
      params: { params },
    }),
    Object.assign({ noLoading: true }, options),
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
