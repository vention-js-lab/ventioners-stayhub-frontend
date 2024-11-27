// import { Box, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { HeaderComponent } from '../components/header';
import { PropertyImagesWrapper } from '../components/singleProperty/singlePropertyWrapper';

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
  amenities: ['Free Wi-Fi', 'Air Conditioning', 'Parking'],
  category: 'Studio',
  rating: 4.5,
  likes: 15,
  createdAt: '2024-11-01T12:30:00.000Z',
  updatedAt: '2024-11-02T14:00:00.000Z',
};

const mainContainer = { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1240px', margin: 'auto' };

export function SinglePropertyRoute() {
  const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <>
      <HeaderComponent />
      <Box sx={mainContainer}>
        <Box
          sx={{
            width: isMobile ? '100%' : 'lg',
            padding: isMobile ? '0' : '24px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
              },
              fontWeight: 600,
              textAlign: 'left',
              margin: '16px',
            }}
          >
            {accommodation.name}
          </Typography>

          <PropertyImagesWrapper images={accommodation.images} />
        </Box>
      </Box>
    </>
  );
}
