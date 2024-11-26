import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { type Accommodation } from '../../types/accommodation.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { properyCardStyles } from './property-card.styles';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { axiosInstance } from '#/configs';

export function ApartmentCard({ id, name, location, pricePerNight, images, isAddedToWishlist }: Accommodation) {
  const navigate = useNavigate();
  const [isInWishlist, setInWishlist] = useState(isAddedToWishlist);

  const handleFavoriteClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    // const isUserExist = localStorage.getItem(`isUserLoggedIn`);

    // if (!isUserExist) {
    //   navigate('/login');
    //   return;
    // }

    try {
      setInWishlist((prev) => !prev);
      await axiosInstance.post(`/accommodations/${id}/wishlist`);
    } catch (error) {
      alert('Failed to add/remove to wishlist');
      setInWishlist((prev) => !prev);
    }
  };

  return (
    <Link to={`/apartment/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ boxShadow: 'none', position: 'relative' }}>
        {isInWishlist ? (
          <FavoriteIcon onClick={handleFavoriteClick} sx={properyCardStyles.favoriteIconStyle} style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon onClick={handleFavoriteClick} sx={properyCardStyles.favoriteIconStyle} />
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
            <SwiperSlide key={image}>
              <img src={image} alt="Image of Apartment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
