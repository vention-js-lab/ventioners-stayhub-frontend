import { api } from '#/configs/axios.config';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Booking } from '../types/bookings/booking.type';

export async function getUserBookings(): Promise<Booking[]> {
  const response = await api.get<Booking[]>(ENDPOINTS.bookings);
  return response.data;
}

export function useUserBookings() {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: () => getUserBookings(),
  });
}
