import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { AuthLayout } from '#/routes/layout-protected.route';

const { CreateAccommodationRoute } = lazyRoute(() => import('./routes/create-acccommodation.route'), 'CreateAccommodationRoute');

export const CreateAccommodationRoutes: RouteObject[] = [
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
