import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');
const { WishlistRoute } = lazyRoute(() => import('./routes/wishlist.route'), 'WishlistRoute');

export const HomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout protectedRoute={false} />,
    children: [
      {
        path: '',
        element: <HomeRoute />,
      },
    ],
  },
  {
    path: '/wishlist',
    element: <AuthLayout protectedRoute={true} />,
    children: [
      {
        path: '',
        element: <WishlistRoute />,
      },
    ],
  },
];
