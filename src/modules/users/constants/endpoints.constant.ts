export const ENDPOINTS = {
  users: '/users',
} as const;

export const ROUTES = {
  root: '/',
  accountSettings: '/account-settings',
  personalInfo: '/account-settings/personal-info',
  loginAndSecurity: '/account-settings/login-and-security',
  preferences: '/account-settings/preferences',
  profile: '/users',
} as const;
