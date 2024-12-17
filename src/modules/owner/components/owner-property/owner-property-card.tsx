import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { ownerPropertyCardStyles } from './owner-property-card.styles';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper.css';
import { LazyImage } from '#/modules/home/components/lazy-image/lazy-image';
import { type Image } from '#/modules/home/types/image.type';
import { type Category } from '#/modules/home/types/category.type';
import { type Amenity } from '#/types/amenity.types';
import { useLanguage } from '#/contexts/language.context';

type OwnerPropertyCardProps = {
  id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  overallRating: number;
  images: Image[];
  category: Category;
  amenities: Amenity[];
};

export function OwnerPropertyCard({
  id,
  name,
  description,
  location,
  pricePerNight,
  images,
  overallRating,
  category,
  amenities,
}: OwnerPropertyCardProps) {
  const { language } = useLanguage();

  return (
    <Link to={`/property/${id}`} style={{ textDecoration: 'none', marginBottom: '20px' }}>
      <Card sx={ownerPropertyCardStyles.card}>
        <Box sx={ownerPropertyCardStyles.swiperContainer}>
          <Swiper
            style={ownerPropertyCardStyles.swiper}
            spaceBetween={30}
            effect={'fade'}
            loop={true}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[EffectFade, Navigation, Pagination]}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <LazyImage
                  src={image.url}
                  alt="Image of Apartment"
                  style={ownerPropertyCardStyles.image}
                  blurhash={image.blurhash || 'LBPs*Lxv~pjC?a-;NH0K~pM_IUxv'}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box sx={ownerPropertyCardStyles.content}>
          <Box>
            <Typography sx={ownerPropertyCardStyles.category}>{language === 'ru' ? category.name_ru : category.name}</Typography>
            <Typography sx={ownerPropertyCardStyles.name}>{name}</Typography>
            <Typography sx={ownerPropertyCardStyles.description}>{description}</Typography>

            <Box sx={ownerPropertyCardStyles.rating}>
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} color={index < Math.round(overallRating) ? 'warning' : 'disabled'} />
              ))}
            </Box>

            <Box sx={ownerPropertyCardStyles.location}>
              <FmdGoodIcon sx={{ color: 'red' }} />
              <Typography sx={{ paddingTop: '2px', paddingLeft: '8px', fontWeight: 600, color: 'text.secondary' }}>
                {location}
              </Typography>
            </Box>

            <Box sx={ownerPropertyCardStyles.amenitiesContainer}>
              {amenities.length > 0 &&
                amenities.slice(0, window.innerWidth < 600 ? 2 : 4).map((amenity) => (
                  <Typography key={amenity.id} sx={ownerPropertyCardStyles.amenity}>
                    {amenity.name}
                  </Typography>
                ))}
            </Box>
          </Box>

          <Typography sx={ownerPropertyCardStyles.price}>${pricePerNight} USD</Typography>
        </Box>
      </Card>
    </Link>
  );
}
