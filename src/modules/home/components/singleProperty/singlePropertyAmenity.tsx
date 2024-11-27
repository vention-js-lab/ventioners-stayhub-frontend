import React, { useState, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { type Dayjs } from 'dayjs';

interface Amenity {
  id: string;
  name: string;
  description: string;
}

interface SinglePropertyAmenityProps {
  owner: string;
  amenities: Amenity[];
  description: string;
  pricePerNight: number;
}

const SinglePropertyAmenity: React.FC<SinglePropertyAmenityProps> = ({ owner, amenities, description, pricePerNight }) => {
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
      checkOutDate.diff(checkInDate, 'day') > 0
    ) {
      const diffInDays = checkOutDate.diff(checkInDate, 'day');
      const totalPrice = diffInDays * pricePerNight;
      const serviceFee = 20;
      return { totalPrice, serviceFee, diffInDays };
    }
    return { totalPrice: 4 * pricePerNight, serviceFee: 20, diffInDays: 4 };
  }, [checkInDate, checkOutDate, pricePerNight]);

  const isDatePicked = calculatePrice.diffInDays > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: { xs: 'center', md: 'flex-start' },
        mt: 6,
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box sx={{ maxWidth: 800, p: 2, flex: '1 1 60%' }}>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              background: 'rgb(219,10,98)',
              color: 'white',
              mr: 2,
              fontSize: 24,
            }}
          >
            {owner.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h6">{owner}</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          {displayedAmenities.map((amenity) => (
            <Box
              key={amenity.id}
              sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
                minWidth: { xs: '100%', md: 'calc(50% - 16px)' },
                maxWidth: { xs: '100%', md: 'calc(50% - 16px)' },
              }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
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

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1">{description}</Typography>

        <Divider sx={{ my: 3, display: { md: 'none', xs: 'block' } }} />
      </Box>

      <Box
        sx={{
          p: 2,
          maxWidth: 400,
          flex: '1 1 35%',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          mt: { xs: 0, md: 2 },
          borderRadius: '15px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.06)',
          mx: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6">${pricePerNight}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
            <Box sx={{ flex: '1' }}>
              <DatePicker label="Check-in" value={checkInDate} onChange={(newDate) => setCheckInDate(newDate)} />
            </Box>
            <Box sx={{ flex: '1' }}>
              <DatePicker label="Check-out" value={checkOutDate} onChange={(newDate) => setCheckOutDate(newDate)} />
            </Box>
          </Box>
        </LocalizationProvider>
        <Button sx={{ mt: 2, width: '100%', background: 'rgb(219,10,98)', py: 1 }} variant="contained">
          Reserve
        </Button>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">
              ${pricePerNight} x {isDatePicked ? calculatePrice.diffInDays : 4} nights{' '}
            </Typography>{' '}
            <Typography variant="body1">${calculatePrice.totalPrice}</Typography>
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">StayHub Service Fee</Typography> <Typography variant="body1">$20</Typography>
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Total
            </Typography>{' '}
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              ${calculatePrice.totalPrice + calculatePrice.serviceFee}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SinglePropertyAmenity;
