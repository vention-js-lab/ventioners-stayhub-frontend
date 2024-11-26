import { type Accommodation } from './accommodation.type';

export interface AccommodationFormData extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt'> {
  categoryId: string;
  amenityIds: string[];
}
