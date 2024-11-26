import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { WishlistRoute } from './routes/wishlist.route';
import { CreateAccommodatioRoute } from './routes/create-acccommodation.route';

const { HomeRoute } = lazyRoute(() => import('./routes/home.route'), 'HomeRoute');

export const HomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/wishlist',
    element: <WishlistRoute />,
  },
  {
    path: '/host/homes',
    element: <CreateAccommodatioRoute />,
  },
];
