import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';
import { singlePropertyStyles } from './single-property-wrapper.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';
import { SinglePropertyImages } from './single-property-images.route';
import Dialog from '@mui/material/Dialog';
import { type Image } from '../../home/types/image.type';

interface LargeViewProps {
  images: Image[];
  onImageClick: () => void;
}

function LargeView({ images, onImageClick }: LargeViewProps) {
  return (
    <Box sx={singlePropertyStyles.mainBox}>
      <Box sx={{ width: { xs: '100%', md: '50%' } }}>
        <CardMedia component="img" image={images[0].url} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
      </Box>

      <Box sx={singlePropertyStyles.imageBox}>
        <Box>
          <CardMedia component="img" image={images[1].url} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Box>
          <CardMedia component="img" image={images[2].url} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Box>
          <CardMedia component="img" image={images[3].url} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Box>
          <CardMedia component="img" image={images[4].url} alt="Property Image" sx={{ objectFit: 'cover', height: '100%' }} />
        </Box>
      </Box>
      <Box onClick={onImageClick} style={singlePropertyStyles.viewMoreLink}>
        View All Photos
      </Box>
    </Box>
  );
}

function MobileView({ images, onImageClick }: LargeViewProps) {
  return (
    <Box>
      <Swiper loop={true} pagination={{ clickable: true }}>
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <CardMedia
              component="img"
              image={image.url}
              alt="Property Image"
              sx={{ objectFit: 'cover', width: '100%', aspectRatio: '3/2', cursor: 'pointer' }}
              onClick={onImageClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

function PropertyImagesWrapper({ images }: { images: Image[] }) {
  const isMobile = useMediaQuery('(max-width:700px)');
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box>
      {isMobile ? (
        <MobileView images={images} onImageClick={handleOpenModal} />
      ) : (
        <LargeView images={images} onImageClick={handleOpenModal} />
      )}

      <Dialog open={openModal} onClose={handleCloseModal} fullScreen={true} maxWidth="lg" fullWidth={true}>
        <SinglePropertyImages images={images} onClose={handleCloseModal} />
      </Dialog>
    </Box>
  );
}

export { PropertyImagesWrapper };
