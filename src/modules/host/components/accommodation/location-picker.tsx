import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Search from '@mui/icons-material/Search';
import 'leaflet/dist/leaflet.css';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';

import { useAccommodation } from '#/modules/host/context';
import { locationPickerStyles } from '../../styles';
import { axiosInstance } from '#/configs';

const openStreetMapUrl = 'https://nominatim.openstreetmap.org';

export function LocationPicker() {
  const { updateData } = useAccommodation();
  const [searchQuery, setSearchQuery] = useState('');
  const [address, setAddress] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await axiosInstance.get(
        `${openStreetMapUrl}/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );

      const data = await response.data;

      if (data && Array.isArray(data) && data.length > 0) {
        const { display_name: displayName } = data[0];

        setAddress(displayName as string);
        setSearchQuery(displayName as string);
        updateData({ location: displayName as string });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(`Error searching location: ${error.message}`, { type: 'error' });
      }
      toast(`Error searching location`, { type: 'error' });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
      event.preventDefault();
    }
  };

  return (
    <Box sx={locationPickerStyles.container}>
      <Typography variant="h4" sx={locationPickerStyles.title}>
        {` Where's your place located?`}
      </Typography>

      <Paper sx={locationPickerStyles.searchContainer} elevation={0}>
        <TextField
          fullWidth={true}
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={locationPickerStyles.searchInput}
        />
        <Search
          sx={locationPickerStyles.searchIcon}
          onClick={() => {
            handleSearch();
          }}
          style={{ cursor: 'pointer' }}
        />
      </Paper>

      {address ? (
        <Box sx={locationPickerStyles.selectedLocation}>
          <Typography variant="body1">Selected location: {address}</Typography>
        </Box>
      ) : null}

      <Box sx={locationPickerStyles.mapContainer.container}>
        <MapContainer
          center={[locationPickerStyles.mapContainer.center.lat, locationPickerStyles.mapContainer.center.long]}
          zoom={locationPickerStyles.mapContainer.zoom}
          style={locationPickerStyles.mapContainer.style}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </Box>

      <Typography variant="body2" sx={locationPickerStyles.helpText}>
        Use the search bar to find a location and view it on the map.
      </Typography>
    </Box>
  );
}
