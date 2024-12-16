import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';

const { SinglePropertyRoute } = lazyRoute(() => import('./routes/single-property.route'), 'SinglePropertyRoute');

export const SinglePropertyRoutes: RouteObject[] = [
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
];
