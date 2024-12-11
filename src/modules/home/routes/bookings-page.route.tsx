import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { bookingsPageRouteStyles } from './bookings-page.route.styles';

export function BookingsPageRoute() {
  return (
    <Box sx={bookingsPageRouteStyles.container}>
      <HeaderComponent />
    </Box>
  );
}
