import { RouteRecordRaw } from 'vue-router';
export const routes: RouteRecordRaw[] = [
  {
    path: 'player',
    name: 'player',
    component: () => import('@/views/team/player.vue'),
    meta: { title: 'player' },
  },
];
