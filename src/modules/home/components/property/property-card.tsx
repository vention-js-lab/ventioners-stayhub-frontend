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
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { toast } from 'react-toastify';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { postWishlist } from '../../api/post-wishlist';
import { useMutation } from '@tanstack/react-query';
import { useAppSelector } from '#/redux/hooks';
import { LazyImage } from '../lazy-image/lazy-image';
import { selectAuth } from '#/redux/auth/auth.slice';

export function PropertyCard({ id, name, location, pricePerNight, images, isAddedToWishlist }: Accommodation) {
  const navigate = useNavigate();
  const [isInWishlist, setInWishlist] = useState(isAddedToWishlist);

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
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <LazyImage
                src={image.thumbnailUrl}
                blurhash={image.blurhash}
                alt="Image of Apartment"
                style={propertyCardStyles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <CardContent sx={{ padding: '16px 0px' }}>
          <Typography variant="h6">{name}</Typography>
          <Typography sx={{ opacity: '.7' }}>{location}</Typography>
          <Typography>
            <strong>${pricePerNight}</strong> night
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
