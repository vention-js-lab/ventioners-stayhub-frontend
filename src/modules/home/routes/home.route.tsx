import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property/property-list';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { CategoryList } from '../components/category/category-list';
import { homeRouteStyles } from './home.route.styles';
import { useProperties, type GetPropertiesParams } from '../api/get-properties';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MapModal } from '../components/map/mapModal';
import { longitude, latitude } from '../constants/map.constant';
import { useCurrentLocation } from '../hooks/use-current-location';
import { useState, useMemo } from 'react';
import { InfoMessageBox } from '../components/info-message-box/info-message-box';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useGeocodeLocation } from '#/utils/use-geocode.util';
import { APIProvider } from '@vis.gl/react-google-maps';

export function HomeRoute() {
  const { t } = useTranslation('home');
  const [searchParams, setSearchParams] = useState<GetPropertiesParams>({
    categoryId: '',
    location: '',
    fromDate: '',
    toDate: '',
    numberOfGuests: '',
  });
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProperties({
    page: 1,
    categoryId: searchParams.categoryId,
    location: searchParams.location,
    fromDate: searchParams.fromDate,
    toDate: searchParams.toDate,
    numberOfGuests: searchParams.numberOfGuests,
  });
  const { location } = useCurrentLocation();
  const placeResult = useGeocodeLocation(searchParams.location || '');
  const properties = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const defaultCenter = location || { lat: latitude, lng: longitude };

  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent showSearchBar={true} setParams={setSearchParams} />
      <Container maxWidth="xl">
        <Divider sx={homeRouteStyles.divider} />
        <CategoryList selectedCategory={searchParams.categoryId ?? ''} setParams={setSearchParams} />
        <InfiniteScroll
          dataLength={properties.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={null}
          endMessage={
            !isLoading && properties.length ? (
              <InfoMessageBox>
                <Typography>{t(TRANSLATION_KEYS.home.property.no_additional_properties)}</Typography>
              </InfoMessageBox>
            ) : null
          }
        >
          <PropertyList isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} data={{ data: properties }} />
        </InfiniteScroll>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
          <MapModal isLoading={isLoading} data={properties} coordinates={defaultCenter} placeResult={placeResult} />
        </APIProvider>
      </Container>
    </Box>
  );
}
