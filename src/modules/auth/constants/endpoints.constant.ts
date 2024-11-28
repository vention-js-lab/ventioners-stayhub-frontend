export const ENDPOINTS = {
  root: '/',
  login: '/auth/login',
  signup: '/auth/register',
  logout: '/auth/logout',
  googleAuth: '/auth/google/login',
  refresh: '/auth/refresh',
  user: '/users/me',
} as const;

export const ROUTES = {
  login: '/login',
  signup: '/signup',
} as const;
