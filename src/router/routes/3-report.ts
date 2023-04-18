import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { concatObjectValue } from '@/utils/helper';
export const routes: RouteRecordRaw[] = [
  {
    path: '/report',
    component: Layout,
    children: concatObjectValue<RouteRecordRaw>(import.meta.glob('./report/*.ts', { eager: true, import: 'routes' })),
    meta: { title: 'report.title', icon: 'mel-icon-files' },
  },
];
