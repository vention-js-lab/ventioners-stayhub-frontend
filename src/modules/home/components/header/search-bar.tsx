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
import { type Dayjs } from 'dayjs';
import { type GetPropertiesParams } from '../../api/get-properties';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { type TFunction, type i18n as I18n } from 'i18next';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface SearchBarProps {
  setParams?: React.Dispatch<React.SetStateAction<GetPropertiesParams>>;
}

interface DateButtonProps {
  label: string;
  date: Dayjs | (Dayjs | null)[] | null;
  onOpen: () => void;
  t: TFunction<'home'>;
  i18n: I18n;
}

function DateButton({ label, date, onOpen, t, i18n }: DateButtonProps) {
  return (
    <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
      <Stack alignItems="flex-start" sx={searchbarStyles.datesSection.commonWidth} onClick={onOpen}>
        <Typography sx={searchbarStyles.commonTypography.title}>{label}</Typography>
        <Typography sx={searchbarStyles.commonTypography.subtitle}>
          {Array.isArray(date)
            ? date.every((d) => d !== null)
              ? `${months[date[0].month()]} ${date[0].date()} - ${months[date[1].month()]} ${date[1].date()}`
              : `${t(TRANSLATION_KEYS.home.header.search.add)} ${i18n.language === 'en' ? label.toLowerCase() : ''}`
            : date
              ? `${months[date.month()]} ${date.date()}`
              : `${t(TRANSLATION_KEYS.home.header.search.add)} ${i18n.language === 'en' ? label.toLowerCase() : ''}`}
        </Typography>
      </Stack>
    </SearchSection>
  );
}

export function SearchBar({ setParams }: SearchBarProps) {
  const { t, i18n } = useTranslation('home');
  const [locationSearchValue, setLocationSearchValue] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });

  const formatGuestCount = () => {
    const totalGuests = guestCounts.adults + guestCounts.children;
    const guestText = t(TRANSLATION_KEYS.home.header.search.guests.total, { count: totalGuests });
    const parts = [guestText];

    if (guestCounts.infants > 0) {
      parts.push(t(TRANSLATION_KEYS.home.header.search.infants.total, { count: guestCounts.infants }));
    }
    if (guestCounts.pets > 0) {
      parts.push(t(TRANSLATION_KEYS.home.header.search.pets.total, { count: guestCounts.pets }));
    }

    let result = t(TRANSLATION_KEYS.home.header.search.guests.placeholder);
    if (Object.values(guestCounts).reduce((cnt, curr) => cnt + curr, 0) > 0) {
      result = parts.join(', ');
    }

    return result;
  };

  const handleDateSelect = (start: Dayjs | null, end: Dayjs | null) => {
    setStartDate(start);
    setEndDate(end);
    setIsCalendarOpen(false);
  };

  function handleSearchButtonClick() {
    setParams?.((prevParams) => ({
      ...prevParams,
      location: locationSearchValue,
      fromDate: startDate?.toISOString(),
      toDate: endDate?.toISOString(),
      numberOfGuests: String(guestCounts.adults + guestCounts.children > 0 ? guestCounts.adults + guestCounts.children : ''),
    }));
  }

  return (
    <SearchbarContainer elevation={searchbarStyles.searchbarContainer.elevation} sx={searchbarStyles.searchbarContainer.styles}>
      <Stack
        direction={searchbarStyles.stack.direction}
        spacing={searchbarStyles.stack.spacing}
        divider={<StyledDivider orientation="vertical" flexItem={true} variant="middle" />}
        sx={searchbarStyles.stack.styles}
      >
        <DestinationSearch locationSearchValue={locationSearchValue} setLocationSearchValue={setLocationSearchValue} />

        <Box sx={searchbarStyles.datesSection.container}>
          <Stack
            direction="row"
            spacing={searchbarStyles.datesSection.checkInOutStack.spacing}
            sx={searchbarStyles.datesSection.checkInOutStack.styles}
          >
            <Box sx={searchbarStyles.datesSection.desktopDates}>
              <DateButton
                label={t(TRANSLATION_KEYS.home.header.search.check_in)}
                date={startDate}
                onOpen={() => setIsCalendarOpen(true)}
                t={t}
                i18n={i18n}
              />
              <DateButton
                label={t(TRANSLATION_KEYS.home.header.search.check_out)}
                date={endDate}
                onOpen={() => setIsCalendarOpen(true)}
                t={t}
                i18n={i18n}
              />
            </Box>
            <Box sx={searchbarStyles.datesSection.mobileDates}>
              <DateButton
                label={t(TRANSLATION_KEYS.home.header.search.dates)}
                date={[startDate, endDate]}
                onOpen={() => setIsCalendarOpen(true)}
                t={t}
                i18n={i18n}
              />
            </Box>
          </Stack>
        </Box>

        <SearchSection sx={searchbarStyles.datesSection.commonDisplay}>
          <Stack alignItems="flex-start" sx={searchbarStyles.datesSection.commonWidth} onClick={() => setIsGuestsModalOpen(true)}>
            <Typography sx={searchbarStyles.commonTypography.title}>{t(TRANSLATION_KEYS.home.header.search.who)}</Typography>
            <Typography sx={searchbarStyles.commonTypography.subtitle}>{formatGuestCount()}</Typography>
          </Stack>
        </SearchSection>

        <SearchButton onClick={handleSearchButtonClick} sx={searchbarStyles.searchButton}>
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
