import { mapContainerStyles } from './mapComponent.style';
import { useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import Box from '@mui/material/Box';

interface Location {
  lat: number;
  lng: number;
}

interface MapClickEvent {
  detail: {
    placeId: string | null;
    latLng: {
      lat: number;
      lng: number;
    };
  };
}

function CustomMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [markerLocation, setMarkerLocation] = useState<Location>({
    lat: 41.28332127984398,
    lng: 69.2118501663208,
  });

  const handleMapClick = (mapProps: MapClickEvent) => {
    if (mapProps.detail.placeId) {
      const lat = mapProps.detail.latLng.lat;
      const lng = mapProps.detail.latLng.lng;
      setSelectedLocation({ lat, lng });
      setMarkerLocation({ lat, lng });
    } else {
      alert('Please select the specific location');
    }
  };

  return (
    <Box sx={mapContainerStyles.container}>
      <Map
        style={{ borderRadius: '20px', height: '100%', width: '100%', overflow: 'hidden' }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        onClick={(mapProps) => handleMapClick(mapProps)}
      >
        <Marker position={markerLocation} />
      </Map>
    </Box>
  );
}

export default CustomMap;
