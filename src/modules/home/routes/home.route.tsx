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

export function HomeRoute() {
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
  const { location, error } = useCurrentLocation();

  const properties = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const defaultCenter = location || { lat: latitude, lng: longitude };
  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent showSearchBar={true} showStaysAndExperiences={true} setParams={setSearchParams} />
      <Container maxWidth="xl">
        <Divider sx={homeRouteStyles.divider} />
        <CategoryList selectedCategory={searchParams.categoryId ?? ''} setParams={setSearchParams} />
        <InfiniteScroll
          dataLength={properties.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={null}
          endMessage={
            !isLoading && (
              <InfoMessageBox>
                <Typography>No additional properties to view at this time.</Typography>
              </InfoMessageBox>
            )
          }
        >
          <PropertyList isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} data={{ data: properties }} />
        </InfiniteScroll>
        <MapModal isLoading={isLoading} data={properties} coordinates={defaultCenter} />
        {error ? (
          <Typography color="error" sx={{ mt: 2 }}>
            Error: {error}
          </Typography>
        ) : null}
      </Container>
    </Box>
  );
}
