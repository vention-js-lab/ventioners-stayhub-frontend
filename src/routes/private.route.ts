import { BookingsRoutes } from '#/modules/bookings';
import { ProfileRoutes } from '#/modules/users';
import { OwnerPropertiesRoutes } from '#/modules/owner';
import { composeModuleRoutes } from '#/utils/router.util';

export const privateRoutes = composeModuleRoutes(ProfileRoutes, BookingsRoutes, OwnerPropertiesRoutes);
