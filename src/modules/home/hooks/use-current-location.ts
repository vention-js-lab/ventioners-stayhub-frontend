import { useEffect, useState } from 'react';
import { type Location } from '../types/accommodation.type';

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return { location, error };
}
