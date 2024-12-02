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

  const getPreferredAddress = (results: google.maps.GeocoderResult[]) => {
    const preferredLanguages = ['en', 'uz', 'ru'];
    const isPreferredLanguage = (address: string) => {
      return preferredLanguages.some((lang) => address.toLowerCase().includes(lang.toLowerCase()));
    };

    const hasStreetNumber = (address_components: google.maps.GeocoderAddressComponent[]) => {
      return address_components.some((component) => component.types.includes('street_number'));
    };

    const hasStreetName = (address_components: google.maps.GeocoderAddressComponent[]) => {
      return address_components.some((component) => component.types.includes('route'));
    };

    for (const result of results) {
      const { formatted_address, address_components } = result;

      if (hasStreetNumber(address_components) && isPreferredLanguage(formatted_address)) {
        return formatted_address;
      }

      if (hasStreetName(address_components) && isPreferredLanguage(formatted_address)) {
        return formatted_address;
      }
    }
    return results[0]?.formatted_address || 'Unknown location';
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
    setSelectedAccommodation(null);
  };

  return (
    <Box sx={mapContainerStyles.container}>
      <Map
        style={mapContainerStyles.mapStyle}
        defaultZoom={12}
        defaultCenter={coordinates}
        gestureHandling="auto"
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
