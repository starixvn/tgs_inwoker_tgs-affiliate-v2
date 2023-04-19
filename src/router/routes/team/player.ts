import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: 'player',
    component: () => import('@/views/team/player.vue'),
    meta: { title: 'player' },
  },
];
