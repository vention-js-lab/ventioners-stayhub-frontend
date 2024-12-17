import Box from '@mui/material/Box';
import { HeaderComponent } from '../../home/components/header';
import { bookingsRouteStyles } from './bookings.route.styles';
import { Bookings } from '../components/bookings';
import { useState } from 'react';
import { BookingStatus } from '../types/booking-status.constant';
import { BookingsNavbar } from '../components/booking-navbar';

export function BookingsRoute() {
  const [selectedCategory, setSelectedCategory] = useState<BookingStatus>(BookingStatus.All);
  return (
    <Box sx={bookingsRouteStyles.container}>
      <HeaderComponent />
      <BookingsNavbar selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <Bookings selectedCategory={selectedCategory} />
    </Box>
  );
}
