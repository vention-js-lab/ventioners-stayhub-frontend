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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export function HomeRoute() {
  const [selectedCategory, setSelectedCategory] = useSearchParamsState('category', '');
  const [searchQuery, setSearchQuery] = useSearchParamsState('search', '');
  const [openModal, setOpenModal] = useState(false);
  const { isLoading, data } = useProperties({ page: 1, categoryId: selectedCategory, search: searchQuery });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={homeRouteStyles.container}>
      <HeaderComponent setSelectedLocation={setSearchQuery} showSearchBar={true} showStaysAndExperiences={true} />
      <Divider sx={homeRouteStyles.divider} />
      <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <Container maxWidth="xl" disableGutters={true} sx={{ padding: 0 }}>
        {<PropertyList isLoading={isLoading} data={data} />}
      </Container>

      <Button
        variant="contained"
        onClick={handleOpenModal}
        endIcon={<MapIcon />}
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
        Show Map
      </Button>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth={false}
        sx={{
          '& .MuiPaper-root': {
            width: '90%',
            height: '90%',
            margin: 0,
            borderRadius: 3,
            boxShadow: 'none',
            overflow: 'hidden',
          },
        }}
      >
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1000,
            color: 'black',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            padding: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
          }}
        >
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <CustomMap isLoading={isLoading} data={data} coordinates={{ lat: 51.15067631430282, lng: 71.44579022366129 }} />
          </APIProvider>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
