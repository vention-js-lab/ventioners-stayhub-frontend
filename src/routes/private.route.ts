import { UsersRoutes } from '#/modules/users';
import { composeModuleRoutes } from '#/utils/router.util';

export const privateRoutes = composeModuleRoutes(UsersRoutes);
