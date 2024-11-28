export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: string[] | File[];
  location: string;
  pricePerNight: number;
  isAddedToWishlist: boolean;
  createdAt: Date;
  updatedAt: Date;
};
