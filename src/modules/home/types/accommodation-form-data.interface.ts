import { type Accommodation } from './accommodation.type';

export interface AccommodationFormData extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt' | 'isAddedToWishlist'> {
  categoryId: string;
  amenityIds: string[];
  images: File[];
}
