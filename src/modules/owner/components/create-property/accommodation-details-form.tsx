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
import { APIProvider } from '@vis.gl/react-google-maps';
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
import { useCategories } from '#/modules/home/api/get-categories';
import { useAmenities } from '#/modules/owner/api/get-amenities';
import { CustomMap } from '#/modules/home/components/map/mapComponent';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '#/contexts/language.context';
import MapHandler from '#/modules/home/components/map/mapHandler';

type Props<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  getValues: UseFormGetValues<T>;
  register: UseFormRegister<T>;
  control: Control<T>;
};

type Library = 'places';

export function AccommodationDetailsForm({ setValue, getValues, register, control }: Props<AccommodationFormData>) {
  const { language } = useLanguage();
  const { t } = useTranslation('create-accommodation');
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories();
  const { data: amenitiesResponse } = useAmenities();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(getValues('amenities'));
  const [address, setAddress] = useState(getValues('location') || '');
  const [selectedLocation, setSelectedLocation] = useState<google.maps.places.PlaceResult | null>(null);

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
            setSelectedLocation(selectedPlace);
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
        {t(TRANSLATION_KEYS.create_accommodation.accommodation_details)}
      </Typography>
      <Grid container={true} spacing={2}>
        <Grid size={12}>
          <TextField
            {...register('name')}
            fullWidth={true}
            label={t(TRANSLATION_KEYS.create_accommodation.name)}
            placeholder={t(TRANSLATION_KEYS.create_accommodation.give_your_place_catchy_name)}
            required={true}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            {...register('description')}
            fullWidth={true}
            label={t(TRANSLATION_KEYS.create_accommodation.description)}
            multiline={true}
            rows={8}
            placeholder={t(TRANSLATION_KEYS.create_accommodation.describe_what_makes_your_place_special)}
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
            label={t(TRANSLATION_KEYS.create_accommodation.price_per_night)}
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
            <InputLabel>{t(TRANSLATION_KEYS.create_accommodation.category)}</InputLabel>

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Category" disabled={isCategoriesLoading}>
                  {categoriesResponse?.data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {language === 'en' ? category.name : category.name_ru}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>

        <Box sx={accommodationDetailsFormStyles.guestCountContainer}>
          <Typography variant="h6" gutterBottom={true}>
            {t(TRANSLATION_KEYS.create_accommodation.guests)}
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
            {t(TRANSLATION_KEYS.create_accommodation.select_amenities)}
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
                label={t(TRANSLATION_KEYS.create_accommodation.address)}
                value={address}
                onChange={handleAddressChange}
                placeholder={t(TRANSLATION_KEYS.create_accommodation.input_address)}
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
            <MapHandler place={selectedLocation} />
          </APIProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
