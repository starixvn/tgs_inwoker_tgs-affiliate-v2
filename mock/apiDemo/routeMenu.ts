import { success, fail } from '../helper';

const menu = [
  {
    path: '/index',
    redirect: '/index/index',
    component: 'Layout',
    children: [
      {
        path: 'index',
        component: 'dashboard/index',
        meta: {
          title: '首页',
          affix: true,
          icon: 'me-icon-dashboard',
        },
      },
    ],
    meta: {
      title: '',
    },
  },
  {
    path: '/team',
    component: 'Layout',
    children: [
      {
        path: 'player',
        component: 'team/player/index',
        meta: {
          title: '权限',
        },
      },
      {
        path: 'agent',
        component: 'team/agent/index',
        meta: {
          title: '组件语言包',
        },
      },
    ],
    meta: {
      title: '示例',
      icon: 'mel-icon-promotion',
    },
  },
];
export default [
  {
    url: '/api/menu/list', //
    method: 'get',
    response() {
      return success(menu, '菜单获取成功');
    },
  },
];
