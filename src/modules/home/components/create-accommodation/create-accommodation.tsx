import { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { type AccommodationFormData } from '../../types/accommodation-form-data.interface';
import { createAccommodationStyles } from './styles';
import { AccommodationDetailsForm } from './accommodation-details-form.tsx';
import { ImageUploader } from './image-uploader.tsx';
import { useCreateAccommodation } from '#/modules/home/api/create-accommodation.ts';
import { useAccommodation } from '#/modules/home/contexts';
import { ENDPOINTS } from '#/modules/auth/constants';

export function CreateAccommodation() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<AccommodationFormData>({
    name: '',
    description: '',
    location: '',
    pricePerNight: 0,
    categoryId: '',
    images: [],
    amenityIds: [],
  });

  const { data, basics } = useAccommodation();

  const createAccommodation = useCreateAccommodation();

  const handleNext = () => {
    if (activeStep === 0) {
      const { name, description, location, pricePerNight, categoryId } = formData;
      if (!name || !description || !location || !pricePerNight || !categoryId) {
        toast.error('Please fill all required fields');
        return;
      }

      setActiveStep(1);
    } else if (activeStep === 1) {
      const imagesToUpload = data.images.filter((image) => image instanceof File);

      if (imagesToUpload.length === 0) {
        toast.error('Please upload at least one image');
        return;
      }

      const creationPayload = {
        ...data,
        ...basics,
        images: imagesToUpload,
      };

      createAccommodation.mutate(creationPayload, {
        onSuccess: () => {
          toast.success('Accommodation created successfully!');
          window.location.href = ENDPOINTS.root;
        },
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const updateFormData = (updates: Partial<AccommodationFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <Box sx={createAccommodationStyles.container}>
      <Stepper activeStep={activeStep} sx={createAccommodationStyles.stepper}>
        <Step>
          <StepLabel>Accommodation Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Upload Images</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && <AccommodationDetailsForm formData={formData} updateFormData={updateFormData} />}
      {activeStep === 1 && <ImageUploader />}

      <Box sx={createAccommodationStyles.buttonGroup}>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={createAccommodation.isPending} sx={createAccommodationStyles.button}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={createAccommodation.isPending}
          sx={createAccommodationStyles.button}
        >
          {activeStep === 1 ? (createAccommodation.isPending ? 'Creating...' : 'Create') : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
