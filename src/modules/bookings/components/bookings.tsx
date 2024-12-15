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

export function Bookings() {
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

  return (
    <Box sx={bookingsStyles.container}>
      <Typography variant="h4" sx={bookingsStyles.header}>
        {t(TRANSLATION_KEYS.bookings.my_bookings)}
      </Typography>

      {data?.data.length === 0 ? (
        <Box sx={bookingsStyles.emptyState}>
          <Typography variant="h6" color="text.secondary">
            {t(TRANSLATION_KEYS.bookings.no_bookings)}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {t(TRANSLATION_KEYS.bookings.you_have_no_bookings)}
          </Typography>
        </Box>
      ) : (
        data?.data.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      )}
    </Box>
  );
}
