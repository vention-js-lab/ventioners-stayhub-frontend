import { type Accommodation } from './accommodation.type';

export interface AccommodationFormData
  extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'isAddedToWishlist' | 'amenities'> {
  categoryId: string;
  amenities: string[];
  images?: (string | File)[];
}
