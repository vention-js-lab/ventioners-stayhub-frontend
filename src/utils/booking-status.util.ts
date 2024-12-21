import { BookingStatus } from '#/modules/bookings/types/booking-status.constant';
import { type User } from '#/types';
import { type Booking } from '#/modules/bookings/types';

export function canLeaveReview(
  bookings: Booking[],
  reviews: {
    id: string;
    user: Pick<User, 'firstName' | 'lastName'>;
    comment: string;
    rating: number;
    accommodationId: string;
  }[],
  accommodationId: string,
  user: string
): boolean {
  const isConfirmedForAccommodation = bookings.some((booking: Booking): boolean => {
    return booking.accommodation.id === accommodationId && booking.status === BookingStatus.CheckedOut;
  });
  const hasReviewed = reviews.some((review) => {
    return review.user.id === user;
  });
  return isConfirmedForAccommodation && !hasReviewed;
}
