import { api } from '#/configs/axios.config';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Booking } from '../types/booking.type';
import { type ApiErrorResponse } from '#/types/api-error-response.type';
import { type AxiosError } from 'axios';

type CancelBookingResponse = {
  data: Booking;
};

async function cancelBooking(id: string): Promise<CancelBookingResponse> {
  const response = await api.patch<CancelBookingResponse>(ENDPOINTS.cancelBooking(id), { status: 'CANCELLED' });
  return response.data;
}

export function useCancelBooking(id: string, options: UseMutationOptions<CancelBookingResponse, AxiosError<ApiErrorResponse>>) {
  return useMutation({
    mutationFn: () => cancelBooking(id),
    ...options,
  });
}
