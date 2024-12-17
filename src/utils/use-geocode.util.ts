import { useState, useEffect } from 'react';

export function useGeocodeLocation(location: string) {
  const [placeResult, setPlaceResult] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (location) {
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ address: location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          setPlaceResult(results[0]);
        } else {
          setPlaceResult(null);
        }
      });
    }
  }, [location]);

  return placeResult;
}
