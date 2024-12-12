export const ENDPOINTS = {
  cancelBooking: (bookingId: string) => `/bookings/${bookingId}/status`,
  bookings: '/bookings',
} as const;
