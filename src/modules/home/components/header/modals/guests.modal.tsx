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
import { guestModalStyles } from '../styles';

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
        sx: guestModalStyles.paper,
      }}
    >
      <DialogContent>
        <Stack spacing={3}>
          {guestTypes.map(({ type, title, description, max, min }) => (
            <Box key={type} sx={guestModalStyles.dialogContainer}>
              <Box>
                <Typography fontWeight={guestModalStyles.dialogTitle.fontWeight}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>

              <Stack
                direction={guestModalStyles.addRemoveButtonContainer.direction}
                spacing={guestModalStyles.addRemoveButtonContainer.spacing}
                alignItems={guestModalStyles.addRemoveButtonContainer.alignItems}
              >
                <CounterButton disabled={guestCounts[type] <= min} onClick={() => handleCountChange(type, false)}>
                  <RemoveIcon sx={guestModalStyles.icon} />
                </CounterButton>

                <CounterText>{guestCounts[type]}</CounterText>

                <CounterButton disabled={guestCounts[type] >= max} onClick={() => handleCountChange(type, true)}>
                  <AddIcon sx={guestModalStyles.icon} />
                </CounterButton>
              </Stack>
            </Box>
          ))}

          <Box sx={guestModalStyles.functionButtonContainer}>
            <Button
              onClick={() => onGuestCountsChange({ adults: 0, children: 0, infants: 0, pets: 0 })}
              sx={guestModalStyles.clearButton}
            >
              Clear all
            </Button>

            <Button variant="contained" onClick={onClose} sx={guestModalStyles.submitButton}>
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
