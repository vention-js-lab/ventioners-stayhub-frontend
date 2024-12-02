import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { HeaderComponent } from '../components/header';
import { PropertyList } from '../components/property/property-list';
import { CategoryList } from '../components/category/category-list';
import { CustomMap } from '../components/map/mapComponent';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useSearchParamsState } from '../hooks/use-search-params-state';
import { useProperties } from '../api/get-properties';
import { homeRouteStyles } from './home.route.styles';
import MapIcon from '@mui/icons-material/Map';
import ListIcon from '@mui/icons-material/List';

export function HomeRoute() {
  const [selectedCategory, setSelectedCategory] = useSearchParamsState('category', '');
  const [searchQuery, setSearchQuery] = useSearchParamsState('search', '');
  const [isMapView, setIsMapView] = useState(false); // State to toggle view
  const { isLoading, data } = useProperties({ page: 1, categoryId: selectedCategory, search: searchQuery });
  const toggleView = () => {
    setIsMapView((prev) => !prev);
  };

  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent setSelectedLocation={setSearchQuery} showSearchBar={true} showStaysAndExperiences={true} />
      <Divider sx={homeRouteStyles.divider} />
      <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Container maxWidth="xl" disableGutters={true} sx={{ padding: 0 }}>
        {isMapView ? (
          <Box sx={homeRouteStyles.mapContainer}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <CustomMap isLoading={isLoading} data={data} coordinates={{ lat: 51.15067631430282, lng: 71.44579022366129 }} />
            </APIProvider>
          </Box>
        ) : (
          <PropertyList isLoading={isLoading} data={data} />
        )}
      </Container>

      <Button
        variant="contained"
        onClick={toggleView}
        endIcon={isMapView ? <ListIcon /> : <MapIcon />}
        sx={{
          position: 'fixed',
          height: 40,
          borderRadius: 5,
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#333',
          },
        }}
      >
        {isMapView ? 'Show List' : 'Show Map'}
      </Button>
    </Box>
  );
}
