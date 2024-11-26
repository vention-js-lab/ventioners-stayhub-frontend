import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocationIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SearchSection } from '../../styles';
import { searchbarStyles } from './styles';

interface DestinationInterface {
  id: number;
  name: string;
  country: string;
}

const destinations: DestinationInterface[] = [
  { id: 6, name: 'Cozy', country: 'Uz' },
  { id: 1, name: 'New York', country: 'United States' },
  { id: 2, name: 'London', country: 'United Kingdom' },
  { id: 3, name: 'Paris', country: 'France' },
  { id: 4, name: 'Tokyo', country: 'Japan' },
  { id: 5, name: 'Sydney', country: 'Australia' },
];

interface DestinationSearchProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSelectedLocation: (value: string) => void;
}

export function DestinationSearch({ searchValue, setSearchValue, setSelectedLocation }: DestinationSearchProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DestinationInterface | null>(null);

  const handleDestinationSelect = (destination: DestinationInterface) => {
    setSelectedDestination(destination);
    setSearchValue(destination.name);
    setSelectedLocation(destination.name);
    setAnchorEl(null);
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <SearchSection onClick={(e) => setAnchorEl(e.currentTarget)} sx={searchbarStyles.searchSection.container}>
        <Stack alignItems="flex-start" sx={searchbarStyles.searchButtonContainer}>
          <Typography sx={searchbarStyles.commonTypography.title}>Search here</Typography>
          <Typography sx={searchbarStyles.commonTypography.subtitle}>
            {searchValue || (selectedDestination?.name ?? 'Search destinations')}
          </Typography>
        </Stack>
      </SearchSection>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={searchbarStyles.searchSection.popover.anchorOrigin}
        transformOrigin={searchbarStyles.searchSection.popover.transformOrigin}
        PaperProps={{
          sx: searchbarStyles.searchSection.popover.paperProps,
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            autoFocus={true}
            fullWidth={true}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search destinations"
            variant="outlined"
            size="small"
            sx={searchbarStyles.searchSection.popover.searchDestionationsTextField}
          />
        </Box>
        <List sx={searchbarStyles.searchSection.popover.list}>
          {filteredDestinations.length === 0 ? (
            <ListItem>
              <ListItemText primary="No destinations found" />
            </ListItem>
          ) : (
            filteredDestinations.map((destination) => (
              <ListItem
                key={destination.id}
                onClick={() => handleDestinationSelect(destination)}
                sx={searchbarStyles.searchSection.popover.listItem}
              >
                <ListItemIcon>
                  <LocationIcon color="action" />
                </ListItemIcon>
                <ListItemText
                  primary={destination.name}
                  secondary={destination.country}
                  primaryTypographyProps={searchbarStyles.searchSection.popover.listItemText.primary}
                  secondaryTypographyProps={searchbarStyles.searchSection.popover.listItemText.secondary}
                />
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </>
  );
}
