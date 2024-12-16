import { BookingsRoutes } from '#/modules/bookings';
import { ProfileRoutes } from '#/modules/users';
import { OwnerPropertiesRoutes } from '#/modules/owner';
import { composeModuleRoutes } from '#/utils/router.util';
import { SinglePropertyRoutes } from '#/modules/property-detail';
import { WishlistRoutes } from '#/modules/wishlist';
import { CreateAccommodationRoutes } from '#/modules/property-host';

export const privateRoutes = composeModuleRoutes(
  ProfileRoutes,
  BookingsRoutes,
  OwnerPropertiesRoutes,
  SinglePropertyRoutes,

  WishlistRoutes,
  CreateAccommodationRoutes
);
