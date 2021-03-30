import loadable from '@loadable/component';

export const routes = [
  {
    name: 'Products',
    exact: true,
    path: '/',
    component: loadable(() => import('../views/Product')),
  },
  {
    name: 'Cart',
    exact: true,
    path: '/cart',
    component: loadable(() => import('../views/Cart')),
  },
];
