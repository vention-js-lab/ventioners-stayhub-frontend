import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { EffectFade, Navigation, Pagination } from 'swiper/modules';

type Accommodation = {
  id: number;
  name: string;
  description: string;
  images: string[];
  location: string;
  price_per_night: number;
  type: string;
  amenities: string[];
  status: string;
};

export function ApartmentCard(apartment: Accommodation) {
  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('Favorite icon clicked');
  };

  return (
    <Link to={`/apartment/${apartment.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ boxShadow: 'none', position: 'relative' }}>
        <FavoriteBorderIcon
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
            padding: '4px',
            fontSize: '32px',
          }}
        />
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
          {apartment.images.map((image) => (
            <SwiperSlide>
              <img src={image} alt="Image of Apartment" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </SwiperSlide>
          ))}
        </Swiper>

        <CardContent sx={{ padding: '16px 0px' }}>
          <Typography variant="h6">{apartment.name}</Typography>
          <Typography sx={{ opacity: '.7' }}>{apartment.location}</Typography>
          <Typography>
            <strong>${apartment.price_per_night}</strong> night
          </Typography>
        </CardContent>
      </Card>
      <style>{`

       .mySwiper .swiper-button-next,
        .mySwiper .swiper-button-prev {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        /* Show navigation buttons on hover */
        .mySwiper:hover .swiper-button-next,
        .mySwiper:hover .swiper-button-prev {
          opacity: 1;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after,
        .swiper-button-next:before,
        .swiper-button-prev:before {
          height: 15px;
          font-size: 15px; 
          color: #000;
          background-color: #fff; 
          border-radius: 50%; /* Make buttons round */
        }
        .swiper-button-next,
        .swiper-button-prev{
          color: #000;
          background-color: #fff; 
          border-radius: 50%;
          padding: 0 12px;
          height: 28px;
        }
        .swiper-pagination-bullet{
          background-color: #fff;
        }
      `}</style>
    </Link>
  );
}
