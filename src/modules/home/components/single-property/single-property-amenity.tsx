import { useState, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { type Dayjs } from 'dayjs';
import { SinglePropertyAmenityStyles } from './single-property-amenity.styles';
import { type AmenityInterface } from '../../../../types/amenity.types';

interface SinglePropertyAmenityProps {
  owner: string;
  amenities: AmenityInterface[];
  description: string;
  pricePerNight: number;
}

function SinglePropertyAmenity({ owner, amenities, description, pricePerNight }: SinglePropertyAmenityProps) {
  const [showAll, setShowAll] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

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
      checkOutDate.diff(checkInDate, 'day') >= 0
    ) {
      const diffInDays = checkOutDate.diff(checkInDate, 'day');
      const basePrice = (diffInDays === 0 ? 1 : diffInDays) * pricePerNight;
      const serviceFee = 0.1 * basePrice;
      return { basePrice, serviceFee, diffInDays };
    }
    return { basePrice: 4 * pricePerNight, serviceFee: 4 * pricePerNight * 0.1, diffInDays: 4 };
  }, [checkInDate, checkOutDate, pricePerNight]);

  const isDatePicked = calculatePrice.diffInDays >= 0;
  const totalPrice = calculatePrice.basePrice + calculatePrice.serviceFee;

  return (
    <Box sx={SinglePropertyAmenityStyles.mainContainerBox}>
      <Box sx={SinglePropertyAmenityStyles.leftContainerBox}>
        <Divider sx={SinglePropertyAmenityStyles.divider} />
        <Box sx={SinglePropertyAmenityStyles.avatarBox}>
          <Avatar sx={SinglePropertyAmenityStyles.avatar}>{owner.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h6">{owner}</Typography>
        </Box>

        <Divider sx={SinglePropertyAmenityStyles.divider} />

        <Box sx={SinglePropertyAmenityStyles.unshownAmenitiesBox}>
          {displayedAmenities.map((amenity) => (
            <Box key={amenity.id} sx={SinglePropertyAmenityStyles.unshownAmenitiesCard}>
              <Box>
                <Typography variant="subtitle1" sx={SinglePropertyAmenityStyles.priceBoxBoldTypography}>
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
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
        )}

        <Divider sx={SinglePropertyAmenityStyles.divider} />

        <Typography variant="body1">{description}</Typography>

        <Divider sx={SinglePropertyAmenityStyles.customDivider} />
      </Box>

      <Box sx={SinglePropertyAmenityStyles.rightContainerBox}>
        <Typography variant="h6">${pricePerNight}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={SinglePropertyAmenityStyles.datePickBox}>
            <Box sx={SinglePropertyAmenityStyles.datePick}>
              <DatePicker
                label="Check-in"
                value={checkInDate}
                onChange={(newDate) => setCheckInDate(newDate)}
                minDate={dayjs()}
              />
            </Box>
            <Box sx={SinglePropertyAmenityStyles.datePick}>
              <DatePicker
                label="Check-out"
                value={checkOutDate}
                onChange={(newDate) => setCheckOutDate(newDate)}
                minDate={checkInDate ? checkInDate.add(1, 'day') : dayjs()}
                disabled={!checkInDate}
              />
            </Box>
          </Box>
        </LocalizationProvider>
        <Button sx={SinglePropertyAmenityStyles.reserveButton} variant="contained">
          Reserve
        </Button>
        <Box sx={SinglePropertyAmenityStyles.priceBox}>
          <Typography variant="body1" sx={SinglePropertyAmenityStyles.priceBoxTypography1}>
            <Typography variant="body1">
              ${pricePerNight} x {isDatePicked ? calculatePrice.diffInDays : 4} nights
            </Typography>
            <Typography variant="body1">${calculatePrice.basePrice}</Typography>
          </Typography>
          <Typography variant="body1" sx={SinglePropertyAmenityStyles.priceBoxTypography2}>
            <Typography variant="body1">StayHub Service Fee</Typography>{' '}
            <Typography variant="body1">${calculatePrice.serviceFee}</Typography>
          </Typography>
          <Divider sx={SinglePropertyAmenityStyles.priceBoxDivider} />
          <Typography variant="body1" sx={SinglePropertyAmenityStyles.priceBoxTypography3}>
            <Typography variant="body1" sx={SinglePropertyAmenityStyles.priceBoxBoldTypography}>
              Total
            </Typography>
            <Typography variant="body1" sx={SinglePropertyAmenityStyles.priceBoxBoldTypography}>
              ${totalPrice}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export { SinglePropertyAmenity };
