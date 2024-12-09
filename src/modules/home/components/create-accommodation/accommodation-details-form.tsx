import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';

import minusIcon from '#/assets/minus.svg';
import plusIcon from '#/assets/plus.svg';
import { type AccommodationFormData } from '#/zod';
import { accommodationDetailsFormStyles } from './styles';
import { useCategories } from '../../api/get-categories';
import { useAmenities } from '../../api/get-amenities';
import {
  Controller,
  type Control,
  type FieldValues,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';
import { useState } from 'react';

type Props<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
  control: Control<T>;
};

export function AccommodationDetailsForm({ setValue, getValues, register, control }: Props<AccommodationFormData>) {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories();
  const { data: amenitiesResponse } = useAmenities();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(getValues('amenities'));

  const handleAmenityToggle = (amenityId: string) => {
    const currentAmenities = getValues('amenities');
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id) => id !== amenityId)
      : [...currentAmenities, amenityId];

    setSelectedAmenities(updatedAmenities);
    setValue('amenities', updatedAmenities);
  };

  return (
    <Box sx={accommodationDetailsFormStyles.container}>
      <Typography variant="h4" gutterBottom={true}>
        Accommodation Details
      </Typography>
      <Grid container={true} spacing={2}>
        <Grid size={12}>
          <TextField
            {...register('name')}
            fullWidth={true}
            label="Name"
            placeholder="Give your place a catchy name"
            required={true}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            {...register('description')}
            fullWidth={true}
            label="Description"
            multiline={true}
            rows={4}
            placeholder="Describe what makes your place special"
            required={true}
          />
        </Grid>

        <Grid size={6}>
          <TextField
            {...register('location')}
            fullWidth={true}
            label="Location"
            placeholder="Where is your accommodation located?"
            required={true}
          />
        </Grid>

        <Grid size={6}>
          <TextField
            {...register('pricePerNight', {
              setValueAs: (val: string | number) => {
                if (typeof val === 'string') {
                  return parseFloat(val);
                }
                return val;
              },
            })}
            fullWidth={true}
            label="Price per night"
            type="number"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
            }}
            defaultValue={0}
            required={true}
          />
        </Grid>

        <Grid size={12}>
          <FormControl fullWidth={true} sx={accommodationDetailsFormStyles.dropdown}>
            <InputLabel>Category</InputLabel>

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category" disabled={isCategoriesLoading}>
                  {categoriesResponse?.data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Box sx={accommodationDetailsFormStyles.guestCountContainer}>
          <Typography variant="h6" gutterBottom={true}>
            Guests
          </Typography>

          <Box sx={accommodationDetailsFormStyles.guestsCountControls}>
            <Button
              disableRipple={true}
              sx={accommodationDetailsFormStyles.guestsCountButton}
              onClick={() => setValue('numberOfGuests', getValues('numberOfGuests') - 1, { shouldValidate: true })}
              disabled={getValues('numberOfGuests') === 1}
            >
              <img src={minusIcon} />
            </Button>
            <InputBase {...register('numberOfGuests')} disabled={true} sx={accommodationDetailsFormStyles.guestsCount} />
            <Button
              disableRipple={true}
              sx={accommodationDetailsFormStyles.guestsCountButton}
              onClick={() => setValue('numberOfGuests', getValues('numberOfGuests') + 1, { shouldValidate: true })}
              disabled={getValues('numberOfGuests') === 16}
            >
              <img src={plusIcon} />
            </Button>
          </Box>
        </Box>

        <Grid size={12}>
          <Typography variant="h6" gutterBottom={true}>
            Select Amenities
          </Typography>
          <InputBase {...register('amenities')} type="hidden" />
          <Box sx={accommodationDetailsFormStyles.amenitiesContainer}>
            {amenitiesResponse?.data.map((amenity) => (
              <Chip
                key={amenity.id}
                label={amenity.name}
                onClick={() => handleAmenityToggle(amenity.id)}
                sx={[
                  accommodationDetailsFormStyles.amenityChip,
                  selectedAmenities.includes(amenity.id) ? accommodationDetailsFormStyles.selectedAmenityChip : {},
                ]}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
