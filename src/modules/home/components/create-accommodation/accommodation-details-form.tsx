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

import { type AccommodationFormData } from '../../types/accommodation-form-data.interface';
import { accommodationDetailsFormStyles } from './styles';
import { useCategories } from '../../api/get-categories';
import { useAmenities } from '../../api/get-amenities';

interface AccommodationDetailsFormProps {
  formData: AccommodationFormData;
  updateFormData: (updates: Partial<AccommodationFormData>) => void;
}

export function AccommodationDetailsForm({ formData, updateFormData }: AccommodationDetailsFormProps) {
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useCategories();

  const { data: amenitiesResponse } = useAmenities();

  const handleAmenityToggle = (amenityId: string) => {
    const currentAmenities = formData.amenityIds;
    const updatedAmenities = currentAmenities.includes(amenityId)
      ? currentAmenities.filter((id) => id !== amenityId)
      : [...currentAmenities, amenityId];

    updateFormData({ amenityIds: updatedAmenities });
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

        <Grid item={true} xs={12} sm={6}>
          <TextField
            fullWidth={true}
            label="Location"
            value={formData.location}
            onChange={(e) => updateFormData({ location: e.target.value })}
            placeholder="Where is your accommodation located?"
            required={true}
          />
        </Grid>

        <Grid item={true} xs={12} sm={6}>
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
                  formData.amenityIds.includes(amenity.id) ? accommodationDetailsFormStyles.selectedAmenityChip : {},
                ]}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
