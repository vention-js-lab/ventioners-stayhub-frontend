import Box from '@mui/material/Box';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property/property-list';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { CategoryList } from '../components/category/category-list';
import { homeRouteStyles } from './home.route.styles';
import { useSearchParamsState } from '../hooks/use-search-params-state';
import { useProperties } from '../api/get-properties';
import CustomMap from '../components/map/mapComponent';
import { APIProvider } from '@vis.gl/react-google-maps';

export function HomeRoute() {
  const [selectedCategory, setSelectedCategory] = useSearchParamsState('category', '');
  const [searchQuery, setSearchQuery] = useSearchParamsState('search', '');
  const { isLoading, data } = useProperties({ page: 1, categoryId: selectedCategory, search: searchQuery });

  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent setSelectedLocation={setSearchQuery} showSearchBar={true} showStaysAndExperiences={true} />
      <Container maxWidth="xl">
        <Divider sx={homeRouteStyles.divider} />
        <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <PropertyList isLoading={isLoading} data={data} />
        <Box sx={homeRouteStyles.mapContainer}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <CustomMap />
          </APIProvider>
        </Box>
      </Container>
    </Box>
  );
}
