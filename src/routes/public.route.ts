import { AuthRoutes } from '#/modules/auth';
import { BookingsRoutes } from '#/modules/bookings';
import { HomeRoutes } from '#/modules/home';
import { composeModuleRoutes } from '#/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, AuthRoutes, BookingsRoutes);
