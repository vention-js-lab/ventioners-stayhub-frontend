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
    return dayjs()
      .set('year', leftDate.year())
      .set('month', leftDate.month() + 1);
  };

  const getDaysInMonth = (date: Dayjs) => {
    const year = date.year();
    const month = date.month();
    const firstDay = dayjs().set('year', year).set('month', month).set('date', 1);
    const lastDay = dayjs()
      .set('year', year)
      .set('month', month + 1)
      .set('date', 0);
    const daysInMonth = lastDay.date();
    const startingDay = firstDay.day();

    const previousMonth = dayjs().set('year', year).set('month', month).set('date', 0);
    const daysInPreviousMonth = previousMonth.date();

    const calendar = [];

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      calendar.push({
        date: dayjs()
          .set('year', year)
          .set('month', month - 1)
          .set('date', daysInPreviousMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({
        date: dayjs().set('year', year).set('month', month).set('date', i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - calendar.length; // 6 rows × 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      calendar.push({
        date: dayjs()
          .set('year', year)
          .set('month', month + 1)
          .set('date', i),
        isCurrentMonth: false,
      });
    }

    return calendar;
  };

  const handleDateClick = (date: Dayjs) => {
    if (startDate === null || endDate !== null || date < startDate) {
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
            {endDate ? endDate.format('DD/MM/YYYY') : 'Select dates'}
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
