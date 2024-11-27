import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HeaderComponent } from '../components/header';
import { PropertyImagesWrapper } from '../components/singleProperty/singlePropertyWrapper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import { singlePropertyStyles } from './singleProperty.route.styles';
import SinglePropertyAmenity from '../components/singleProperty/singlePropertyAmenity';
import SinglePropertyReview from '../components/singleProperty/singlePropertyReview';
import Divider from '@mui/material/Divider';

const accommodation = {
  id: '1a9c2d6f-4690-4a3a-9148-e25f02c0d7d1',
  name: 'Cozy Studio Apartment',
  description: 'A beautiful and cozy studio apartment located in the heart of the city, perfect for short stays.',
  images: [
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/8798df68-ab43-4de2-8a10-d7ffdb7012b3.jpeg?im_w=1200&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/586ef117-5597-4af9-9cff-d65059e4af56.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/99105372-a661-43f2-9cf2-2efa504514ff.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/6776946c-bf8e-4b17-9c90-29760d6490af.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/2282bb35-246f-49a3-82a9-fe5e23ac2039.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/2282bb35-246f-49a3-82a9-fe5e23ac2039.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/2282bb35-246f-49a3-82a9-fe5e23ac2039.jpeg?im_w=720&im_format=avif',
  ],
  location: 'New York, USA',
  pricePerNight: 150.0,
  amenities: [
    { id: '1', name: 'Extraordinary Home', description: 'A masterpiece of design and comfort.' },
    { id: '2', name: 'Private Pool', description: 'Relax in the tranquil waters of your own pool.' },
    { id: '3', name: 'Art Studio', description: 'Unleash your creativity in a spacious studio.' },
    { id: '4', name: 'Luxurious Spa', description: 'Rejuvenate yourself with premium spa treatments.' },
    { id: '5', name: 'Cinema Room', description: 'Enjoy your favorite movies in a private cinema.' },
    { id: '6', name: 'Game Room', description: 'Have fun with state-of-the-art gaming consoles.' },
    { id: '7', name: 'Outdoor Kitchen', description: 'Cook outdoors with a fully equipped kitchen.' },
    { id: '8', name: 'Private Gym', description: 'Stay fit with top-of-the-line gym equipment.' },
    { id: '9', name: 'Tennis Court', description: 'Practice your skills on a professional tennis court.' },
    { id: '10', name: 'Beach Access', description: 'Direct access to a pristine private beach.' },
    { id: '11', name: 'Wine Cellar', description: 'Store and enjoy your wine collection.' },
  ],
  category: 'Studio',
  owner: 'John Doe',
  reviews: [
    {
      id: '1',
      name: 'Alice',
      comment:
        'Great place to stay! Great place to stay! Great place to stay! Great place to stay! Great place to stay! Great place to stay! Great place to stay!',
      rating: 5,
    },
    { id: '2', name: 'Bob', comment: 'The best apartment I have ever stayed in!', rating: 4.5 },
    { id: '3', name: 'Charlie', comment: 'Highly recommended!', rating: 5 },
    { id: '4', name: 'David', comment: 'Amazing experience!', rating: 5 },
    { id: '5', name: 'Eve', comment: 'Perfect in every way!', rating: 5 },
    { id: '6', name: 'Frank', comment: 'I would definitely stay here again!', rating: 5 },
    { id: '7', name: 'Grace', comment: 'The ideal place for a relaxing getaway.', rating: 5 },
    { id: '8', name: 'Harry', comment: 'An unforgettable experience!', rating: 4 },
    { id: '9', name: 'Ivy', comment: 'Absolutely stunning!', rating: 3 },
    { id: '10', name: 'Jack', comment: 'A dream come true!', rating: 5 },
  ],
  createdAt: '2024-11-01T12:30:00.000Z',
  updatedAt: '2024-11-02T14:00:00.000Z',
};

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
          <SinglePropertyAmenity
            owner={accommodation.owner}
            amenities={accommodation.amenities}
            description={accommodation.description}
            pricePerNight={accommodation.pricePerNight}
          />
          <Divider sx={{ my: 4, mx: 2 }} />
          <SinglePropertyReview reviews={accommodation.reviews} />
          <Divider sx={{ my: 4, mx: 2 }} />
        </Box>
      </Box>
    </>
  );
}
