import { useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { imageUploaderStyles } from './styles';
import type { UseFormSetValue, UseFormGetValues, UseFormRegister, FieldValues } from 'react-hook-form';
import { type AccommodationFormData } from '#/zod';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

type Props<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
};

export function ImageUploader({ setValue, getValues, register }: Props<AccommodationFormData>) {
  const { t } = useTranslation('create-accommodation');
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
        {t(TRANSLATION_KEYS.create_accommodation.upload_images)}
      </Typography>

      <Box sx={imageUploaderStyles.uploadContainer}>
        <input
          {...rest}
          type="file"
          onChange={(e) => {
            const currentImages = getValues('images');
            const newImages = [];
            const fileList = e.target.files as FileList;
            for (let i = 0; i < fileList.length; ++i) {
              newImages.push(fileList.item(i) as File);
            }

            setValue('images', [...currentImages, ...newImages], { shouldValidate: true });
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

        <Typography variant="h6">{t(TRANSLATION_KEYS.create_accommodation.drag_and_drop)}</Typography>

        <Typography variant="body2" color="text.secondary">
          {t(TRANSLATION_KEYS.create_accommodation.images_selected, { count: getValues('images').length })}
        </Typography>

        <Button variant="contained" onClick={handleUploadClick} sx={imageUploaderStyles.uploadButton}>
          {t(TRANSLATION_KEYS.create_accommodation.select_images)}
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
