import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HeaderComponent } from '../components/header';
import { PropertyImagesWrapper } from '../components/single-property/single-property-wrapper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import { singlePropertyStyles } from './single-property.route.styles';
import { Property } from '../components/single-property/single-property-amenity';
import { PropertyReview } from '../components/single-property/single-property-review';
import Divider from '@mui/material/Divider';
import { useAccommodationById } from '../api/get-accommodation';
import { useParams } from 'react-router-dom';
import { type Accommodation } from '../types/accommodation.type';
import { type User } from '#/types';
import { type Image } from '../types/image.type';
import { type Dayjs } from 'dayjs';
import { useState } from 'react';
import { useCreateBooking } from '#/modules/bookings/api/create-booking';
import { toast } from 'react-toastify';
import { MapModal } from '../components/map/mapModal';
import { ReviewForm } from '../components/single-property/single-property-rating';
import { useUserBookings } from '#/modules/bookings/api/get-booking-record';

export function SinglePropertyRoute() {
  const isMobile = useMediaQuery('(max-width:700px)');
  const { id } = useParams();
  const createBooking = useCreateBooking();
  const { data: bookings } = useUserBookings();
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  const { data, error, isLoading } = useAccommodationById(id || '');

  if (!id) {
    return <div>Error: Property ID is not provided.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const accommodationData: Accommodation = data.data;
  const handleReserve = () => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Please select check-in and check-out dates.');
      return;
    }

    createBooking.mutate({
      checkInDate: checkInDate.toDate(),
      checkOutDate: checkOutDate.toDate(),
      accommodationId: id,
      totalPrice: accommodationData.pricePerNight,
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
      name: `${review.user.firstName} ${review.user.lastName}`,
      comment: review.comment,
      rating: review.rating,
    })
  );
  const images = accommodationData.images.map((image: Image) => image.url);
  const ownerName = `${accommodationData.owner.firstName} ${accommodationData.owner.lastName}`;
  const userHasBooking = bookings && bookings.data.length > 0;

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
            <Box sx={singlePropertyStyles.titleActionBox}>
              <Box sx={singlePropertyStyles.titleActionItem}>
                <IosShareIcon sx={{ fontSize: '16px' }} />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Share</Typography>
              </Box>
              <Box sx={singlePropertyStyles.titleActionItem}>
                <FavoriteBorderIcon sx={{ fontSize: '16px' }} />
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>Save</Typography>
              </Box>
            </Box>
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
          <Divider sx={{ my: 4, mx: 0 }} />
          {userHasBooking ? (
            <>
              <ReviewForm accommodationId={id} />
              <Divider sx={{ my: 4, mx: 0 }} />
            </>
          ) : null}
          <PropertyReview reviews={reviews} overallRating={accommodationData.overallRating} />

          <MapModal isLoading={isLoading} data={[accommodationData]} coordinates={coordinates} />
        </Box>
      </Box>
    </>
  );
}
