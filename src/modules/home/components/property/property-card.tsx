import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { type Accommodation } from '../../types/accommodation.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { styles } from './property.styles';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';

export function ApartmentCard(apartment: Accommodation) {
  const [isLiked, setIsLiked] = useState(false);
  const navidate = useNavigate();
  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked-${apartment.id}`);
    setIsLiked(likedStatus === 'true');
  }, [apartment.id]);

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    const isUserExist = localStorage.getItem(`isUserLoggedIn`);

    if (!isUserExist) {
      navidate('/login');
      return;
    }

    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    localStorage.setItem(`liked-${apartment.id}`, String(newLikedStatus));
  };

  return (
    <Link to={`/apartment/${apartment.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ boxShadow: 'none', position: 'relative' }}>
        {isLiked ? (
          <FavoriteIcon onClick={handleFavoriteClick} sx={styles.favoriteIconStyle} style={{ color: 'red' }} />
        ) : (
          <FavoriteBorderIcon onClick={handleFavoriteClick} sx={styles.favoriteIconStyle} />
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
          {apartment.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="Image of Apartment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </SwiperSlide>
          ))}
        </Swiper>

        <CardContent sx={{ padding: '16px 0px' }}>
          <Typography variant="h6">{apartment.name}</Typography>
          <Typography sx={{ opacity: '.7' }}>{apartment.location}</Typography>
          <Typography>
            <strong>${apartment.pricePerNight}</strong> night
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
