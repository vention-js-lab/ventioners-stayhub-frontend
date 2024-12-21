import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { singlePropertyStyles } from './single-property.route.styles';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { type User } from '#/types';
import { type Dayjs } from 'dayjs';
import { useState } from 'react';
import { useCreateBooking } from '#/modules/bookings/api/create-booking';
import { toast } from 'react-toastify';
import { useGetBookings } from '#/modules/bookings/api';
import { useAccommodationById } from '../api/get-accommodation';
import { type Accommodation } from '#/modules/home/types/accommodation.type';
import { HeaderComponent } from '#/modules/home/components/header';
import { Property, PropertyImagesWrapper, PropertyReview, ReviewForm } from '../component';
import { CustomMap } from '#/modules/home/components/map/mapComponent';
import { APIProvider } from '@vis.gl/react-google-maps';
import { loadingSpinnerStyles } from '#/styles';
import { canLeaveReview } from '#/utils/booking-status.util';
import { useAppSelector } from '#/redux/hooks';

// eslint-disable-next-line complexity
export function SinglePropertyRoute() {
  const isMobile = useMediaQuery('(max-width:700px)');
  const { id } = useParams();
  const createBooking = useCreateBooking();
  const { data: bookings, isLoading: bookingLoading } = useGetBookings();
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);
  const user = useAppSelector((state) => state.auth.user);
  const { data, error, isLoading } = useAccommodationById(id || '');
  if (!id) {
    return <div>Error: Property ID is not provided.</div>;
  }

  if (isLoading || bookingLoading) {
    return (
      <Box sx={loadingSpinnerStyles.container}>
        <CircularProgress sx={loadingSpinnerStyles.spinner} />
      </Box>
    );
  }

  if (!data) {
    return (
      <>
        <HeaderComponent />
        <Alert severity="info" sx={singlePropertyStyles.alert}>
          Oops! We couldn&apos;t find any data. Please try again later.
        </Alert>
      </>
    );
  }
  if (error instanceof Error) {
    return (
      <>
        <HeaderComponent />
        <Alert severity="error" sx={singlePropertyStyles.alert}>
          Unexpected error occurred: {error.message}
        </Alert>
      </>
    );
  }

  const accommodationData: Accommodation = data.data;

  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates.');
      return;
    }

    createBooking.mutate({
      checkInDate: checkInDate.add(14, 'hour').toDate(),
      checkOutDate: checkOutDate.add(12, 'hour').toDate(),
      accommodationId: id,
      numberOfGuests: 1,
    });
  };

  const coordinates = {
    lat: accommodationData.locationCoordinates.coordinates[1],
    lng: accommodationData.locationCoordinates.coordinates[0],
  };
  const reviews = accommodationData.reviews.map(
    (review: { id: string; user: Pick<User, 'firstName' | 'lastName'>; comment: string; rating: number }) => ({
      id: review.id,
      user: review.user,
      name: `${review.user.firstName} ${review.user.lastName}`,
      comment: review.comment,
      rating: review.rating,
    })
  );
  const images = accommodationData.images.sort((a, b) => a.order - b.order);
  const ownerName = `${accommodationData.owner.firstName} ${accommodationData.owner.lastName}`;
  let userHasBooking = false;
  if (bookings) {
    userHasBooking = canLeaveReview(bookings.data, reviews, accommodationData, user?.id);
  }
  return (
    <>
      <HeaderComponent />
      <Box sx={singlePropertyStyles.mainContainer}>
        <Box
          sx={{
            width: isMobile ? '100%' : 'lg',
            padding: isMobile ? '0' : '24px',
          }}
        >
          <Box sx={singlePropertyStyles.titleBox}>
            <Typography variant="h3" sx={singlePropertyStyles.titleText}>
              {accommodationData.name}
            </Typography>
          </Box>

          <PropertyImagesWrapper images={images} />
          <Property
            owner={ownerName}
            amenities={accommodationData.amenities}
            description={accommodationData.description}
            pricePerNight={accommodationData.pricePerNight}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            onReserve={handleReserve}
            numberOfGuests={accommodationData.numberOfGuests}
          />
          <Divider sx={singlePropertyStyles.customDivider} />
          {userHasBooking ? (
            <>
              <ReviewForm accommodationId={id} />
              <Divider sx={singlePropertyStyles.customDivider} />
            </>
          ) : null}
          <PropertyReview reviews={reviews} overallRating={accommodationData.overallRating} />
          <Divider sx={singlePropertyStyles.customDivider} />
          <Box sx={singlePropertyStyles.mapStyle}>
            <Typography variant="h6" sx={singlePropertyStyles.locationText}>
              {accommodationData.location}
            </Typography>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
              <CustomMap isLoading={isLoading} data={{ data: [accommodationData] }} coordinates={coordinates} />
            </APIProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
}
