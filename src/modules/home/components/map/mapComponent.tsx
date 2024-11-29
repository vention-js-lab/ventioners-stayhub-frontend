import { mapContainerStyles } from './mapComponent.style';
import { useState } from 'react';
import { Map, Marker } from '@vis.gl/react-google-maps';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [markerLocation, setMarkerLocation] = useState<Location>({
    lat: 41.28332127984398,
    lng: 69.2118501663208,
  });

  const handleMapClick = (mapProps: MapClickEvent) => {
    if (mapProps.detail.placeId) {
      const { lat, lng } = mapProps.detail.latLng;
      setMarkerLocation({ lat, lng });
    } else {
      toast.error('Please select a specific location', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <Box sx={mapContainerStyles.container}>
      <Map
        style={{
          borderRadius: '20px',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling="greedy"
        disableDefaultUI={true}
        onClick={(mapProps) => handleMapClick(mapProps)}
      >
        <Marker position={markerLocation} />
      </Map>
      <ToastContainer />
    </Box>
  );
}

export default CustomMap;
