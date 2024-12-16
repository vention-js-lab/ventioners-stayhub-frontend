import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';

import { type AccommodationFormData } from '#/zod';
import { createAccommodationStyles } from './styles';
import { AccommodationDetailsForm } from './accommodation-details-form.tsx';
import { ImageUploader } from './image-uploader.tsx';
import { useCreateAccommodation } from '#/modules/property-host/api/create-accommodation.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAccomodationSchema } from '#/zod/accommodation-create.schema.ts';
import { getFirstErrorMessage } from '#/utils/get-first-error-message.util.ts';
import { toast } from 'react-toastify';
import { latitude, longitude } from '#/modules/home/constants/map.constant.ts';

export function CreateAccommodation() {
  const [activeStep, setActiveStep] = useState<0 | 1>(0);
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    trigger,
    control,
  } = useForm<AccommodationFormData>({
    defaultValues: {
      pricePerNight: 0,
      numberOfGuests: 4,
      categoryId: '',
      images: [],
      amenities: [],
      locationCoordinates: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    },
    resolver: zodResolver(createAccomodationSchema),
  });
  const createAccommodation = useCreateAccommodation();

  useEffect(() => {
    trigger();
  }, [trigger]);

  async function handleNextOrBack() {
    if (activeStep === 0) {
      const isValid = await trigger([
        'name',
        'description',
        'location',
        'pricePerNight',
        'numberOfGuests',
        'categoryId',
        'amenities',
        'locationCoordinates',
      ]);

      if (isValid) {
        setActiveStep(1);
      } else {
        toast.error(getFirstErrorMessage<AccommodationFormData>(errors));
      }
    } else {
      setActiveStep(0);
    }
  }

  async function handleCreateAccommodation() {
    if (await trigger()) {
      const data = getValues();
      createAccommodation.mutate(data);
    } else {
      toast.error(getFirstErrorMessage<AccommodationFormData>(errors));
    }
  }

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

      {activeStep === 0 && (
        <AccommodationDetailsForm setValue={setValue} getValues={getValues} register={register} control={control} />
      )}
      {activeStep === 1 && <ImageUploader setValue={setValue} getValues={getValues} register={register} />}

      <Box sx={createAccommodationStyles.buttonGroup}>
        <Button
          onClick={() => {
            handleNextOrBack();
          }}
          disabled={createAccommodation.isPending}
          sx={{ ...createAccommodationStyles.button, ...(activeStep === 0 && { marginLeft: 'calc(100% - 150px)' }) }}
          variant={activeStep === 0 ? 'contained' : 'outlined'}
        >
          {activeStep === 1 ? 'Back' : 'Next'}
        </Button>
        {activeStep > 0 && (
          <Button
            variant="contained"
            type="button"
            onClick={() => {
              handleCreateAccommodation();
            }}
            disabled={createAccommodation.isPending}
            sx={{ ...createAccommodationStyles.button, display: activeStep === 1 ? 'block' : 'none' }}
          >
            {createAccommodation.isPending ? 'Creating...' : 'Create'}
          </Button>
        )}
      </Box>
    </Box>
  );
}
