import { type Image } from '#/modules/home/types/image.type.ts';
import { type User } from '#/types';
import { type AmenityInterface } from '#/types/amenity.types';

export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: Image[];
  amenities: AmenityInterface[];
  location: string;
  pricePerNight: number;
  isAddedToWishlist: boolean;
  reviews: {
    id: string;
    user: Pick<User, 'firstName' | 'lastName'>;
    comment: string;
    rating: number;
  }[];
  owner: {
    firstName: string;
    lastName: string;
  };
  overallRating: number;
  createdAt: Date;
  updatedAt: Date;
};
