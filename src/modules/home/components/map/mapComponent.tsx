import { mapContainerStyles } from './mapComponent.style';
import { useEffect, useState } from 'react';
import { InfoWindow, Map, Marker } from '@vis.gl/react-google-maps';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type Accommodation, type Location } from '../../types/accommodation.type';
import { Link } from 'react-router-dom';
import { getPreferredAddress, showToastError, showToastSuccess } from '#/utils';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';
import { loadingSpinnerStyles } from '#/styles';

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
  coordinates: Location;
  onLocationChange?: (location: { addressInfo: string; lng: number; lat: number }) => void;
}

export function CustomMap({ isLoading, data, coordinates, onLocationChange }: PropertyListProps) {
  const { t } = useTranslation('home');
  const [markerLocation, setMarkerLocation] = useState<Location>(coordinates);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  useEffect(() => {
    if (data?.data) setAccommodations(data.data);
  }, [data]);

  useEffect(() => {
    setMarkerLocation(coordinates);
  }, [coordinates]);

  if (isLoading) {
    return (
      <Box sx={loadingSpinnerStyles.container}>
        <CircularProgress sx={loadingSpinnerStyles.spinner} />
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
      const { lng, lat } = clickedLatLng;
      setMarkerLocation({ lng, lat });
      setSelectedAccommodation(null);

      const geocoder = new google.maps.Geocoder();
      try {
        const results = (await geocoder.geocode({ location: { lng, lat }, language: 'en' })).results;
        if (results[0]) {
          const addressInfo = getPreferredAddress(results);
          showToastSuccess(`${t(TRANSLATION_KEYS.home.map.address_selected)}: ${addressInfo}`);
          if (typeof onLocationChange === 'function') {
            onLocationChange({ addressInfo, lng, lat });
          }
        } else {
          showToastError(t(TRANSLATION_KEYS.home.map.no_address_found));
        }
      } catch (error: any) {
        showToastError(`Failed to get address from location: ${error}`);
      }
    } else {
      showToastError('Please select a specific location');
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
        <Marker position={markerLocation} />
      </Map>
      {accommodations.map((acc) => (
        <Marker
          key={acc.id}
          position={{
            lng: acc.locationCoordinates.coordinates[0],
            lat: acc.locationCoordinates.coordinates[1],
          }}
          onClick={() => handleMarkerClick(acc)}
        />
      ))}
      {selectedAccommodation ? (
        <Link to={`/property/${selectedAccommodation.id}`}>
          <InfoWindow
            position={{
              lng: selectedAccommodation.locationCoordinates.coordinates[0],
              lat: selectedAccommodation.locationCoordinates.coordinates[1],
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
