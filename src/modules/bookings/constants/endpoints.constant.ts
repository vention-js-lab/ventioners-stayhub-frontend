export const ENDPOINTS = {
  cancelBooking: (bookingId: string) => `/bookings/${bookingId}/status`,
} as const;
