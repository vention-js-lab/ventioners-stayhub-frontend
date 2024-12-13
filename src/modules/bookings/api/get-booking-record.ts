import { api } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Booking } from '../types';

type GetUserBookingsResponse = {
  data: Booking[];
};

export async function getUserBookings(): Promise<GetUserBookingsResponse> {
  const response = await api.get<GetUserBookingsResponse>(ENDPOINTS.bookings);
  return response.data;
}

export function useUserBookings() {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: () => getUserBookings(),
  });
}
