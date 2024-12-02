import { type Image } from '#/modules/home/types/image.type.ts';

type LocationCoordinates = {
  type: string;
  coordinates: number[];
};

export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  locationCoordinates: LocationCoordinates;
  location: string;
  pricePerNight: number;
  isAddedToWishlist: boolean;
  createdAt: Date;
  updatedAt: Date;
};
