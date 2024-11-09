import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton, Typography, Grid, Box, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { DayButton, WeekDayLabel } from '#/modules/home/styles';

interface CalendarModalProps {
  open: boolean;
  onClose: () => void;
  startDate?: Date;
  endDate?: Date;
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  open,
  onClose,
  startDate: propStartDate,
  endDate: propEndDate,
  onDateSelect,
}) => {
  const [leftMonth, setLeftMonth] = useState(propStartDate || new Date());
  const [startDate, setStartDate] = useState<Date | null>(propStartDate || null);
  const [endDate, setEndDate] = useState<Date | null>(propEndDate || null);

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

  const getRightMonth = (leftDate: Date) => {
    return new Date(leftDate.getFullYear(), leftDate.getMonth() + 1);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const previousMonth = new Date(year, month, 0);
    const daysInPreviousMonth = previousMonth.getDate();

    const calendar = [];

    // Previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      calendar.push({
        date: new Date(year, month - 1, daysInPreviousMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendar.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - calendar.length; // 6 rows × 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      calendar.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return calendar;
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate) || date < startDate) {
      setStartDate(date);
      setEndDate(null);
    } else {
      setEndDate(date);
      onDateSelect?.(startDate, date);
    }
  };

  const handlePreviousMonth = () => {
    setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (startDate && isSameDay(date, startDate)) || (endDate && isSameDay(date, endDate));
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
    );
  };

  const isInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date > startDate && date < endDate;
  };

  const renderMonth = (monthDate: Date) => {
    const calendar = getDaysInMonth(monthDate);

    return (
      <Box>
        <Typography variant="h6" mb={2}>
          {months[monthDate.getMonth()]} {monthDate.getFullYear()}
        </Typography>

        <Grid container spacing={0} mb={1}>
          {weekDays.map((day) => (
            <Grid item key={day}>
              <WeekDayLabel>{day}</WeekDayLabel>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={0}>
          {calendar.map(({ date, isCurrentMonth }, index) => (
            <Grid item key={index}>
              <DayButton
                onClick={() => handleDateClick(date)}
                isSelected={isSelected(date) as boolean}
                isToday={isToday(date)}
                isCurrentMonth={isCurrentMonth}
                isInRange={isInRange(date)}
              >
                {date.getDate()}
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
            {startDate ? `${startDate.toLocaleDateString()} - ` : ''}
            {endDate ? endDate.toLocaleDateString() : 'Select dates'}
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
};
