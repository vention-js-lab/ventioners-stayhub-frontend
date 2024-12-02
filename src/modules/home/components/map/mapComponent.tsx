/* eslint-disable react/jsx-no-leaked-render */
import { mapContainerStyles } from './mapComponent.style';
import { useEffect, useState } from 'react';
import { InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@mui/material/Typography';
import { type Accommodation } from '../../types/accommodation.type';
import { Link } from 'react-router-dom';

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

interface PropertyListProps {
  isLoading: boolean;
  data?: { data: Accommodation[] };
}

export function CustomMap({ isLoading, data }: PropertyListProps) {
  const [markerLocation, setMarkerLocation] = useState<Location>({ lat: 51.15067631430282, lng: 71.44579022366129 });
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

  useEffect(() => {
    if (data?.data) setAccommodations(data.data);
  }, [data]);

  if (isLoading) {
    return (
      <Box>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const handleMarkerClick = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
  };

  const handleInfoWindowClose = () => {
    setSelectedAccommodation(null);
  };

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
    setSelectedAccommodation(null);
  };

  return (
    <Box sx={mapContainerStyles.container}>
      <Map
        style={mapContainerStyles.mapStyle}
        defaultZoom={12}
        defaultCenter={markerLocation}
        gestureHandling="greedy"
        disableDefaultUI={true}
        onClick={handleMapClick}
      >
        <Marker position={markerLocation} />
      </Map>

      {accommodations.map((acc) => (
        <Marker
          key={acc.id}
          position={{
            lat: acc.locationCoordinates.coordinates[1],
            lng: acc.locationCoordinates.coordinates[0],
          }}
          onClick={() => handleMarkerClick(acc)}
        />
      ))}

      {selectedAccommodation && (
        <Link to={`/property/${selectedAccommodation.id}`}>
          <InfoWindow
            position={{
              lat: selectedAccommodation.locationCoordinates.coordinates[1],
              lng: selectedAccommodation.locationCoordinates.coordinates[0],
            }}
            onCloseClick={handleInfoWindowClose}
            style={{ cursor: 'pointer' }}
          >
            <div>
              {selectedAccommodation.images.length > 0 && (
                <div style={mapContainerStyles.accommodationInfo}>
                  <img
                    src={selectedAccommodation.images[0].url}
                    alt={selectedAccommodation.name}
                    style={mapContainerStyles.imageInfo}
                  />
                </div>
              )}
              <h4>{selectedAccommodation.name}</h4>
              <p>Description: {selectedAccommodation.description}</p>
              <p>Price: ${selectedAccommodation.pricePerNight}</p>
            </div>
          </InfoWindow>
        </Link>
      )}

      <ToastContainer />
    </Box>
  );
}
