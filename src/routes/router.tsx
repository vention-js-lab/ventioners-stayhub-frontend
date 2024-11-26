import { privateRoutes } from '#/routes/private.route';
import { publicRoutes } from '#/routes/public.route';
import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from './layout-protected.route';

export const router = createBrowserRouter([
  {
    id: 'App wrapper public',
    path: '/',
    element: <AuthLayout protectedRoute={false} />,
    children: [...publicRoutes],
  },
  {
    id: 'App wrapper protected',
    path: '/',
    element: <AuthLayout protectedRoute={true} />,
    children: [...privateRoutes],
  },
]);
