import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
export const routes: RouteRecordRaw[] = [
  {
    path: '/helpcenter',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/helpcenter/index.vue'),
        meta: { title: 'helpcenter.title', icon: 'mel-icon-set-up' },
      },
    ],
    meta: { title: 'helpcenter.title', icon: 'mel-icon-set-up' },
  },
];
