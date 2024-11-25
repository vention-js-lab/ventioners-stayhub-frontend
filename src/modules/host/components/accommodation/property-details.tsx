import Typography from '@mui/material/Typography';
import { useAccommodation } from '#/modules/host/context';
import { type AccommodationBasics } from '#/modules/host/types';
import { NumberSelector } from '#/modules/host/components/accommodation/number-selector.tsx';
import { propertyDetailsStyles } from '../../styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export function PropertyDetails() {
  const { basics, updateBasics } = useAccommodation();

  const handleChange = (field: keyof AccommodationBasics, value: number) => {
    updateBasics({
      [field]: Math.max(1, value),
    });
  };

  return (
    <Box sx={propertyDetailsStyles.container}>
      <Typography variant="h4" gutterBottom={true} sx={propertyDetailsStyles.title}>
        Share some basics about your place
      </Typography>
      <Grid container={true} spacing={1} direction="column">
        <Grid
          item={true}
          xs={propertyDetailsStyles.sizes.xs}
          sm={propertyDetailsStyles.sizes.sm}
          md={propertyDetailsStyles.sizes.md}
        >
          <NumberSelector field="guests" label="Guests" basics={basics} handleChange={handleChange} />
        </Grid>
        <Grid
          item={true}
          xs={propertyDetailsStyles.sizes.xs}
          sm={propertyDetailsStyles.sizes.sm}
          md={propertyDetailsStyles.sizes.md}
        >
          <NumberSelector field="bedrooms" label="Bedrooms" basics={basics} handleChange={handleChange} />
        </Grid>
        <Grid
          item={true}
          xs={propertyDetailsStyles.sizes.xs}
          sm={propertyDetailsStyles.sizes.sm}
          md={propertyDetailsStyles.sizes.md}
        >
          <NumberSelector field="beds" label="Beds" basics={basics} handleChange={handleChange} />
        </Grid>
        <Grid
          item={true}
          xs={propertyDetailsStyles.sizes.xs}
          sm={propertyDetailsStyles.sizes.sm}
          md={propertyDetailsStyles.sizes.md}
        >
          <NumberSelector field="bathrooms" label="Bathrooms" basics={basics} handleChange={handleChange} />
        </Grid>
      </Grid>
    </Box>
  );
}
