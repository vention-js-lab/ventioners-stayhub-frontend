import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { type AccommodationFormData } from '../../types/accommodation-form-data.interface';
import { accommodationDetailsFormStyles } from './styles';
import { useCategories } from '../../api/get-categories';
import { useAmenities } from '../../api/get-amenities';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CustomMap } from '../map/mapComponent';
import { toast } from 'react-toastify';
import { useMemo, useRef } from 'react';
import { latitude, longitude } from '../../constants/map.constant';

interface AccommodationDetailsFormProps {
  formData: AccommodationFormData;
  updateFormData: (updates: Partial<AccommodationFormData>) => void;
}
type Library = 'places';
export function AccommodationDetailsForm({ formData, updateFormData }: AccommodationDetailsFormProps) {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories();

  const { data: amenitiesResponse } = useAmenities();

  const handleAmenityToggle = (amenityId: string) => {
    const currentAmenities = formData.amenities;
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id) => id !== amenityId)
      : [...currentAmenities, amenityId];

    updateFormData({ amenities: updatedAmenities });
  };

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
    toast.error(`No address found for this location ${loadError}`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
    });
  }
  const handleonPlacesChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (Array.isArray(places) && places.length > 0) {
        const selectedPlace = places[0];
        const location = selectedPlace.geometry?.location;
        if (location) {
          const newLat = location.lat();
          const newLng = location.lng();
          if (!isNaN(newLat) && !isNaN(newLng)) {
            const address = selectedPlace.formatted_address || selectedPlace.name || '';
            updateFormData({
              location: address,
              locationCoordinates: {
                type: 'Point',
                coordinates: [newLng, newLat],
              },
            });
          } else {
            toast.error('Invalid coordinates received.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: true,
            });
          }
        } else {
          toast.error('Location geometry is not available.', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      } else {
        toast.error('No places found.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } else {
      throw new Error('Error');
    }
  };

  return (
    <Box sx={accommodationDetailsFormStyles.container}>
      <Typography variant="h4" gutterBottom={true}>
        Accommodation Details
      </Typography>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <TextField
            fullWidth={true}
            label="Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder="Give your place a catchy name"
            required={true}
          />
        </Grid>

        <Grid item={true} xs={12}>
          <TextField
            fullWidth={true}
            label="Description"
            multiline={true}
            rows={4}
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="Describe what makes your place special"
            required={true}
          />
        </Grid>

        <Grid item={true} xs={12}>
          <TextField
            fullWidth={true}
            label="Price per night"
            type="number"
            value={formData.pricePerNight}
            onChange={(e) => updateFormData({ pricePerNight: Number(e.target.value) })}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            placeholder="0"
            required={true}
          />
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl fullWidth={true} sx={accommodationDetailsFormStyles.dropdown}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              label="Category"
              onChange={(e) => updateFormData({ categoryId: e.target.value })}
              disabled={isCategoriesLoading}
            >
              {categoriesResponse?.data.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <Typography variant="h6" gutterBottom={true}>
            Select Amenities
          </Typography>
          <Box sx={accommodationDetailsFormStyles.amenitiesContainer}>
            {amenitiesResponse?.data.map((amenity) => (
              <Chip
                key={amenity.id}
                label={amenity.name}
                onClick={() => handleAmenityToggle(amenity.id)}
                sx={[
                  accommodationDetailsFormStyles.amenityChip,
                  formData.amenities.includes(amenity.id) ? accommodationDetailsFormStyles.selectedAmenityChip : {},
                ]}
              />
            ))}
          </Box>
        </Grid>

        <Grid item={true} xs={12}>
          {isLoaded ? (
            <StandaloneSearchBox onLoad={(ref) => (inputRef.current = ref)} onPlacesChanged={handleonPlacesChanged}>
              <TextField
                fullWidth={true}
                label="Address"
                value={formData.location}
                onChange={(e) => updateFormData({ location: e.target.value })}
                placeholder="Input address..."
                required={true}
              />
            </StandaloneSearchBox>
          ) : (
            <Typography>Loading Google Maps...</Typography>
          )}
        </Grid>

        <Grid item={true} xs={12} sx={{ height: '500px' }}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <CustomMap
              isLoading={false}
              data={{ data: [] }}
              coordinates={{
                lat: formData.locationCoordinates.coordinates[1] || latitude,
                lng: formData.locationCoordinates.coordinates[0] || longitude,
              }}
              onLocationChange={({ address, lat, lng }) =>
                updateFormData({
                  location: address,
                  locationCoordinates: {
                    type: 'Point',
                    coordinates: [lng, lat],
                  },
                })
              }
            />
          </APIProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
