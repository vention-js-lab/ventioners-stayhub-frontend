import { lazyRoute } from '#/utils/router.util';
import { type RouteObject } from 'react-router-dom';
import { WishlistRoute } from './routes/wishlist.route';
import { SinglePropertyRoute } from './routes/singleProperty.route';
import { SinglePropertyImages } from './routes/singlePropertyImages.route';

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
    path: '/property/:id',
    element: <SinglePropertyRoute />,
  },
  {
    path: '/property/:id/images',
    element: <SinglePropertyImages />,
  },
];
