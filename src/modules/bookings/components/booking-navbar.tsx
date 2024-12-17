import Typography from '@mui/material/Typography';
import { navStyles } from './booking-navbar.style';
import { BookingStatus } from '../types/booking-status.constant';
import Box from '@mui/material/Box';
import { formatStatusText } from '#/utils';

interface BookingsNavbarProps {
  selectedCategory: BookingStatus;
  onCategoryChange: (status: BookingStatus) => void;
}

export function BookingsNavbar({ selectedCategory, onCategoryChange }: BookingsNavbarProps) {
  return (
    <Box>
      <Typography variant="h4" sx={navStyles.header}>
        My Bookings
      </Typography>
      <Box sx={navStyles.container}>
        {Object.values(BookingStatus).map((status) => {
          const isSelected = selectedCategory === status;
          return (
            <Typography key={status} sx={navStyles.navItem(isSelected)} onClick={() => onCategoryChange(status)}>
              {formatStatusText(status)}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}
