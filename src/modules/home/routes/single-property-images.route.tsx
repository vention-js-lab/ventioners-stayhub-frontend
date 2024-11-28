import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface SinglePropertyImagesProps {
  images: string[];
  onClose: () => void;
}

export function SinglePropertyImages({ images, onClose }: SinglePropertyImagesProps) {
  const isMobile = useMediaQuery('(max-width:700px)');

  return (
    <Box sx={{ padding: 2 }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, left: 10 }}>
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
