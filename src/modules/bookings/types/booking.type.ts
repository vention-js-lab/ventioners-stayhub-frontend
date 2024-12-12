import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { type BookingStatus } from '#/modules/bookings/types/booking-status.constant';

export type Booking = {
  id: string;
  user: object;
  accommodation: Accommodation;
  checkInDate: Date;
  checkOutDate: Date;
  status: BookingStatus;
  totalPrice: number;
  numberOfGuests: number;
  createdAt: Date;
  updatedAt: Date;
};
