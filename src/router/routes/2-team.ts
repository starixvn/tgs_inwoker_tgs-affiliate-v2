import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { concatObjectValue } from '@/utils/helper';
export const routes: RouteRecordRaw[] = [
  {
    path: '/team',
    component: Layout,
    children: concatObjectValue<RouteRecordRaw>(import.meta.glob('./team/*.ts', { eager: true, import: 'routes' })),
    meta: { title: 'team' ,affix: true, icon: 'me-icon-team'},
  },
];
