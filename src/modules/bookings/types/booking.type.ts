import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { type BookingStatus } from '#/modules/bookings/types/booking-status.constant';
import { type User } from '#/types';

export type Booking = {
  id: string;
  user: User;
  accommodation: Accommodation;
  checkInDate: Date;
  checkOutDate: Date;
  status: BookingStatus;
  totalPrice: number;
  numberOfGuests: number;
  createdAt: Date;
  updatedAt: Date;
};
