import { type Accommodation } from '#/types/accommodation.type';

export interface AccommodationFormData extends Omit<Accommodation, 'id' | 'createdAt' | 'updatedAt'> {
  latitude: number;
  longitude: number;
  categoryId: string;
}
