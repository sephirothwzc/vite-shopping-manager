import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../page/home'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../page/login'),
    },
  ],
});

export default router;
