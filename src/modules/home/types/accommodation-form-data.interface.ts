import { type Accommodation } from './accommodation.type';

export interface AccommodationFormData
  extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'isAddedToWishlist'> {
  categoryId: string;
  amenityIds: string[];
  images?: (string | File)[];
}
