import Box from '@mui/material/Box';
import { HeaderComponent } from '../../home/components/header';
import { bookingsRouteStyles } from './bookings.route.styles';
import { Bookings } from '../components/bookings';

export function BookingsRoute() {
  return (
    <Box sx={bookingsRouteStyles.container}>
      <HeaderComponent />
      <Bookings />
    </Box>
  );
}
