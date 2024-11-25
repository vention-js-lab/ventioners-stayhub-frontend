export const ENDPOINTS = {
  root: '/',
  login: '/auth/login',
  signup: '/auth/register',
  googleAuth: '/auth/google/login',
  refresh: '/auth/refresh',
  user: '/auth/me',
} as const;

export const ROUTES = {
  login: '/login',
  signup: '/signup',
} as const;
