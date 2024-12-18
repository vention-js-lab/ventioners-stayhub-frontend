export const ENDPOINTS = {
  root: '/',
  login: '/auth/login',
  signup: '/auth/register',
  logout: '/auth/logout',
  googleAuth: '/auth/google/login',
  refresh: '/auth/refresh',
  verifyEmail: '/auth/verify-email',
  resendEmail: '/auth/resend-email',
  updatePassword: '/auth/update-password',
  user: '/users/me',
} as const;

export const ROUTES = {
  login: '/login',
  signup: '/signup',
  checkEmail: '/check-email',
  verifyEmail: '/verify-email',
} as const;
