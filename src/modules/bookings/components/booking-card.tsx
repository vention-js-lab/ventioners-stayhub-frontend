import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import LocationIcon from '@mui/icons-material/LocationOn';
import PriceIcon from '@mui/icons-material/AttachMoney';

import { type Booking } from '../types/booking.type';
import { type Accommodation } from '../../home/types/accommodation.type';
import { bookingCardStyles } from './booking-card.styles';
import { useNavigate } from 'react-router-dom';
import { BookingStatus } from '../types/booking-status.constant';
import dayjs from 'dayjs';

type BookingsWithAccommodation = Booking & {
  accommodation: Accommodation;
};

type BookingCardProps = {
  booking: BookingsWithAccommodation;
};

export function BookingCard({ booking }: BookingCardProps) {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return dayjs(date).format('MMMM D [year] YYYY');
  };

  const getStatusColor = (status: BookingStatus) => {
    if (status === BookingStatus.Pending) return 'warning';
    if (status === BookingStatus.Confirmed) return 'success';
    if (status === BookingStatus.CheckedIn || status === BookingStatus.CheckedOut) return 'info';
    return 'default';
  };

  const handleAccommodationClick = () => {
    navigate(`/property/${booking.accommodation.id}`);
  };

  return (
    <Card variant="outlined" sx={bookingCardStyles.container}>
      <CardContent sx={bookingCardStyles.content}>
        <Box sx={bookingCardStyles.contextBox}>
          <Box>
            <Typography variant="h6" component="div" sx={bookingCardStyles.accommodationTitle} onClick={handleAccommodationClick}>
              <LocationIcon /> {booking.accommodation.name}
            </Typography>
          </Box>

          <Box sx={bookingCardStyles.detailsContainer}>
            <Box sx={bookingCardStyles.dateContainer}>
              <Box sx={bookingCardStyles.detailBox}>
                <CalendarIcon color="action" />
                <Typography variant="body2">Check-in: {formatDate(booking.checkInDate)}</Typography>
              </Box>
              <Box sx={bookingCardStyles.detailBox}>
                <CalendarIcon color="action" />
                <Typography variant="body2">Check-out: {formatDate(booking.checkOutDate)}</Typography>
              </Box>
            </Box>

            <Box sx={bookingCardStyles.detailContainer}>
              <Box sx={bookingCardStyles.detailBox}>
                <PersonIcon color="action" />
                <Typography variant="body2">Guests: {booking.numberOfGuests}</Typography>
              </Box>
              <Box sx={bookingCardStyles.detailBox}>
                <PriceIcon color="action" />
                <Typography variant="body2">Total Price: ${booking.totalPrice}</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={bookingCardStyles.statusContainer}>
              <Chip label={booking.status} color={getStatusColor(booking.status)} variant="outlined" />
              <Typography variant="caption" color="text.secondary">
                Booked on: {formatDate(booking.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
