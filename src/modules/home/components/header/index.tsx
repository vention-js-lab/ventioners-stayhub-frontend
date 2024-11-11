import { AppBar, Box, Button, Container, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { NavButton } from '../../styles';
import fullLogo from '#/assets/logo-full.svg';
import logo from '#/assets/logo.svg';
import { UserNavigationMenu } from './user-navigation.menu';
import { SearchBar } from './search-bar';

export function HeaderComponent() {
  const theme = useTheme();
  const isMediumDown = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeNav, setActiveNav] = useState<'stays' | 'experiences'>('stays');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', height: 80, position: 'relative' }}>
          {/* Logo */}
          <Button
            sx={{
              right: 100,
              position: 'relative',
              '&:hover': { backgroundColor: 'white' },
              minWidth: isMediumDown ? 60 : 'auto', // Adjust button width for small logo
            }}
            disableRipple
            href="/"
          >
            <img
              src={isMediumDown ? logo : fullLogo}
              alt="Logo"
              style={{
                height: isMediumDown ? 42 : 55,
                width: 'auto',
              }}
            />
          </Button>

          {/* Center Navigation */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NavButton active={activeNav === 'stays'} onClick={() => setActiveNav('stays')}>
              <Typography sx={{ fontWeight: activeNav === 'stays' ? 600 : 500 }}>Stays</Typography>
            </NavButton>
            <NavButton active={activeNav === 'experiences'} onClick={() => setActiveNav('experiences')}>
              <Typography sx={{ fontWeight: activeNav === 'experiences' ? 600 : 500 }}>Experiences</Typography>
            </NavButton>
          </Box>

          {/* Right Navigation */}
          <UserNavigationMenu anchorEl={anchorEl} handleMenuClose={handleMenuClose} handleMenuOpen={handleMenuOpen} />

          {/* Bottom Search Bar */}
          <SearchBar activeNav={activeNav} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
