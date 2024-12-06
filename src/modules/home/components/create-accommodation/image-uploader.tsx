import { useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { imageUploaderStyles } from './styles';
import type { UseFormSetValue, UseFormGetValues, UseFormRegister, FieldValues } from 'react-hook-form';
import { type AccommodationFormData } from '../../types/accommodation-form-data.interface';

type Props<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
};

export function ImageUploader({ setValue, getValues, register }: Props<AccommodationFormData>) {
  const fileInputRef = useRef<HTMLInputElement>();
  const { ref, ...rest } = register('images');

  function handleRemoveImage(indexToRemove: number) {
    const updatedImages = getValues('images').filter((_, index) => index !== indexToRemove);
    setValue('images', updatedImages, { shouldValidate: true });
  }

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
          {...rest}
          type="file"
          onChange={(e) => {
            const currentImages = getValues('images');
            const newImage = e.target.files?.item(0);

            if (newImage) {
              setValue('images', [...currentImages, newImage], { shouldValidate: true });
            }
          }}
          accept="image/*"
          multiple={true}
          style={{ display: 'none' }}
          ref={(e: HTMLInputElement) => {
            ref(e);
            fileInputRef.current = e;
          }}
        />

        <CloudUploadIcon color="primary" sx={{ fontSize: 64 }} />

        <Typography variant="h6">Drag and drop or click to upload</Typography>

        <Typography variant="body2" color="text.secondary">
          {getValues('images').length} images selected
        </Typography>

        <Button variant="contained" onClick={handleUploadClick} sx={imageUploaderStyles.uploadButton}>
          Select Images
        </Button>
      </Box>

      {getValues('images').length > 0 && (
        <Box sx={imageUploaderStyles.imageGrid}>
          {getValues('images').map((image, index) => {
            const imageUrl = typeof image === 'string' ? image : URL.createObjectURL(image);
            return (
              <Box key={Math.floor(Math.random() * 100) + index} sx={imageUploaderStyles.imageContainer}>
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
