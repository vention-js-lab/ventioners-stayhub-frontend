import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS } from '#/modules/bookings/constants/endpoints.constant.ts';
import { toast } from 'react-toastify';
import { api } from '#/configs';
import { type AxiosError } from 'axios';
import { type Booking, type CreateBookingAxiosResponse, type CreateBooking } from '#/modules/bookings/types';
import { useCreatePaymentStripeCheckout } from '#/modules/bookings/api/create-payment-stripe-checkout';
import { type ApiErrorResponse } from '#/types/api-error-response.type';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export const useCreateBooking = () => {
  const { t } = useTranslation('accommodation-details');
  const createPaymentStripeCheckout = useCreatePaymentStripeCheckout();

  return useMutation<Booking, AxiosError<ApiErrorResponse>, CreateBooking>({
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
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error(t(TRANSLATION_KEYS.accommodation_details.you_must_be_logged_in));
        return;
      }

      if (error.response?.data.message) {
        toast.error(error.response.data.message);
        return;
      }

      if (!error.response) {
        toast.error(t(TRANSLATION_KEYS.accommodation_details.network_error));
        return;
      }

      toast.error(t(TRANSLATION_KEYS.accommodation_details.error_occured));
    },
  });
};
