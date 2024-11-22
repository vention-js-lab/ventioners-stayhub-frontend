import { AuthRoutes } from '#/modules/auth';
import { HomeRoutes } from '#/modules/home';
import { HostRoutes } from '#/modules/host';
import { composeModuleRoutes } from '#/utils/router.util';

export const publicRoutes = composeModuleRoutes(HomeRoutes, AuthRoutes, HostRoutes); // HostRoutes is for testing
