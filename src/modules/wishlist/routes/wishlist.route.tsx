import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { wishlistRouteStyles } from '../../wishlist/routes/wishlist.route.styles';
import { HeaderComponent } from '#/modules/home/components/header';
import { PropertyList } from '#/modules/home/components/property/property-list';
import { useWishlistedProperties } from '../api/get-wishlisted-properties';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export function WishlistRoute() {
  const { t } = useTranslation('wishlist');
  const { isLoading, data } = useWishlistedProperties();

  return (
    <Box sx={wishlistRouteStyles.container}>
      <HeaderComponent />
      <Container maxWidth="xl">
        <Typography variant="h3" sx={wishlistRouteStyles.headerText}>
          {t(TRANSLATION_KEYS.wishlist.header.title)}
        </Typography>
        <PropertyList isLoading={isLoading} data={data} />
      </Container>
    </Box>
  );
}
