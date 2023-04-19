import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
export const routes: RouteRecordRaw[] = [
  {
    path: '/landing',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/landing/index.vue'),
        meta: { title: 'Agent Admin 2.0' },
      },
    ],
    meta: { title: 'Agent Admin 2.0' },
  },
];
