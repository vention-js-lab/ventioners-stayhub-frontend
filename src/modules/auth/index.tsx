import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';

const { SignupRoute } = lazyRoute(() => import('./routes/signup.route'), 'SignupRoute');
const { LoginRoute } = lazyRoute(() => import('./routes/login.route'), 'LoginRoute');
const { CheckMailRoute } = lazyRoute(() => import('./routes/check-mail.route'), 'CheckMailRoute');
const { EmailVerificationRoute } = lazyRoute(() => import('./routes/email-verification.route'), 'EmailVerificationRoute');

export const AuthRoutes: RouteObject[] = [
  {
    path: '/signup',
    element: <SignupRoute />,
  },
  {
    path: '/login',
    element: <LoginRoute />,
  },
  {
    path: '/check-email',
    element: <CheckMailRoute />,
  },
  {
    path: '/verify-email',
    element: <EmailVerificationRoute />,
  },
];
