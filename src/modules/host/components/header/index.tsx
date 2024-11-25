import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import logo from '#/assets/logo.svg';
import { headerStyles } from '../../styles/header';

export function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = '/';
  };

  return (
    <AppBar position="fixed" sx={headerStyles.appBar}>
      <Toolbar sx={headerStyles.toolbar}>
        <Box component="a" href="/" onClick={handleLogoClick} sx={headerStyles.logo}>
          {isMobile ? (
            <Typography variant="h6" sx={headerStyles.logoText}>
              StayHub
            </Typography>
          ) : (
            <Box sx={headerStyles.logoWrapper}>
              <img src={logo} alt="StayHub" style={headerStyles.logoImage} />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
