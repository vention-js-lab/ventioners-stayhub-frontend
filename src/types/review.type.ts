import { type User } from './user.type';

export type Review = {
  id: string;
  user: User;
  comment: string;
  rating: number;
  accommodationId: string;
  createdAt: string;
  updatedAt: string;
};
