import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property/property-list';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { CategoryList } from '../components/category/category-list';
import { homeRouteStyles } from './home.route.styles';
import { useSearchParamsState } from '../hooks/use-search-params-state';
import { useProperties } from '../api/get-properties';
import { CustomMap } from '../components/map/mapComponent';
import { APIProvider } from '@vis.gl/react-google-maps';
import Typography from '@mui/material/Typography';
import InfiniteScroll from 'react-infinite-scroll-component';
import { lat, lng } from '../constants/map.constant';
import { useMemo } from 'react';
import { InfoMessageBox } from '../components/info-message-box/info-message-box';

export function HomeRoute() {
  const [selectedCategory, setSelectedCategory] = useSearchParamsState('category', '');
  const [searchQuery, setSearchQuery] = useSearchParamsState('search', '');
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProperties({
    page: 1,
    categoryId: selectedCategory,
    search: searchQuery,
  });

  const properties = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

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
                <Typography>No more data to load.</Typography>
              </InfoMessageBox>
            )
          }
        >
          <PropertyList isLoading={isLoading} isFetchingNextPage={isFetchingNextPage} data={{ data: properties }} />
        </InfiniteScroll>
        <Box sx={homeRouteStyles.mapContainer}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <CustomMap lat={lat} lng={lng} />
          </APIProvider>
        </Box>
      </Container>
    </Box>
  );
}
