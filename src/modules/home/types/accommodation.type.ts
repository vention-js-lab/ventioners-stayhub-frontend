export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: string[];
  location: string;
  pricePerNight: number;
  isAddedToWishlist: boolean;
  createdAt: Date;
  updatedAt: Date;
};
