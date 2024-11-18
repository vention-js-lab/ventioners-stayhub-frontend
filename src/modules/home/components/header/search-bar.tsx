import { useState } from 'react';
import { Box, Stack, Typography, Popover, TextField, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SearchbarContainer, SearchButton, SearchSection, StyledDivider } from '../../styles';
import { Search as SearchIcon, LocationOn as LocationIcon } from '@mui/icons-material';
import { CalendarModal } from './modals/calendar.modal';
import { type GuestCounts, GuestsModal } from './modals/guests.modal';

const destinations = [
  { id: 6, name: 'Cozy', country: 'Uz' },
  { id: 1, name: 'New York', country: 'United States' },
  { id: 2, name: 'London', country: 'United Kingdom' },
  { id: 3, name: 'Paris', country: 'France' },
  { id: 4, name: 'Tokyo', country: 'Japan' },
  { id: 5, name: 'Sydney', country: 'Australia' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const commonTypographyStyles = {
  title: {
    fontSize: { xs: 11, sm: 12 },
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  subtitle: {
    color: '#717171',
    fontSize: { xs: 13, sm: 14 },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
  },
} as const;

interface SearchBarProps {
  activeNav: 'stays' | 'experiences';
  setSelectedLocation: (newState: string) => void;
}

export function SearchBar({ activeNav, setSelectedLocation }: SearchBarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<{ name: string } | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setIsCalendarOpen(false);
  };

  const handleSearchClick = () => {
    const search = searchValue.trim() || selectedDestination?.name || '';
    if (!searchValue.trim()) {
      setSearchValue('');
      setSelectedDestination(null);
    }
    setSelectedLocation(search);
  };

  const handleClose = () => {
    if (!searchValue.trim()) {
      setSelectedDestination(null);
    }
    setAnchorEl(null);
  };

  const handleDestinationSelect = (destination: { name: string }) => {
    setSearchValue(destination.name);
    if (!destination.name) {
      setSearchValue('');
    }
    setSelectedDestination(destination);
    handleClose();
  };

  const open = Boolean(anchorEl);

  const formatGuestCount = () => {
    const total = guestCounts.adults + guestCounts.children;
    let text = `${total} guest${total !== 1 ? 's' : ''}`;

    if (guestCounts.infants > 0) {
      text += `, ${guestCounts.infants} infant${guestCounts.infants !== 1 ? 's' : ''}`;
    }
    if (guestCounts.pets > 0) {
      text += `, ${guestCounts.pets} pet${guestCounts.pets !== 1 ? 's' : ''}`;
    }
    return text;
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      dest.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleGuestCountsChange = (counts: GuestCounts) => {
    setGuestCounts(counts);
  };

  return (
    <SearchbarContainer
      elevation={2}
      sx={{
        width: { xs: '90%', sm: '80%', md: '80%', lg: '70%' },
        height: '4rem',
        maxWidth: '850px',
        transition: 'all 0.3s ease',
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2 }}
        divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
        sx={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: { xs: '0 4px', sm: '0 8px' },
        }}
      >
        <SearchSection
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            flex: 1,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <Stack alignItems="flex-start" sx={{ width: '100%' }}>
            <Typography sx={commonTypographyStyles.title}>Search here</Typography>
            <Typography sx={commonTypographyStyles.subtitle}>
              {searchValue || (selectedDestination ? selectedDestination.name : 'Search destinations')}
            </Typography>
          </Stack>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            PaperProps={{
              sx: {
                width: '300px',
                mt: 1,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                autoFocus={true}
                fullWidth={true}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search destinations"
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.2)',
                    },
                  },
                }}
              />
            </Box>
            <List sx={{ maxHeight: '300px', overflow: 'auto' }}>
              {filteredDestinations.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No destinations found" />
                </ListItem>
              ) : (
                filteredDestinations.map((destination) => (
                  <ListItem
                    key={destination.id}
                    onClick={() => handleDestinationSelect(destination)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      },
                    }}
                  >
                    <ListItemIcon>
                      <LocationIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={destination.name}
                      secondary={destination.country}
                      primaryTypographyProps={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.8rem',
                      }}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Popover>
        </SearchSection>

        <Box
          sx={{
            display: 'flex',
            flex: { xs: 1, sm: 2 },
            gap: { xs: 1, sm: 2 },
            height: '100%',
            alignItems: 'center',
          }}
        >
          {activeNav === 'stays' ? (
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2 }}
              divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
              sx={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <SearchSection sx={{ flex: 1 }}>
                <Stack alignItems="flex-start" sx={{ width: '100%' }} onClick={() => setIsCalendarOpen(true)}>
                  <Typography sx={commonTypographyStyles.title}>Check in</Typography>
                  <Typography sx={commonTypographyStyles.subtitle}>
                    {startDate ? `${months[startDate.getMonth()]} ${startDate.getDate()}` : 'Add dates'}{' '}
                  </Typography>
                </Stack>
              </SearchSection>
              <SearchSection sx={{ flex: 1 }}>
                <Stack alignItems="flex-start" sx={{ width: '100%' }} onClick={() => setIsCalendarOpen(true)}>
                  <Typography sx={commonTypographyStyles.title}>Check out</Typography>
                  <Typography sx={commonTypographyStyles.subtitle}>
                    {endDate ? `${months[endDate.getMonth()]} ${endDate.getDate()}` : 'Add dates'}
                  </Typography>
                </Stack>
              </SearchSection>
            </Stack>
          ) : (
            <SearchSection sx={{ flex: 1 }}>
              <Stack alignItems="flex-start" sx={{ width: '100%' }} onClick={() => setIsCalendarOpen(true)}>
                <Typography sx={commonTypographyStyles.title}>Date</Typography>
                <Typography sx={commonTypographyStyles.subtitle}>
                  {startDate ? `${months[startDate.getMonth()]} ${startDate.getDate()}` : 'Select Date'}
                </Typography>
              </Stack>
            </SearchSection>
          )}
        </Box>

        <SearchSection sx={{ flex: 1 }}>
          <Stack alignItems="flex-start" sx={{ width: '100%' }} onClick={() => setIsGuestsModalOpen(true)}>
            <Typography sx={commonTypographyStyles.title}>Who</Typography>
            <Typography sx={commonTypographyStyles.subtitle}>{formatGuestCount() || 'Add guests'}</Typography>
          </Stack>
        </SearchSection>

        <SearchButton
          onClick={handleSearchClick}
          sx={{
            width: { xs: '2.5rem', sm: '3rem' },
            height: { xs: '2.5rem', sm: '3rem' },
            minWidth: { xs: '2.5rem', sm: '3rem' },
            margin: 'auto 0',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <SearchIcon
            sx={{
              fontSize: { xs: 18, sm: 22 },
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'rotate(90deg)',
              },
            }}
          />
        </SearchButton>
      </Stack>
      <CalendarModal
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        onDateSelect={handleDateSelect}
      />
      <GuestsModal
        open={isGuestsModalOpen}
        onClose={() => setIsGuestsModalOpen(false)}
        guestCounts={guestCounts}
        onGuestCountsChange={handleGuestCountsChange}
      />
    </SearchbarContainer>
  );
}
