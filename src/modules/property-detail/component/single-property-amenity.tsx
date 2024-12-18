import { useState, useMemo, Fragment } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import { PropertyAmenityStyles } from './single-property-amenity.styles';
import { type Amenity } from '#/types/amenity.types';
import { ServiceFeePortion } from '../constants/price.constant';
import { DefaultStayingDays } from '../constants/staying-days.constant';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

interface PropertyProps {
  owner: string;
  amenities: Amenity[];
  description: string;
  pricePerNight: number;
  numberOfGuests: number;
  checkInDate: Dayjs | null;
  checkOutDate: Dayjs | null;
  setCheckInDate: (date: Dayjs | null) => void;
  setCheckOutDate: (date: Dayjs | null) => void;
  onReserve: () => void;
}

function Property({
  owner,
  amenities,
  description,
  pricePerNight,
  numberOfGuests,
  setCheckOutDate,
  setCheckInDate,
  checkOutDate,
  checkInDate,
  onReserve,
}: PropertyProps) {
  const { t } = useTranslation('accommodation-details');
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 10);

  const calculatePrice = useMemo(() => {
    if (
      checkInDate &&
      checkOutDate &&
      checkOutDate.isValid() &&
      checkInDate.isValid() &&
      checkOutDate.diff(checkInDate, 'day') > 0
    ) {
      const diffInDays = checkOutDate.diff(checkInDate, 'day');
      const basePrice = diffInDays * pricePerNight;
      const serviceFee = Math.ceil(ServiceFeePortion * basePrice);
      return { basePrice, serviceFee, diffInDays };
    }
    return {
      basePrice: DefaultStayingDays * pricePerNight,
      serviceFee: Math.ceil(DefaultStayingDays * pricePerNight * ServiceFeePortion),
      diffInDays: DefaultStayingDays,
    };
  }, [checkInDate, checkOutDate, pricePerNight]);

  const isDatePicked = calculatePrice.diffInDays >= 0;
  const totalPrice = Math.ceil(calculatePrice.basePrice + calculatePrice.serviceFee);

  return (
    <Box sx={PropertyAmenityStyles.mainContainerBox}>
      <Box sx={PropertyAmenityStyles.leftContainerBox}>
        <Divider sx={PropertyAmenityStyles.divider} />
        <Box sx={PropertyAmenityStyles.avatarBox}>
          <Avatar sx={PropertyAmenityStyles.avatar}>{owner.charAt(0).toUpperCase()}</Avatar>
          <Box>
            <Typography variant="h6">{owner}</Typography>
            <Typography>{t(TRANSLATION_KEYS.accommodation_details.guests, { count: numberOfGuests })}</Typography>
          </Box>
        </Box>

        <Divider sx={PropertyAmenityStyles.divider} />

        <Box sx={PropertyAmenityStyles.unshownAmenitiesBox}>
          {displayedAmenities.map((amenity) => (
            <Box key={amenity.id} sx={PropertyAmenityStyles.unshownAmenitiesCard}>
              <Box>
                <Typography variant="subtitle1" sx={PropertyAmenityStyles.priceBoxBoldTypography}>
                  {amenity.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {amenity.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {amenities.length > 10 && (
          <Button onClick={handleShowAll} sx={{ mt: 2 }} variant="outlined" color="primary">
            {showAll ? t(TRANSLATION_KEYS.accommodation_details.show_less) : t(TRANSLATION_KEYS.accommodation_details.show_all)}
          </Button>
        )}

        <Divider sx={PropertyAmenityStyles.divider} />

        <Typography variant="body1">
          {description.split('\n').map((line, idx) => (
            <Fragment key={idx}>
              {line}
              <br />
            </Fragment>
          ))}
        </Typography>

        <Divider sx={PropertyAmenityStyles.customDivider} />
      </Box>

      <Box sx={PropertyAmenityStyles.rightContainerBox}>
        <Typography variant="h6">${pricePerNight}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={PropertyAmenityStyles.datePickBox}>
            <Box sx={PropertyAmenityStyles.datePick}>
              <DatePicker
                label={t(TRANSLATION_KEYS.accommodation_details.check_in)}
                value={checkInDate}
                onChange={(newDate) => setCheckInDate(newDate)}
                minDate={dayjs()}
              />
            </Box>
            <Box sx={PropertyAmenityStyles.datePick}>
              <DatePicker
                label={t(TRANSLATION_KEYS.accommodation_details.check_out)}
                value={checkOutDate}
                onChange={(newDate) => setCheckOutDate(newDate)}
                minDate={checkInDate ? checkInDate.add(1, 'day') : dayjs()}
                disabled={!checkInDate}
              />
            </Box>
          </Box>
        </LocalizationProvider>
        <Button sx={PropertyAmenityStyles.reserveButton} variant="contained" onClick={onReserve}>
          {t(TRANSLATION_KEYS.accommodation_details.reserve)}
        </Button>
        <Box sx={PropertyAmenityStyles.priceBox}>
          <Typography variant="body1" sx={PropertyAmenityStyles.priceBoxTypography1}>
            <Typography variant="body1">
              ${pricePerNight} x{' '}
              {isDatePicked
                ? t(TRANSLATION_KEYS.accommodation_details.nights, { count: calculatePrice.diffInDays })
                : t(TRANSLATION_KEYS.accommodation_details.nights, { count: DefaultStayingDays })}
            </Typography>
            <Typography variant="body1">${calculatePrice.basePrice}</Typography>
          </Typography>
          <Typography variant="body1" sx={PropertyAmenityStyles.priceBoxTypography2}>
            <Typography variant="body1">{t(TRANSLATION_KEYS.accommodation_details.stayhub_service_fee)}</Typography>{' '}
            <Typography variant="body1">${calculatePrice.serviceFee}</Typography>
          </Typography>
          <Divider sx={PropertyAmenityStyles.priceBoxDivider} />
          <Typography variant="body1" sx={PropertyAmenityStyles.priceBoxTypography3}>
            <Typography variant="body1" sx={PropertyAmenityStyles.priceBoxBoldTypography}>
              {t(TRANSLATION_KEYS.accommodation_details.total)}
            </Typography>
            <Typography variant="body1" sx={PropertyAmenityStyles.priceBoxBoldTypography}>
              ${totalPrice}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export { Property };
