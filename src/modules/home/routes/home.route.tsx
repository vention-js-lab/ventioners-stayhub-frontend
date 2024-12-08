import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property/property-list';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { CategoryList } from '../components/category/category-list';
import { homeRouteStyles } from './home.route.styles';
import { useSearchParamsState } from '../hooks/use-search-params-state';
import { useProperties } from '../api/get-properties';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';
import { InfoMessageBox } from '../components/info-message-box/info-message-box';
import { MapModal } from '../components/map/mapModal';
import { lng, lat } from '../constants/map.constant';
import { useCurrentLocation } from '../hooks/useCurrentLocation';

export function HomeRoute() {
  const [selectedCategory, setSelectedCategory] = useSearchParamsState('category', '');
  const [searchQuery, setSearchQuery] = useSearchParamsState('search', '');
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProperties({
    page: 1,
    categoryId: selectedCategory,
    search: searchQuery,
  });
  const { location, error } = useCurrentLocation();
  const properties = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);
  const defaultCenter = location || { lat: lat, lng: lng };
  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent setSelectedLocation={setSearchQuery} showSearchBar={true} showStaysAndExperiences={true} />
      <Container maxWidth="xl">
        <Divider sx={homeRouteStyles.divider} />
        <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
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
