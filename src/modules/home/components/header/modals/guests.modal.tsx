import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CounterButton, CounterText } from '#/modules/home/styles';
import { guestTypes } from '../constants';

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestsModalProps {
  open: boolean;
  onClose: () => void;
  guestCounts: GuestCounts;
  onGuestCountsChange: (counts: GuestCounts) => void;
}

export function GuestsModal({ open, onClose, guestCounts, onGuestCountsChange }: GuestsModalProps) {
  const handleCountChange = (type: keyof GuestCounts, increment: boolean) => {
    const guestType = guestTypes.find((g) => g.type === type);
    if (!guestType) return;
    const currentCount = guestCounts[type];
    const newCount = increment ? currentCount + 1 : currentCount - 1;

    if (newCount >= guestType.min && newCount <= guestType.max) {
      onGuestCountsChange({
        ...guestCounts,
        [type]: newCount,
      });
    }
  };

  const getTotalGuests = () => {
    return guestCounts.adults + guestCounts.children;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: '100%',
          maxWidth: '400px',
          p: 1,
        },
      }}
    >
      <DialogContent>
        <Stack spacing={3}>
          {guestTypes.map(({ type, title, description, max, min }) => (
            <Box
              key={type}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
              }}
            >
              <Box>
                <Typography fontWeight={500}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>

              <Stack direction="row" spacing={1} alignItems="center">
                <CounterButton disabled={guestCounts[type] <= min} onClick={() => handleCountChange(type, false)}>
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </CounterButton>

                <CounterText>{guestCounts[type]}</CounterText>

                <CounterButton disabled={guestCounts[type] >= max} onClick={() => handleCountChange(type, true)}>
                  <AddIcon sx={{ fontSize: 16 }} />
                </CounterButton>
              </Stack>
            </Box>
          ))}

          <Box
            sx={{
              borderTop: '1px solid #EBEBEB',
              pt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={() => onGuestCountsChange({ adults: 0, children: 0, infants: 0, pets: 0 })}
              sx={{ textTransform: 'none' }}
            >
              Clear all
            </Button>

            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                bgcolor: 'black',
                '&:hover': {
                  bgcolor: '#333',
                },
                textTransform: 'none',
              }}
            >
              {getTotalGuests()} guests
              {guestCounts.infants > 0 ? `, ${guestCounts.infants} infants` : ''}
              {guestCounts.pets > 0 ? `, ${guestCounts.pets} pets` : ''}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
