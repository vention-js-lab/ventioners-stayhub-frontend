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
import { useCreateBooking } from '#/modules/home/api/create-booking.ts';
import { toast } from 'react-toastify';

export function SinglePropertyRoute() {
  const isMobile = useMediaQuery('(max-width:700px)');
  const { id } = useParams();
  const createBooking = useCreateBooking();

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
          />
          <Divider sx={{ my: 4, mx: 0 }} />
          <PropertyReview reviews={reviews} overallRating={accommodationData.overallRating} />
          <Divider sx={{ my: 4, mx: 2 }} />
        </Box>
      </Box>
    </>
  );
}
