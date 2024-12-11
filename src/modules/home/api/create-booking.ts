import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '#/modules/home/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { api } from '#/configs';
import { type AxiosError } from 'axios';
import { type CreateBooking } from '#/modules/home/types/bookings/create-booking.type.ts';
import { type CreateBookingAxiosResponse } from '#/modules/home/types/bookings';
import { type Booking } from '#/modules/home/types/bookings/booking.type.ts';
import { useCreatePaymentStripeCheckout } from '#/modules/home/api/create-payment-stripe-checkout.ts';

export const useCreateBooking = () => {
  const createPaymentStripeCheckout = useCreatePaymentStripeCheckout();
  return useMutation({
    mutationFn: async (data: CreateBooking) => {
      const response = await api.post<CreateBookingAxiosResponse>(ENDPOINTS.bookings, data);
      return response.data.data;
    },
    onSuccess: (booking: Booking) => {
      createPaymentStripeCheckout.mutate({
        accommodationId: booking.accommodation.id,
        bookingId: booking.id,
      });
      return booking;
    },
    onError: (error: AxiosError) => {
      toast.error(`Error creating booking: ${error.message}`);
    },
  });
};
