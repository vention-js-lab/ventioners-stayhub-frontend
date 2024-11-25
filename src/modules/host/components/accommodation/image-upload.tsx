import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAccommodation } from '#/modules/host/context';
import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import { imageUploadStyles } from '../../styles';
import { MAX_IMAGE_UPLOAD } from '../../constants';

export function ImageUpload() {
  const { data, updateData } = useAccommodation();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = MAX_IMAGE_UPLOAD - data.images.length;

    if (remainingSlots <= 0) {
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);

    const uploadedUrls = filesToUpload.map((file) => URL.createObjectURL(file));
    updateData({ images: [...data.images, ...uploadedUrls] });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...data.images];
    newImages.splice(index, 1);
    updateData({ images: newImages });
  };

  const isUploadDisabled = data.images.length >= MAX_IMAGE_UPLOAD;

  return (
    <Box sx={imageUploadStyles.container}>
      <Typography variant="h4" gutterBottom={true} sx={imageUploadStyles.title}>
        Add photos of your place
      </Typography>
      <Box sx={imageUploadStyles.imageUploadSection}>
        <Input
          inputProps={{
            accept: 'image/*',
            multiple: true,
          }}
          sx={imageUploadStyles.hiddenInput}
          id="image-upload"
          type="file"
          onChange={handleImageUpload}
          disabled={isUploadDisabled}
        />
        <label htmlFor="image-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={imageUploadStyles.uploadButton}
            disabled={isUploadDisabled}
          >
            Upload Images
          </Button>
        </label>
        <Typography
          variant="body2"
          sx={{
            ...imageUploadStyles.imageCount,
            ...(isUploadDisabled && imageUploadStyles.imageCountError),
          }}
        >
          {data.images.length} of {MAX_IMAGE_UPLOAD} images uploaded
        </Typography>

        <ImageList cols={3} sx={imageUploadStyles.imageList}>
          {data.images.map((url, index) => (
            <ImageListItem key={Math.floor(Math.random() * 100)} sx={imageUploadStyles.imageItem}>
              <img src={url} alt={`Upload ${index + 1}`} style={imageUploadStyles.image} />
              <IconButton className="deleteButton" sx={imageUploadStyles.deleteButton} onClick={() => handleRemoveImage(index)}>
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}
