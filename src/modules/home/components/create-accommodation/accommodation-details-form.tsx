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

import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import minusIcon from '#/assets/minus.svg';
import plusIcon from '#/assets/plus.svg';
import { type AccommodationFormData } from '#/zod';
import { accommodationDetailsFormStyles } from './styles';
import { useCategories } from '../../api/get-categories';
import { useAmenities } from '../../api/get-amenities';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CustomMap } from '../map/mapComponent';
import { showToastError } from '#/utils';
import {
  Controller,
  type Control,
  type FieldValues,
  type UseFormGetValues,
  type UseFormRegister,
  type UseFormSetValue,
} from 'react-hook-form';
import { useState, useMemo, useRef, useEffect } from 'react';

type Props<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
  control: Control<T>;
};

type Library = 'places';

export function AccommodationDetailsForm({ setValue, getValues, register, control }: Props<AccommodationFormData>) {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories();
  const { data: amenitiesResponse } = useAmenities();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(getValues('amenities'));
  const [address, setAddress] = useState(getValues('location') || '');

  const handleAmenityToggle = (amenityId: string) => {
    const currentAmenities = getValues('amenities');
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id) => id !== amenityId)
      : [...currentAmenities, amenityId];

    setSelectedAmenities(updatedAmenities);
    setValue('amenities', updatedAmenities);
  };

  useEffect(() => {
    setValue('location', address);
  }, [address, setValue]);

  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const loaderOptions = useMemo(
    () => ({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ['places'] as Library[],
    }),
    []
  );

  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

  if (loadError) {
    showToastError(`No address found for this location ${loadError}`);
  }

  const handleonPlacesChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (Array.isArray(places) && places.length > 0) {
        const selectedPlace = places[0];
        const location = selectedPlace.geometry?.location;
        if (location) {
          const newLng = location.lng();
          const newLat = location.lat();
          if (!isNaN(newLat) && !isNaN(newLng)) {
            setAddress(selectedPlace.formatted_address || selectedPlace.name || '');
            setValue('location', address);
            setValue('locationCoordinates', {
              type: 'Point',
              coordinates: [newLng, newLat],
            });
          } else {
            showToastError('Invalid coordinates received.');
          }
        } else {
          showToastError('Location geometry is not available.');
        }
      } else {
        showToastError('No places found.');
      }
    }
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
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

        <Grid size={12}>
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

        <Grid size={12}>
          {isLoaded ? (
            <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handleonPlacesChanged}>
              <TextField
                fullWidth={true}
                label="Address"
                value={address}
                onChange={handleAddressChange}
                placeholder="Input address..."
                required={true}
                inputRef={register('location').ref}
              />
            </StandaloneSearchBox>
          ) : (
            <Typography>Loading Google Maps...</Typography>
          )}
        </Grid>

        <Grid size={12} sx={{ height: '500px' }}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <CustomMap
              isLoading={false}
              data={{ data: [] }}
              coordinates={{
                lng: getValues('locationCoordinates').coordinates[0],
                lat: getValues('locationCoordinates').coordinates[1],
              }}
              onLocationChange={({ addressInfo, lng, lat }) => {
                setAddress(addressInfo);
                setValue('location', addressInfo);
                setValue('locationCoordinates', {
                  type: 'Point',
                  coordinates: [lng, lat],
                });
              }}
            />
          </APIProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
