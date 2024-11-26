export type Accommodation = {
  id: string;
  name: string;
  description: string;
  images: string[] | File[];
  location: string;
  pricePerNight: number;
  createdAt: Date;
  updatedAt: Date;
};
