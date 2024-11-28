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
import { accommodation } from '../temp-data/single-accommodation';

export function SinglePropertyRoute() {
  const isMobile = useMediaQuery('(max-width:700px)');
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
              {accommodation.name}
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

          <PropertyImagesWrapper images={accommodation.images} />
          <Property
            owner={accommodation.owner}
            amenities={accommodation.amenities}
            description={accommodation.description}
            pricePerNight={accommodation.pricePerNight}
          />
          <Divider sx={{ my: 4, mx: 0 }} />
          <PropertyReview reviews={accommodation.reviews} overallRating={accommodation.overallRating} />
          <Divider sx={{ my: 4, mx: 2 }} />
        </Box>
      </Box>
    </>
  );
}
