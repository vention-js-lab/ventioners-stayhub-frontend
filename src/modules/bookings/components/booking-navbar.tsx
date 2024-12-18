import Typography from '@mui/material/Typography';
import { navStyles } from './booking-navbar.style';
import { BookingStatus } from '../types/booking-status.constant';
import Box from '@mui/material/Box';
import { formatStatusText } from '#/utils';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

interface BookingsNavbarProps {
  selectedCategory: BookingStatus;
  onCategoryChange: (status: BookingStatus) => void;
}

export function BookingsNavbar({ selectedCategory, onCategoryChange }: BookingsNavbarProps) {
  const { t } = useTranslation('bookings');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryChange = (status: BookingStatus) => {
    onCategoryChange(status);
    handleMenuClose();
  };

  return (
    <Box>
      <Typography variant="h4" sx={navStyles.header}>
        {t(TRANSLATION_KEYS.bookings.my_bookings)}
      </Typography>
      {isMobile ? (
        <Box sx={navStyles.container}>
          <Button variant="contained" onClick={handleMenuOpen} sx={navStyles.menuStyles}>
            {formatStatusText(selectedCategory)}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {Object.values(BookingStatus).map((status) => (
              <MenuItem key={status} selected={selectedCategory === status} onClick={() => handleCategoryChange(status)}>
                {formatStatusText(status)}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      ) : (
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
      )}
    </Box>
  );
}
