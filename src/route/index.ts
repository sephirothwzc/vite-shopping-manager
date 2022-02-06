import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/web',
    },
    {
      path: '/web',
      name: 'index',
      component: () => import('../page/home'),
      children: [
        {
          path: 'shopping-goods',
          name: 'shoppingGoods',
          component: () => import('../view/shopping-goods/list'),
        },
        {
          path: 'app-user',
          name: 'appUser',
          component: () => import('../view/app-user/list'),
        },
        {
          path: 'app-user/item/',
          name: 'appUserAdd',
          component: () => import('../view/app-user/item'),
        },
        {
          path: 'app-user/item/:id',
          name: 'appUserEdit',
          component: () => import('../view/app-user/item'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../page/login'),
    },
  ],
});

/**
 * 导航路由
 */
export const navRouter = [
  {
    to: '/web/shopping-goods',
    icon: 'UserOutlined',
    name: '商品管理',
  },
  {
    to: '/web/shopping-goods',
    icon: 'UserOutlined',
    name: '订单管理',
  },
  {
    to: '/web/shopping-goods',
    icon: 'UserOutlined',
    name: '库存管理',
  },
  {
    to: '/web/app-user',
    icon: 'UserOutlined',
    name: '用户管理',
  },
];
export default router;
