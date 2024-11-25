import { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import { useMutation } from '@tanstack/react-query';
import { useAccommodation } from '#/modules/host/context';
import { type AccommodationBasics, type AccommodationFormData } from '#/modules/host/types';
import { BasicDetails } from '#/modules/host/components/accommodation/basic-details.tsx';
import { CategorySelection } from '#/modules/host/components/accommodation/category-selection.tsx';
import { ImageUpload } from '#/modules/host/components/accommodation/image-upload.tsx';
import { PropertyDetails } from '#/modules/host/components/accommodation/property-details.tsx';
import { LocationPicker } from '#/modules/host/components/accommodation/location-picker.tsx';
import { commonStyles } from '#/modules/host/styles';
import { axiosInstance } from '#/configs';
import { toast, ToastContainer } from 'react-toastify';

const accommodationApi = {
  create: async (formData: AccommodationFormData & { basics: AccommodationBasics }) => {
    const { data } = await axiosInstance.post<AccommodationFormData>('/accommodations', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};

const steps = [
  { label: 'Basic Details', component: BasicDetails },
  { label: 'Category', component: CategorySelection },
  { label: 'Location', component: LocationPicker },
  { label: 'Property Details', component: PropertyDetails },
  { label: 'Photos', component: ImageUpload },
];

export function AccommodationCreation() {
  const [activeStep, setActiveStep] = useState(0);
  const { data, basics } = useAccommodation();

  const createAccommodation = useMutation({
    mutationFn: (formData: AccommodationFormData) => accommodationApi.create({ ...formData, basics }),
    onSuccess: (_response) => {
      toast(`Accommodation created successfully!`, { type: 'success' });
      window.location.href = '/host'; // For now, it returns to home
    },
    onError: (error) => {
      toast(`Error creating accommodation: ${error}`, { type: 'error' });
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      createAccommodation.mutate(data);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const CurrentStep = steps[activeStep].component;

  return (
    <Box>
      <Stepper activeStep={activeStep} style={{ marginBottom: '20px' }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <CurrentStep />

      <ToastContainer autoClose={3000} />

      <Box style={commonStyles.buttonGroup}>
        {activeStep > 0 && (
          <Button onClick={handleBack} disabled={createAccommodation.isPending} sx={commonStyles.button}>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={handleNext} disabled={createAccommodation.isPending} sx={commonStyles.button}>
          {activeStep === steps.length - 1 ? (createAccommodation.isPending ? 'Creating...' : 'Create') : 'Next'}
        </Button>
      </Box>
    </Box>
  );
}
