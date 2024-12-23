import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import LocationIcon from '@mui/icons-material/LocationOn';
import PriceIcon from '@mui/icons-material/AttachMoney';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { BookingStatus } from '../types/booking-status.constant';
import dayjs from 'dayjs';
import { CancelBookingModal } from './cancel-booking-modal';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { formatBookingStatus } from '#/utils';
import { bookingCardStyles } from './booking-card.styles';
import { type Booking } from '../types';
import { type Accommodation } from '#/modules/home/types/accommodation.type';
import React, { useState } from 'react';
import Divider from '@mui/material/Divider';

type BookingsWithAccommodation = Booking & {
  accommodation: Accommodation;
};

type BookingCardProps = {
  booking: BookingsWithAccommodation;
};

export function BookingCard({ booking }: BookingCardProps) {
  const { t } = useTranslation('bookings');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isBookingStatusConfirmedOrPending =
    booking.status === BookingStatus.Confirmed || booking.status === BookingStatus.Pending;
  const isMenuOpen = Boolean(anchorEl);

  const mainImage =
    booking.accommodation.images.length > 0
      ? booking.accommodation.images.find((img) => img.order === 0) || booking.accommodation.images[0]
      : null;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (date: Date) => {
    const locale = localStorage.getItem('i18nextLng');
    return dayjs(date)
      .locale(locale || 'en')
      .format(locale === 'ru' ? 'D MMMM, YYYY' : 'MMMM D, YYYY');
  };

  const getStatusColor = (status: BookingStatus): 'warning' | 'success' | 'info' | 'default' => {
    if (status === BookingStatus.Pending) return 'warning';
    if (status === BookingStatus.Confirmed) return 'success';
    if (status === BookingStatus.CheckedIn || status === BookingStatus.CheckedOut) return 'info';
    return 'default';
  };

  const handleAccommodationClick = () => {
    navigate(`/property/${booking.accommodation.id}`);
  };

  return (
    <Card sx={bookingCardStyles.container}>
      <Box sx={bookingCardStyles.imageContainer}>
        {mainImage ? (
          <Box
            component="img"
            src={mainImage.url}
            alt={booking.accommodation.name}
            sx={bookingCardStyles.image}
            onClick={handleAccommodationClick}
          />
        ) : (
          <Box sx={bookingCardStyles.noImage}>
            <Typography variant="body2">No image available</Typography>
          </Box>
        )}
      </Box>

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
                <Typography variant="body2">
                  {t(TRANSLATION_KEYS.bookings.card.check_in)} {formatDate(booking.checkInDate)}
                </Typography>
              </Box>
              <Box sx={bookingCardStyles.detailBox}>
                <CalendarIcon color="action" />
                <Typography variant="body2">
                  {t(TRANSLATION_KEYS.bookings.card.check_out)} {formatDate(booking.checkOutDate)}
                </Typography>
              </Box>
            </Box>

            <Box sx={bookingCardStyles.detailContainer}>
              <Box sx={bookingCardStyles.detailBox}>
                <PersonIcon color="action" />
                <Typography variant="body2">
                  {t(TRANSLATION_KEYS.bookings.card.guests)} {booking.numberOfGuests}
                </Typography>
              </Box>
              <Box sx={bookingCardStyles.detailBox}>
                <PriceIcon color="action" />
                <Typography variant="body2">
                  {t(TRANSLATION_KEYS.bookings.card.total_price)} ${booking.totalPrice}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={bookingCardStyles.statusContainer}>
              <Chip
                label={
                  t(
                    TRANSLATION_KEYS.bookings.status_display[
                      booking.status.toLowerCase() as keyof typeof TRANSLATION_KEYS.bookings.status_display
                    ]
                  ) || formatBookingStatus(booking.status)
                }
                color={getStatusColor(booking.status)}
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {t(TRANSLATION_KEYS.bookings.card.booked_on)} {formatDate(booking.createdAt)}
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
              <MenuItem onClick={() => setIsModalOpen(true)}>{t(TRANSLATION_KEYS.bookings.cancel.button)}</MenuItem>
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

export default BookingCard;
