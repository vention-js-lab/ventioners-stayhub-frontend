import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { SinglePropertyRoute } from './routes/single-property.route';
import { AuthLayout } from '#/routes/layout-protected.route';
import { CreateAccommodationRoute } from '#/modules/home/routes/create-acccommodation.route.tsx';

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
  {
    path: '/property/:id',
    element: <SinglePropertyRoute />,
  },
  {
    path: '/host/homes',
    element: <AuthLayout protectedRoute={true} />,
    children: [
      {
        path: '',
        element: <CreateAccommodationRoute />,
      },
    ],
  },
];
