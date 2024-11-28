import { useRef, type ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { imageUploaderStyles } from './styles';
import { useAccommodationContext } from '#/modules/home/contexts';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data, updateData } = useAccommodationContext();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);

    const newPreviews = files.filter((file) => file instanceof File);

    updateData({
      images: [...data.images, ...newPreviews],
    });

    if (fileInputRef.current && 'value' in fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = data.images.filter((_, i) => i !== index);
    updateData({ images: updatedImages });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={imageUploaderStyles.container}>
      <Typography variant="h4" gutterBottom={true}>
        Upload Images
      </Typography>

      <Box sx={imageUploaderStyles.uploadContainer}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={true}
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        <CloudUploadIcon color="primary" sx={{ fontSize: 64 }} />
        <Typography variant="h6">Drag and drop or click to upload</Typography>
        <Typography variant="body2" color="text.secondary">
          {data.images.length} images selected
        </Typography>
        <Button variant="contained" onClick={handleUploadClick} sx={imageUploaderStyles.uploadButton}>
          Select Images
        </Button>
      </Box>

      {data.images.length > 0 && (
        <Box sx={imageUploaderStyles.imageGrid}>
          {data.images.map((image, index) => {
            const imageUrl = URL.createObjectURL(image);

            return (
              <Box key={image.name} sx={imageUploaderStyles.imageContainer}>
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleRemoveImage(index)}
                  sx={imageUploaderStyles.removeButton}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
