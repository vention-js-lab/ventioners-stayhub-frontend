import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { type Accommodation } from '../../types/accommodation.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { propertyCardStyles } from './property-card.styles';
import StarIcon from '@mui/icons-material/Star';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { toast } from 'react-toastify';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '#/redux/hooks';
import { LazyImage } from '../lazy-image/lazy-image';
import { selectAuth } from '#/redux/auth/auth.slice';
import { postWishlist } from '#/modules/wishlist/api/post-wishlist';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useAccommodationById } from '#/modules/property-detail/api/get-accommodation';
import Box from '@mui/material/Box';

export function PropertyCard({ id, name, location, pricePerNight, images, isAddedToWishlist }: Accommodation) {
  const sortedImages = images.sort((a, b) => a.order - b.order);
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const [isInWishlist, setInWishlist] = useState(isAddedToWishlist);
  const { data } = useAccommodationById(id || '');
  const mutation = useMutation({
    mutationFn: () => postWishlist(id),
    onSuccess: () => {
      setInWishlist((prev) => !prev);
    },
    onError: () => {
      toast.error('Failed to add/remove to wishlist');
    },
  });

  const isLoading = mutation.status === 'pending';

  const auth = useAppSelector(selectAuth);
  const handleFavoriteClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
    event.preventDefault();

    if (!auth.user) {
      navigate('/login');
      return;
    }

    if (!isLoading) {
      mutation.mutate();
    }
  };

  const reviews = data?.data.reviews || [];
  const totalRating = reviews.reduce((sum, review) => {
    return sum + Number(review.rating);
  }, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(2) : null;
  return (
    <Link to={`/property/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ boxShadow: 'none', position: 'relative' }}>
        {isInWishlist ? (
          <FavoriteIcon onClick={handleFavoriteClick} sx={propertyCardStyles.favoriteIconStyle} style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon onClick={handleFavoriteClick} sx={propertyCardStyles.favoriteIconStyle} />
        )}
        <Swiper
          style={{ height: '240px', aspectRatio: '1/1', width: '100%', borderRadius: '12px' }}
          spaceBetween={30}
          effect={'fade'}
          loop={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
          {sortedImages.map((image) => (
            <SwiperSlide key={image.id}>
              <LazyImage
                src={image.thumbnailUrl}
                blurhash={image.blurhash || 'LBPs*Lxv~pjC?a-;NH0K~pM_IUxv'}
                alt="Image of Apartment"
                style={propertyCardStyles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <CardContent sx={{ padding: '0px 0px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '8px' }}>
            <Typography
              variant="h6"
              sx={{ fontSize: '18px', whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 'calc(100% - 70px)' }}
            >
              {name}
            </Typography>
            {averageRating ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ fontSize: '16px', color: 'black', marginRight: '4px' }} />
                <Typography sx={{ fontWeight: '500' }}>{averageRating}</Typography>
              </Box>
            ) : null}
          </Box>

          <Typography sx={{ opacity: '.7', fontSize: '14px' }}>{location}</Typography>
          <Typography>
            <span style={{ fontWeight: '600' }}>${pricePerNight}</span> {t(TRANSLATION_KEYS.home.property.night)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
