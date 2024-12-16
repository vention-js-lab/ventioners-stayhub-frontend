import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '#/modules/bookings/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { api } from '#/configs';
import { type AxiosError } from 'axios';
import { type Booking, type CreateBookingAxiosResponse, type CreateBooking } from '#/modules/bookings/types';
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
      if (error.response?.status === 400) {
        toast.error(`Error happened in creating booking`);
        return;
      }
      toast.error(`This property has been already booken in this date`);
    },
  });
};
