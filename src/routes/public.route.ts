import { AuthRoutes } from '#/modules/auth';
import { HomeRoutes } from '#/modules/home';
import { SinglePropertyRoutes } from '#/modules/property-detail';
import { composeModuleRoutes } from '#/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, AuthRoutes, SinglePropertyRoutes);
