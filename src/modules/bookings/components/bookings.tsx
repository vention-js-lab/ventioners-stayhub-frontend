import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetBookings } from '../api/get-bookings';
import { toast } from 'react-toastify';
import { BookingCard } from './booking-card';
import { bookingsStyles } from './bookings.styles';

export function Bookings() {
  const { data, isLoading, isError } = useGetBookings();

  if (isLoading) {
    return (
      <Box sx={bookingsStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    toast.error('Error fetching bookings');
    return (
      <Container maxWidth="md">
        <Typography variant="h5">Unable to load bookings. Please try again later.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={bookingsStyles.container}>
      <Typography variant="h4" sx={bookingsStyles.header}>
        My Bookings
      </Typography>

      {data?.data.length === 0 ? (
        <Box sx={bookingsStyles.emptyState}>
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
