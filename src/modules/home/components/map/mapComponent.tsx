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

interface MapMouseEvent {
  detail: {
    latLng: {
      lat: number;
      lng: number;
    } | null;
  };
}

export function CustomMap({ lat, lng }: Location) {
  const [markerLocation, setMarkerLocation] = useState<Location>({ lat, lng });

  const handleMapClick = (event: MapClickEvent) => {
    const clickedLatLng = event.detail.latLng;
    if (clickedLatLng) {
      setMarkerLocation({ lat: clickedLatLng.lat, lng: clickedLatLng.lng });
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
        style={mapContainerStyles.mapStyle}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling="greedy"
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        <Marker position={markerLocation} />
      </Map>
      <ToastContainer />
    </Box>
  );
}
