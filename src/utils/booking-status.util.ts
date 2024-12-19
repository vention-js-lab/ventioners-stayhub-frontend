import { BookingStatus } from '#/modules/bookings/types/booking-status.constant';
import { type User } from '#/types';
import { type Booking } from '#/modules/bookings/types';

export function canLeaveReview(
  bookings: Booking[],
  reviews: {
    id: string;
    user: Pick<User, 'firstName' | 'lastName' | 'id'>;
    comment: string;
    rating: number;
    accommodationId: string;
  }[],
  accommodationId: string,
  userId: string
): boolean {
  const isConfirmedForAccommodation = bookings.some((booking: Booking): boolean => {
    return booking.accommodation.id === accommodationId && booking.status === BookingStatus.Confirmed;
  });

  const hasReviewed = reviews.some((review) => review.accommodationId === accommodationId && review.user.id === userId);
  return isConfirmedForAccommodation && !hasReviewed;
}
