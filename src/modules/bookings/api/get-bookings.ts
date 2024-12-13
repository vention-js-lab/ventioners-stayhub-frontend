import { ENDPOINTS } from '#/modules/bookings/constants/endpoints.constant.ts';
import { api } from '#/configs';
import { type Accommodation } from '#/modules/home/types/accommodation.type';
import { type Booking } from '../types/booking.type';
import { useQuery } from '@tanstack/react-query';

type GetBookingsResponse = {
  data: (Booking & { accommodation: Accommodation })[];
};

export async function getBookings(): Promise<GetBookingsResponse> {
  const response = await api.get<GetBookingsResponse>(ENDPOINTS.bookings);

  return response.data;
}

export function useGetBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: () => getBookings(),
  });
}
