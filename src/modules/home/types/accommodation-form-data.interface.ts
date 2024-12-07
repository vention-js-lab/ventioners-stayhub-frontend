import { type AmenityInterface } from '#/types/amenity.types';
import { type Accommodation } from './accommodation.type';

export interface AccommodationFormData
  extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'isAddedToWishlist'> {
  categoryId: string;
  amenities: AmenityInterface[];
  images?: (string | File)[];
}
