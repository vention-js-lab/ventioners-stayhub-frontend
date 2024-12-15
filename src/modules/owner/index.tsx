import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';

const { OwnerPropertiesRoute } = lazyRoute(() => import('./routes/owner-properties.route'), 'OwnerPropertiesRoute');

export const OwnerPropertiesRoutes: RouteObject[] = [
  {
    path: '/owner/properties',
    element: <AuthLayout protectedRoute={true} />,
    children: [
      {
        path: '',
        element: <OwnerPropertiesRoute />,
      },
    ],
  },
];
