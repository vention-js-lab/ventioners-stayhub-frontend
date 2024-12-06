import { type Accommodation } from './accommodation.type';

export interface AccommodationFormData
  extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt' | 'images' | 'isAddedToWishlist'> {
  categoryId: string;
  amenities: string[];
  images: File[];
  numberOfGuests: number;
}
