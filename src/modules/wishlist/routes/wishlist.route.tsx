import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { wishlistRouteStyles } from '../../wishlist/routes/wishlist.route.styles';
import { HeaderComponent } from '#/modules/home/components/header';
import { PropertyList } from '#/modules/home/components/property/property-list';
import { useWishlistedProperties } from '../api/get-wishlisted-properties';

export function WishlistRoute() {
  const { isLoading, data } = useWishlistedProperties();

  return (
    <Box sx={wishlistRouteStyles.container}>
      <HeaderComponent />
      <Container maxWidth="xl">
        <Typography variant="h3" sx={wishlistRouteStyles.headerText}>
          Your wishlist
        </Typography>
        <PropertyList isLoading={isLoading} data={data} emptyMessage="No Wishlisted properties found" />
      </Container>
    </Box>
  );
}
