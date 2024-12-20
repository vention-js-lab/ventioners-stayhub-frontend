import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { DayButton, WeekDayLabel } from '#/modules/home/styles';
import dayjs, { type Dayjs } from 'dayjs';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import { useTranslation } from 'react-i18next';

interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
  startDate?: Dayjs;
  endDate?: Dayjs;
  onDateSelect: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

export function CalendarModal({
  open,
  onClose,
  startDate: startDateProp,
  endDate: endDateProp,
  onDateSelect,
}: CalendarModalProps) {
  const { t } = useTranslation('home');
  const [leftMonth, setLeftMonth] = useState(startDateProp || dayjs());
  const [startDate, setStartDate] = useState<Dayjs | null>(startDateProp || null);
  const [endDate, setEndDate] = useState<Dayjs | null>(endDateProp || null);

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getRightMonth = (leftDate: Dayjs) => {
    return leftDate.add(1, 'month');
  };

  const getDaysInMonth = (date: Dayjs) => {
    const firstDay = date.startOf('month');
    const lastDay = date.endOf('month');

    const daysInMonth = lastDay.date();
    const startingDay = firstDay.day();

    const previousMonth = firstDay.subtract(1, 'month');
    const daysInPreviousMonth = previousMonth.endOf('month').date();

    const calendar = [];

    for (let i = startingDay - 1; i >= 0; i--) {
      calendar.push({
        date: previousMonth.date(daysInPreviousMonth - i).startOf('day'),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({
        date: firstDay.date(i).startOf('day'),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - calendar.length;
    for (let i = 1; i <= remainingDays; i++) {
      calendar.push({
        date: lastDay.add(i, 'day').startOf('day'),
        isCurrentMonth: false,
      });
    }

    return calendar;
  };

  const handleDateClick = (date: Dayjs) => {
    if (startDate === null || endDate !== null || date.isBefore(startDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
      onDateSelect(startDate, date);
    }
  };

  const handlePreviousMonth = () => {
    setLeftMonth(
      dayjs()
        .set('year', leftMonth.year())
        .set('month', leftMonth.month() - 1)
    );
  };

  const handleNextMonth = () => {
    setLeftMonth(
      dayjs()
        .set('year', leftMonth.year())
        .set('month', leftMonth.month() + 1)
    );
  };

  const isToday = (date: Dayjs) => {
    const today = dayjs();
    return date.date() === today.date() && date.month() === today.month() && date.year() === today.year();
  };

  const isSameDay = (date1: Dayjs, date2: Dayjs) => {
    return date1.date() === date2.date() && date1.month() === date2.month() && date1.year() === date2.year();
  };

  const isSelected = (date: Dayjs) => {
    return (startDate && isSameDay(date, startDate)) || (endDate && isSameDay(date, endDate));
  };

  const isInRange = (date: Dayjs) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const renderMonth = (monthDate: Dayjs) => {
    const calendar = getDaysInMonth(monthDate);

    return (
      <Box>
        <Typography variant="h6" mb={2}>
          {months[monthDate.month()]} {monthDate.year()}
        </Typography>

        <Grid container={true} spacing={0} mb={1}>
          {weekDays.map((day) => (
            <Grid key={day}>
              <WeekDayLabel>{day}</WeekDayLabel>
            </Grid>
          ))}
        </Grid>

        <Grid container={true} spacing={0}>
          {calendar.map(({ date, isCurrentMonth }) => (
            <Grid key={date.toISOString()}>
              <DayButton
                onClick={() => handleDateClick(date)}
                isSelected={isSelected(date) as boolean}
                isToday={isToday(date)}
                isCurrentMonth={isCurrentMonth}
                isInRange={isInRange(date)}
              >
                {date.date()}
              </DayButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxWidth: '800px',
          p: 2,
        },
      }}
    >
      <DialogContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography>
            {startDate ? `${startDate.format('DD/MM/YYYY')} - ` : ''}
            {endDate ? endDate.format('DD/MM/YYYY') : t(TRANSLATION_KEYS.home.header.search.select_date)}
          </Typography>
          <Box>
            <IconButton onClick={handlePreviousMonth} size="small">
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={handleNextMonth} size="small">
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <Stack direction="row" spacing={4}>
          {renderMonth(leftMonth)}
          {renderMonth(getRightMonth(leftMonth))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
