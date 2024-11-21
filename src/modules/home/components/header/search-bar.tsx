import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SearchbarContainer, SearchButton, SearchSection, StyledDivider } from '../../styles';
import SearchIcon from '@mui/icons-material/Search';
import { CalendarModal } from './modals/calendar.modal';
import { GuestsModal } from './modals/guests.modal';
import { searchbarStyles } from './styles';
import { DestinationSearch } from './destination-search';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface SearchBarProps {
  activeNav: 'stays' | 'experiences';
  setSelectedLocation: (newState: string) => void;
}

interface DateButtonProps {
  label: string;
  date: Date | null;
  onOpen: () => void;
}

function DateButton({ label, date, onOpen }: DateButtonProps) {
  return (
    <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
      <Stack alignItems="flex-start" sx={searchbarStyles.datesSection.commonWidth} onClick={onOpen}>
        <Typography sx={searchbarStyles.commonTypography.title}>{label}</Typography>
        <Typography sx={searchbarStyles.commonTypography.subtitle}>
          {date ? `${months[date.getMonth()]} ${date.getDate()}` : `Add ${label.toLowerCase()}`}
        </Typography>
      </Stack>
    </SearchSection>
  );
}

export function SearchBar({ activeNav, setSelectedLocation }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({ adults: 1, children: 0, infants: 0, pets: 0 });

  const formatGuestCount = () => {
    const total = guestCounts.adults + guestCounts.children;
    const parts = [`${total} guest${total !== 1 ? 's' : ''}`];

    if (guestCounts.infants > 0) parts.push(`${guestCounts.infants} infant${guestCounts.infants !== 1 ? 's' : ''}`);
    if (guestCounts.pets > 0) parts.push(`${guestCounts.pets} pet${guestCounts.pets !== 1 ? 's' : ''}`);

    return parts.join(', ');
  };

  const handleDateSelect = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    setIsCalendarOpen(false);
  };

  const renderDateSection = () => {
    if (activeNav === 'stays') {
      return (
        <Stack
          direction="row"
          spacing={searchbarStyles.datesSection.checkInOutStack.spacing}
          divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
          sx={searchbarStyles.datesSection.checkInOutStack.styles}
        >
          <DateButton label="Check in" date={startDate} onOpen={() => setIsCalendarOpen(true)} />
          <DateButton label="Check out" date={endDate} onOpen={() => setIsCalendarOpen(true)} />
        </Stack>
      );
    }
    return <DateButton label="Date" date={startDate} onOpen={() => setIsCalendarOpen(true)} />;
  };

  return (
    <SearchbarContainer elevation={searchbarStyles.searchbarContainer.elevation} sx={searchbarStyles.searchbarContainer.styles}>
      <Stack
        direction={searchbarStyles.stack.direction}
        spacing={searchbarStyles.stack.spacing}
        divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
        sx={searchbarStyles.stack.styles}
      >
        <DestinationSearch searchValue={searchValue} setSearchValue={setSearchValue} setSelectedLocation={setSelectedLocation} />

        <Box sx={searchbarStyles.datesSection.container}>{renderDateSection()}</Box>

        <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
          <Stack alignItems="flex-start" sx={searchbarStyles.datesSection.commonWidth} onClick={() => setIsGuestsModalOpen(true)}>
            <Typography sx={searchbarStyles.commonTypography.title}>Who</Typography>
            <Typography sx={searchbarStyles.commonTypography.subtitle}>{formatGuestCount() || 'Add guests'}</Typography>
          </Stack>
        </SearchSection>

        <SearchButton onClick={() => setSelectedLocation(searchValue)} sx={searchbarStyles.searchButton}>
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
        onGuestCountsChange={setGuestCounts}
      />
    </SearchbarContainer>
  );
}
