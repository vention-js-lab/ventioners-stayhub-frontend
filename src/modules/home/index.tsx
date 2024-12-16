import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';
import { PaymentResult } from './components/payment';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');

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
    path: '/payment',
    element: <PaymentResult />,
  },
];
