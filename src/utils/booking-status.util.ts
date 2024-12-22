import { BookingStatus } from '#/modules/bookings/types/booking-status.constant';
import { type Booking } from '#/modules/bookings/types';
import { type Review } from '#/types/review.type';

export function canLeaveReview(bookings: Booking[], reviews: Review[], accommodationId: string, userId?: string): boolean {
  if (!userId) {
    return false;
  }

  const hasUserCheckedOut = bookings.some((booking): boolean => {
    return booking.accommodation.id === accommodationId && booking.status === BookingStatus.CheckedOut;
  });

  const userHasReviewedBefore = reviews.some((review) => {
    return review.user.id === userId;
  });

  return hasUserCheckedOut && !userHasReviewedBefore;
}
