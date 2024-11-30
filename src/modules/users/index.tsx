import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { PersonalInfoForm } = lazyRoute(() => import('./components'), 'PersonalInfoForm');
const { SecurityForm } = lazyRoute(() => import('./components'), 'SecurityForm');
const { ProfileRoute } = lazyRoute(() => import('./routes/profile.route'), 'ProfileRoute');

export const UsersRoutes: RouteObject[] = [
  {
    path: '/account-settings',
    element: <ProfileRoute />,
  },
  {
    path: '/account-settings/personal-info',
    element: <PersonalInfoForm />,
  },
  {
    path: '/account-settings/login-and-security',
    element: <SecurityForm />,
  },
];
