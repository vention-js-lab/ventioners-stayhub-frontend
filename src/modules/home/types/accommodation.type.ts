import { type Image } from '#/modules/home/types/image.type.ts';

export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  location: string;
  pricePerNight: number;
  isAddedToWishlist: boolean;
  numberOfGuests: number;
  createdAt: Date;
  updatedAt: Date;
};
