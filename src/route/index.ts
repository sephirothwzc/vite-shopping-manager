import { createRouter, createWebHistory } from 'vue-router';
export const breadcrumb = [
  {
    path: '/web',
    name: 'index',
    breadcrumbName: '主页',
    children: [
      {
        path: '/app-user',
        name: 'appUser',
        breadcrumbName: '用户管理',
        children: [
          {
            path: '/item',
            name: 'appUserAdd',
            breadcrumbName: '用户新增',
          },
          {
            path: '/:id',
            name: 'appUserEdit',
            breadcrumbName: '用户编辑',
          },
        ],
      },
      {
        path: '/shopping-goods',
        name: 'shoppingGoods',
        breadcrumbName: '商品管理',
      },
    ],
  },
];
/**
 * 搭配爆米花数据源
 */
const routerData = [
  {
    path: '/',
    redirect: '/web',
  },
  {
    path: '/web',
    name: 'index',
    breadcrumbName: '主页',
    component: () => import('../page/home'),
    children: [
      {
        path: 'shopping-goods',
        name: 'shoppingGoods',
        breadcrumbName: '商品管理',
        component: () => import('../view/shopping-goods/list'),
      },
      {
        path: 'shopping-goods/item',
        name: 'shoppingGoodsAdd',
        breadcrumbName: '商品新增',
        component: () => import('../view/shopping-goods/item'),
      },
      {
        path: 'app-user',
        name: 'appUser',
        breadcrumbName: '用户管理',
        component: () => import('../view/app-user/list'),
      },
      {
        path: 'app-user/item',
        name: 'appUserAdd',
        breadcrumbName: '用户新增',
        component: () => import('../view/app-user/item'),
      },
      {
        path: 'app-user/item/:id',
        name: 'appUserEdit',
        breadcrumbName: '用户编辑',
        component: () => import('../view/app-user/item'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../page/login'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routerData,
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
    to: '/web/shopping-goods/item',
    icon: 'UserOutlined',
    name: '商品新增',
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
