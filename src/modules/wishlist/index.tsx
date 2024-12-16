import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';

const { WishlistRoute } = lazyRoute(() => import('./routes/wishlist.route'), 'WishlistRoute');

export const WishlistRoutes: RouteObject[] = [
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
