import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';

const { BookingsRoute } = lazyRoute(() => import('./routes/bookings.route'), 'BookingsRoute');

export const BookingsRoutes: RouteObject[] = [
  {
    path: '/bookings',
    element: <AuthLayout protectedRoute={true} />,
    children: [
      {
        path: '',
        element: <BookingsRoute />,
      },
    ],
  },
];
