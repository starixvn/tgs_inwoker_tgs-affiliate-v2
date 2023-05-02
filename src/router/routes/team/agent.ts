import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: 'agent',
    name: 'agent',
    component: () => import('@/views/team/agent.vue'),
    meta: { title: 'agent' },
  },
];
