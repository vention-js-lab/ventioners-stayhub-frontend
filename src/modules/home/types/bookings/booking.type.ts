import { type Accommodation } from '#/modules/home/types/accommodation.type.ts';
import { type BookingStatus } from '#/modules/home/types/bookings/booking-status.constant.ts';

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
