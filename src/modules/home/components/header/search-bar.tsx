import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SearchbarContainer, SearchButton, SearchSection, StyledDivider } from '../../styles';
import SearchIcon from '@mui/icons-material/Search';
import LocationIcon from '@mui/icons-material/LocationOn';
import { CalendarModal } from './modals/calendar.modal';
import { type GuestCounts, GuestsModal } from './modals/guests.modal';
import { searchbarStyles } from './styles';

interface DestinationInterface {
  id: number;
  name: string;
  country: string;
}
const destinations: DestinationInterface[] = [
  { id: 6, name: 'Cozy', country: 'Uz' },
  { id: 1, name: 'New York', country: 'United States' },
  { id: 2, name: 'London', country: 'United Kingdom' },
  { id: 3, name: 'Paris', country: 'France' },
  { id: 4, name: 'Tokyo', country: 'Japan' },
  { id: 5, name: 'Sydney', country: 'Australia' },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
    if (!search) {
      setSearchValue('');
      setSelectedDestination(null);
    }
    setSearchValue(search);
    setSelectedLocation(search);
  };

  const handleClose = () => {
    if (!searchValue.trim()) {
      setSelectedDestination(null);
      setSearchValue('');
    }
    setAnchorEl(null);
  };

  const handleDestinationSelect = (destination: DestinationInterface) => {
    if (destination.name) setSearchValue(destination.name);
    setSelectedDestination(destination);
    setSearchValue(destination.name);
    setSelectedLocation(destination.name);
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
    (dest: DestinationInterface) =>
      dest.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleGuestCountsChange = (counts: GuestCounts) => {
    setGuestCounts(counts);
  };

  return (
    <SearchbarContainer elevation={searchbarStyles.searchbarContainer.elevation} sx={searchbarStyles.searchbarContainer.styles}>
      <Stack
        direction={searchbarStyles.stack.direction}
        spacing={searchbarStyles.stack.spacing}
        divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
        sx={searchbarStyles.stack.styles}
      >
        <SearchSection onClick={(e) => setAnchorEl(e.currentTarget)} sx={searchbarStyles.searchSection.container}>
          <Stack alignItems="flex-start" sx={searchbarStyles.searchButtonContainer}>
            <Typography sx={searchbarStyles.commonTypography.title}>Search here</Typography>
            <Typography sx={searchbarStyles.commonTypography.subtitle}>
              {searchValue || (selectedDestination?.name ?? 'Search destinations')}
            </Typography>
          </Stack>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={searchbarStyles.searchSection.popover.anchorOrigin}
            transformOrigin={searchbarStyles.searchSection.popover.transformOrigin}
            PaperProps={{
              sx: searchbarStyles.searchSection.popover.paperProps,
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
                sx={searchbarStyles.searchSection.popover.searchDestionationsTextField}
              />
            </Box>
            <List sx={searchbarStyles.searchSection.popover.list}>
              {filteredDestinations.length === 0 ? (
                <ListItem>
                  <ListItemText primary="No destinations found" />
                </ListItem>
              ) : (
                filteredDestinations.map((destination) => (
                  <ListItem
                    key={destination.id}
                    onClick={() => handleDestinationSelect(destination)}
                    sx={searchbarStyles.searchSection.popover.listItem}
                  >
                    <ListItemIcon>
                      <LocationIcon color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={destination.name}
                      secondary={destination.country}
                      primaryTypographyProps={searchbarStyles.searchSection.popover.listItemText.primary}
                      secondaryTypographyProps={searchbarStyles.searchSection.popover.listItemText.secondary}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Popover>
        </SearchSection>

        <Box sx={searchbarStyles.datesSection.container}>
          {activeNav === 'stays' ? (
            <Stack
              direction="row"
              spacing={searchbarStyles.datesSection.checkInOutStack.spacing}
              divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
              sx={searchbarStyles.datesSection.checkInOutStack.styles}
            >
              <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
                <Stack
                  alignItems="flex-start"
                  sx={searchbarStyles.datesSection.commonWidth}
                  onClick={() => setIsCalendarOpen(true)}
                >
                  <Typography sx={searchbarStyles.commonTypography.title}>Check in</Typography>
                  <Typography sx={searchbarStyles.commonTypography.subtitle}>
                    {startDate ? `${months[startDate.getMonth()]} ${startDate.getDate()}` : 'Add dates'}{' '}
                  </Typography>
                </Stack>
              </SearchSection>
              <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
                <Stack
                  alignItems="flex-start"
                  sx={searchbarStyles.datesSection.commonWidth}
                  onClick={() => setIsCalendarOpen(true)}
                >
                  <Typography sx={searchbarStyles.commonTypography.title}>Check out</Typography>
                  <Typography sx={searchbarStyles.commonTypography.subtitle}>
                    {endDate ? `${months[endDate.getMonth()]} ${endDate.getDate()}` : 'Add dates'}
                  </Typography>
                </Stack>
              </SearchSection>
            </Stack>
          ) : (
            <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
              <Stack
                alignItems="flex-start"
                sx={searchbarStyles.datesSection.commonWidth}
                onClick={() => setIsCalendarOpen(true)}
              >
                <Typography sx={searchbarStyles.commonTypography.title}>Date</Typography>
                <Typography sx={searchbarStyles.commonTypography.subtitle}>
                  {startDate ? `${months[startDate.getMonth()]} ${startDate.getDate()}` : 'Select Date'}
                </Typography>
              </Stack>
            </SearchSection>
          )}
        </Box>

        <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
          <Stack alignItems="flex-start" sx={searchbarStyles.datesSection.commonWidth} onClick={() => setIsGuestsModalOpen(true)}>
            <Typography sx={searchbarStyles.commonTypography.title}>Who</Typography>
            <Typography sx={searchbarStyles.commonTypography.subtitle}>{formatGuestCount() || 'Add guests'}</Typography>
          </Stack>
        </SearchSection>

        <SearchButton onClick={handleSearchClick} sx={searchbarStyles.searchButton}>
          <SearchIcon sx={searchbarStyles.searchIcon} />
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
