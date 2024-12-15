import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';
import { CreateAccommodationRoute } from '#/modules/home/routes/create-acccommodation.route.tsx';
import { PaymentResult } from './components/payment';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');
const { WishlistRoute } = lazyRoute(() => import('./routes/wishlist.route'), 'WishlistRoute');
const { SinglePropertyRoute } = lazyRoute(() => import('./routes/single-property.route'), 'SinglePropertyRoute');

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
    element: <AuthLayout protectedRoute={false} />,
    children: [
      {
        path: '',
        element: <SinglePropertyRoute />,
      },
    ],
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
  {
    path: '/payment',
    element: <PaymentResult />,
  },
];
