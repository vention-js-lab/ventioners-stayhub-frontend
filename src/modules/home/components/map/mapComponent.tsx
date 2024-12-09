import { mapContainerStyles } from './mapComponent.style';
import { useEffect, useState } from 'react';
import { InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import Box from '@mui/material/Box';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type Accommodation, type Location } from '../../types/accommodation.type';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { getPreferredAddress } from '#/utils/get-address';
import { useCurrentLocation } from '../../hooks/use-current-location';

interface MapClickEvent {
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
  coordinates: {
    lat: number;
    lng: number;
  };
  onLocationChange?: (location: { address: string; lat: number; lng: number }) => void;
}

export function CustomMap({ isLoading, data, coordinates, onLocationChange }: PropertyListProps) {
  const [markerLocation, setMarkerLocation] = useState<Location>(coordinates);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const { location } = useCurrentLocation();
  useEffect(() => {
    if (data?.data) setAccommodations(data.data);
  }, [data]);

  useEffect(() => {
    setMarkerLocation(coordinates);
  }, [coordinates]);

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

  const handleMapClick = async (event: MapClickEvent) => {
    const clickedLatLng = event.detail.latLng;
    if (clickedLatLng) {
      const { lat, lng } = clickedLatLng;
      setMarkerLocation({ lat, lng });
      setSelectedAccommodation(null);

      const geocoder = new google.maps.Geocoder();
      try {
        const results = (await geocoder.geocode({ location: { lat, lng } })).results;
        if (results[0]) {
          const address = getPreferredAddress(results);
          toast.success(`Address selected: ${address}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
          if (typeof onLocationChange === 'function') {
            onLocationChange({ address, lat, lng });
          }
        } else {
          toast.error('No address found for this location', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      } catch (error: any) {
        toast.error(`Failed to get address from location ${error}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
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
        defaultZoom={12}
        defaultCenter={coordinates}
        gestureHandling="auto"
        disableDefaultUI={true}
        onClick={(event) => {
          handleMapClick(event);
        }}
      >
        {location ? (
          <Marker
            position={location}
            icon={{
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            }}
          />
        ) : null}

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
      {selectedAccommodation ? (
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
      ) : null}
      <ToastContainer />
    </Box>
  );
}
