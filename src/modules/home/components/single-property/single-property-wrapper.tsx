import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';
import { singlePropertyStyles } from './single-property-wrapper.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link, useParams } from 'react-router-dom';

interface LargeViewProps {
  images: string[];
  id: string;
}

function LargeView({ images, id }: LargeViewProps) {
  return (
    <Box sx={singlePropertyStyles.mainBox}>
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <CardMedia component="img" image={images[0]} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
      </Box>

      <Box sx={singlePropertyStyles.imageBox}>
        <Box>
          <CardMedia component="img" image={images[1]} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Box>
          <CardMedia component="img" image={images[2]} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Box>
          <CardMedia component="img" image={images[3]} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Box>
          <CardMedia component="img" image={images[4]} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
      </Box>
      <Link to={`/property/${id}/images`} style={singlePropertyStyles.viewMoreLink}>
        View All Photos
      </Link>
    </Box>
  );
}

function MobileView({ images, id }: LargeViewProps) {
  return (
    <Box>
      <Swiper loop={true} pagination={{ clickable: true }}>
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Link to={`/property/${id}/images`}>
              <CardMedia
                component="img"
                image={image}
                alt="Property Image"
                sx={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2' }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

function PropertyImagesWrapper({ images }: { images: string[] }) {
  const isMobile = useMediaQuery('(max-width:700px)');
  const { id } = useParams<{ id: string }>();

  if (!id) return null;

  return <Box>{isMobile ? <MobileView images={images} id={id} /> : <LargeView images={images} id={id} />}</Box>;
}

export { PropertyImagesWrapper };
