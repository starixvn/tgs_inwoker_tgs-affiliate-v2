import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: 'agent',
    component: () => import('@/views/team/agent.vue'),
    meta: { title: 'team.submenu.agent' },
  },
];
