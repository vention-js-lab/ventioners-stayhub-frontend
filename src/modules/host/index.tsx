import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { HostRoute } = lazyRoute(() => import('./routes/host.route'), 'HostRoute');

export const HostRoutes: RouteObject[] = [
  {
    path: '/host',
    element: <HostRoute />,
  },
];
