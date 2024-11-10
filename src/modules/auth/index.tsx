import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { SignupRoute } = lazyRoute(() => import('./routes/signup.route'), 'SignupRoute');
const { LoginRoute } = lazyRoute(() => import('./routes/login.route'), 'LoginRoute');

export const AuthRoutes: RouteObject[] = [
  {
    path: '/signup',
    element: <SignupRoute />,
  },
  {
    path: '/login',
    element: <LoginRoute />,
  },
];
