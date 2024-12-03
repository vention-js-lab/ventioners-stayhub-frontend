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

export function SinglePropertyRoute() {
  const isMobile = useMediaQuery('(max-width:700px)');
  const { id } = useParams();

  const { data, error, isLoading } = useAccommodationById(id || '');

  if (!id) {
    return <div>Error: Property ID is not provided.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const accommodationData: Accommodation = data.data;

  const reviews = accommodationData.reviews.map(
    (review: { id: string; user: { firstName: string; lastName: string }; comment: string; rating: number }) => ({
      id: review.id,
      name: `${review.user.firstName} ${review.user.lastName}`,
      comment: review.comment,
      rating: review.rating,
    })
  );

  const images = accommodationData.images.map((image: { id: string; url: string }) => image.url);
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
          />
          <Divider sx={{ my: 4, mx: 0 }} />
          <PropertyReview reviews={reviews} overallRating={accommodationData.overallRating} />
          <Divider sx={{ my: 4, mx: 2 }} />
        </Box>
      </Box>
    </>
  );
}
