// import { Box, CardMedia, IconButton, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

export function SinglePropertyImages() {
  const isMobile = useMediaQuery('(max-width:700px)');
  const { id } = useParams();
  const navigate = useNavigate();

  const images = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/8798df68-ab43-4de2-8a10-d7ffdb7012b3.jpeg?im_w=1200&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/586ef117-5597-4af9-9cff-d65059e4af56.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/99105372-a661-43f2-9cf2-2efa504514ff.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/6776946c-bf8e-4b17-9c90-29760d6490af.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/2282bb35-246f-49a3-82a9-fe5e23ac2039.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/2282bb35-246f-49a3-82a9-fe5e23ac2039.jpeg?im_w=720&im_format=avif',
    'https://a0.muscache.com/im/pictures/miso/Hosting-53680321/original/2282bb35-246f-49a3-82a9-fe5e23ac2039.jpeg?im_w=720&im_format=avif',
  ];

  const handleBack = () => {
    navigate(`/property/${id}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <IconButton onClick={handleBack} sx={{ position: 'absolute', top: 10, left: 10 }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Property Images
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 2,
          padding: isMobile ? '0' : '16px',
        }}
      >
        {images.map((image) => (
          <CardMedia
            key={image}
            component="img"
            image={image}
            alt={`Property Image`}
            sx={{
              width: '100%',
              objectFit: 'cover',
              borderRadius: 2,
              aspectRatio: '3/2',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
