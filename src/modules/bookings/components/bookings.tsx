import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetBookings } from '../api/get-bookings';
import { toast } from 'react-toastify';
import { BookingCard } from './booking-card';
import { bookingsStyles } from './bookings.styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { BookingStatus } from '../types/booking-status.constant';

interface BookingsProps {
  selectedCategory: BookingStatus;
}

export function Bookings({ selectedCategory }: BookingsProps) {
  const { t } = useTranslation('bookings');
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
        <Typography variant="h5">{t(TRANSLATION_KEYS.bookings.unable_to_load)}</Typography>
      </Container>
    );
  }

  const filteredBookings =
    selectedCategory === BookingStatus.All
      ? data?.data || []
      : data?.data.filter((booking) => booking.status === selectedCategory) || [];

  return (
    <Box sx={bookingsStyles.container}>
      {filteredBookings.length === 0 ? (
        <Box sx={bookingsStyles.emptyState}>
          <Typography variant="h6" color="text.secondary">
            No bookings found for {selectedCategory}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            You have no bookings with this status.
          </Typography>
        </Box>
      ) : (
        filteredBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      )}
    </Box>
  );
}
