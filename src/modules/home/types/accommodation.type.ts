import { type Image } from '#/modules/home/types/image.type.ts';
import { type Amenity } from '#/types/amenity.types';
import { type Review } from '#/types/review.type';

export interface Location {
  lng: number;
  lat: number;
}

export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  amenities: Amenity[];
  location: string;
  pricePerNight: number;
  locationCoordinates: {
    type: string;
    coordinates: [number, number];
  };
  isAddedToWishlist: boolean;
  reviews: Review[];
  owner: {
    firstName: string;
    lastName: string;
  };
  overallRating: number;
  numberOfGuests: number;
  createdAt: Date;
  updatedAt: Date;
};
