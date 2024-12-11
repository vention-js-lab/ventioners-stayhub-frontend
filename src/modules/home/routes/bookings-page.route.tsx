import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { bookingsPageRouteStyles } from './bookings-page.route.styles';
import { BookingsPage } from '../components/bookings/bookings-page';

export function BookingsPageRoute() {
  return (
    <Box sx={bookingsPageRouteStyles.container}>
      <HeaderComponent />
      <BookingsPage />
    </Box>
  );
}
