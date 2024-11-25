import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { useAccommodation } from '#/modules/host/context';
import { basicDetailsStyles } from '#/modules/host/styles';

export function BasicDetails() {
  const { data, updateData } = useAccommodation();

  return (
    <Box sx={basicDetailsStyles.container}>
      <Typography variant="h4" sx={basicDetailsStyles.title}>
        Tell us about your place
      </Typography>

      <Box sx={basicDetailsStyles.form}>
        <TextField
          fullWidth={true}
          label="Name"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          sx={basicDetailsStyles.inputField}
          placeholder="Give your place a catchy name"
        />

        <TextField
          fullWidth={true}
          label="Description"
          multiline={true}
          rows={4}
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          sx={{
            ...basicDetailsStyles.inputField,
            ...basicDetailsStyles.descriptionField,
          }}
          placeholder="Describe what makes your place special"
        />

        <TextField
          fullWidth={true}
          label="Price per night"
          type="number"
          value={data.pricePerNight}
          onChange={(e) => updateData({ pricePerNight: Number(e.target.value) })}
          sx={{
            ...basicDetailsStyles.inputField,
            ...basicDetailsStyles.priceField,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={basicDetailsStyles.currencyAdornment}>
                $
              </InputAdornment>
            ),
          }}
          placeholder="0"
        />
      </Box>
    </Box>
  );
}
