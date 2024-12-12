import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SearchSection } from '../../styles';
import { searchbarStyles } from './styles';

interface DestinationSearchProps {
  locationSearchValue: string;
  setLocationSearchValue: (value: string) => void;
}

export function DestinationSearch({ locationSearchValue, setLocationSearchValue }: DestinationSearchProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <SearchSection onClick={(e) => setAnchorEl(e.currentTarget)} sx={searchbarStyles.searchSection.container}>
        <Stack alignItems="flex-start" sx={searchbarStyles.searchButtonContainer}>
          <Typography sx={searchbarStyles.commonTypography.title}>Where</Typography>
          <Typography sx={searchbarStyles.commonTypography.subtitle}>{locationSearchValue || 'Search destinations'}</Typography>
        </Stack>
      </SearchSection>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={searchbarStyles.searchSection.popover.anchorOrigin}
        transformOrigin={searchbarStyles.searchSection.popover.transformOrigin}
        slotProps={{ paper: { sx: searchbarStyles.searchSection.popover.paperProps } }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            autoFocus={true}
            fullWidth={true}
            value={locationSearchValue}
            onChange={(e) => setLocationSearchValue(e.target.value)}
            placeholder="Destination name"
            variant="outlined"
            size="small"
            sx={searchbarStyles.searchSection.popover.searchDestionationsTextField}
          />
        </Box>
      </Popover>
    </>
  );
}
