import { api } from '#/configs/axios.config';
import { type User } from '#/types';
import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS } from '../constants/endpoints.constant';
import { type Accommodation } from '../types/accommodation.type';

export type Booking = {
  id: string;
  user: User;
  accommodation: Accommodation;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  numberOfGuests: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

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
