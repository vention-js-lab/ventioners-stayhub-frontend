import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useGetBookings } from '../../api/get-bookings';
import { toast } from 'react-toastify';
import { BookingCard } from './booking-card';
import { bookingsPageStyles } from './bookings-page.styles';

export function BookingsPage() {
  const { data, isLoading, isError } = useGetBookings();

  if (isLoading) {
    return (
      <Box sx={bookingsPageStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    toast.error('Error fetching bookings');
    return (
      <Container maxWidth="md">
        <Alert severity="error">Unable to load bookings. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Box sx={bookingsPageStyles.container}>
      <Typography variant="h4" sx={bookingsPageStyles.header}>
        My Bookings
      </Typography>

      {data?.data.length === 0 ? (
        <Box sx={bookingsPageStyles.emptyState}>
          <Typography variant="h6" color="text.secondary">
            No bookings found
          </Typography>
          <Typography variant="body2" color="text.disabled">
            You have not made any bookings yet
          </Typography>
        </Box>
      ) : (
        data?.data.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      )}
    </Box>
  );
}
