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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { type Booking } from '../types/booking.type';
import { type Accommodation } from '../../home/types/accommodation.type';
import { bookingCardStyles } from './booking-card.styles';
import { useNavigate } from 'react-router-dom';
import { BookingStatus } from '../types/booking-status.constant';
import dayjs from 'dayjs';
import { useState } from 'react';
import { CancelBookingModal } from './cancel-booking-modal';

type BookingsWithAccommodation = Booking & {
  accommodation: Accommodation;
};

type BookingCardProps = {
  booking: BookingsWithAccommodation;
};

export function BookingCard({ booking }: BookingCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isBookingStatusConfirmedOrPending =
    booking.status === BookingStatus.Confirmed || booking.status === BookingStatus.Pending;
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date: Date) => {
    return dayjs(date).format('MMMM D, YYYY');
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
          <Box sx={bookingCardStyles.titleBar}>
            <Typography variant="h6" component="div" sx={bookingCardStyles.accommodationTitle} onClick={handleAccommodationClick}>
              <LocationIcon /> {booking.accommodation.name}
            </Typography>
            {isBookingStatusConfirmedOrPending ? (
              <IconButton onClick={handleMenuOpen} sx={bookingCardStyles.moreOptionsButton}>
                <MoreVertIcon />
              </IconButton>
            ) : null}
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
        {isBookingStatusConfirmedOrPending ? (
          <>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => setIsModalOpen(true)}>Cancel Booking</MenuItem>
            </Menu>
            <CancelBookingModal
              bookingId={booking.id}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              hasRefund={booking.status === BookingStatus.Confirmed}
            />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
