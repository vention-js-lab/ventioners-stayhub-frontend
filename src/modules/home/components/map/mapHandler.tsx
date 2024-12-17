import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useCallback, memo } from 'react';

interface Props {
  place: google.maps.places.PlaceResult | null;
}

const MapHandler: React.FC<Props> = ({ place }) => {
  const map = useMap();

  const fitBounds = useCallback(() => {
    if (!map || !place) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
  }, [map, place]);

  useEffect(() => {
    fitBounds();
  }, [fitBounds]);

  return null;
};

export default memo(MapHandler);
